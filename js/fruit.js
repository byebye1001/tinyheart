var fruitObj = function() {
	this.alive = [];
	this.x = [];
	this.y = [];
	this.aneNo = [];
	this.l = []; //图片长度
	this.spd = []; //成长速度，和上浮速度
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}

//果实池，数量为30
fruitObj.prototype.num = 30;
//初始化
fruitObj.prototype.init = function() {
		for (var i = 0; i < this.num; i++) {
			this.alive[i] = false;
			this.x[i] = 0;
			this.y[i] = 0;
			this.l[i] = 0;
			this.aneNo[i] = 0;
			//spd为什么要这样设置
			this.spd[i] = Math.random() * 0.017 + 0.003;
			this.fruitType[i] = "";
			//让所有果实都找到对应位置
			//this.bron(i);
		}
		//加载果实图片
		this.orange.src = "./src/fruit.png";
		this.blue.src = "./src/blue.png";

	}
	//切换标签后再切换回来，果实会变得很大
	//原因：果实大小与deltaTime成正比
	//切换标签后所有的执行都会停止，再次切换回来时deltaTime会很大
	//优化：在gameloop中对deltaTime进行优化
fruitObj.prototype.draw = function() {
	for (var i = 0; i < this.num; i++) {
		//画果实
		//找到一个海葵,找到海葵坐标
		//长大
		//向上漂浮
		if (this.alive[i]) {

			if (this.fruitType[i] == "blue") {
				var pic = this.blue;
			} else {
				var pic = this.orange;
			}


			if (this.l[i] <= 14) {
				var no = this.aneNo[i];
				this.x[i] = ane.headx[no];
				this.y[i] = ane.heady[no];
				this.l[i] += this.spd[i] * deltaTime; //让生长速度平滑

			} else {
				this.y[i] -= this.spd[i] * 7 * deltaTime;

			}
			//drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight,destX, destY, destWidth, destHeight)
			//sourceX, sourceY   图像将要被绘制的区域的左上角。这些整数参数用图像像素来度量
			//sourceWidth, sourceHeight	图像所要绘制区域的大小，用图像像素表示
			//destX, destY	所要绘制的图像区域的左上角的画布坐标。
			//destWidth, destHeight	图像区域所要绘制的画布大小
			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

			if (this.y[i] < 10) {
				//这里的alive漏了i的话，结果是最上面那个y坐标符合条件时屏幕上的所有果实都会消失
				this.alive[i] = false;
			}
		}


	}
}

fruitObj.prototype.born = function(i) {
	//Math.floor(x)返回<=x的最大整数
	//找到对应海葵
	this.aneNo[i] = Math.floor(Math.random() * ane.num);
	//找到海葵生长点(x,y)
	//（还未实现）还要需要判断海葵是否被果实占用，被占用之后要寻找下一个
	this.x[i] = ane.headx[this.aneNo[i]];
	this.y[i] = ane.heady[this.aneNo[i]];
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if (ran < 0.2) {
		this.fruitType[i] = "blue";
	} else {
		this.fruitType[i] = "orange";
	}

}


function sendFruit() {

	for (var i = 0; i < fruits.num; i++) {
		if (!fruits.alive[i]) {
			fruits.born(i);
			return;
		}
	}
}


//这个函数没有用到(2017.7.7)
// fruitObj.prototype.update = function() {
// 	var num = 0;

// 	for (var i = 0; i < fruits.num; i++) {
// 		if (!fruits.alive[i]) {
// 			fruits.born(i);
// 			return;
// 		}
// 	}
// }

fruitObj.prototype.dead = function(i) {
	this.alive[i] = false;
}

//判断屏幕上alive的果实,统计数量
function fruitMonitor() {

	var num = 0;
	for (var i = 0; i < fruits.num; i++) {
		//统计alive的果实数量
		if (fruits.alive[i])
			num++;
	}
	if (num < 15) {
		//数量少于15个发出一个果实
		sendFruit();
		return;
	}
}