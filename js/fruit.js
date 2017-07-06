var fruitObj = function(){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];//图片长度
	this.spd = [];//成长速度，和上浮速度
	this.orange = new Image();
	this.blue = new Image();
}

//果实池，数量为30
fruitObj.prototype.num = 30;
//初始化
fruitObj.prototype.init = function(){
	for(var i = 0;i < this.num;i++){
		this.alive[i] = true;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.spd[i] = Math.random() * 0.01 + 0.005;
		//让所有果实都找到对应位置
		this.bron(i);
	}
	//加载果实图片
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";

}

fruitObj.prototype.draw = function(){
	for(var i = 0;i < this.num;i++){
		//画果实
		//找到一个海葵,找到海葵坐标
		//长大
		//向上漂浮
		if(this.alive[i]){
					if(this.l[i] <= 14){
			this.l[i] += this.spd[i] * deltaTime;//让生长速度平滑
		}else{
			this.y[i] -= this.spd[i] * 7 * deltaTime;
		}
//drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight,destX, destY, destWidth, destHeight)
//sourceX, sourceY   图像将要被绘制的区域的左上角。这些整数参数用图像像素来度量
//sourceWidth, sourceHeight	图像所要绘制区域的大小，用图像像素表示
//destX, destY	所要绘制的图像区域的左上角的画布坐标。
//destWidth, destHeight	图像区域所要绘制的画布大小
		ctx2.drawImage(this.orange,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
		
		if(this.y[i] < -10){
			this.alive = false;
		}
		}


	}
}

fruitObj.prototype.bron = function(i){
	//Math.floor(x)返回<=x的最大整数
	//找到对应海葵
	var aneId = Math.floor(Math.random() * ane.num);
	//找到海葵生长点(x,y)
	//（还未实现）还要需要判断海葵是否被果实占用，被占用之后要寻找下一个
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight - ane.len[aneId];
	this.l[i] = 0;
}


fruitObj.prototype.uodate = function(){
	var num = 0;
	//统计当前屏幕活跃状态的果实数量
	for(var i = 0;i < this.num;i ++){
		if(this.alive[i]){
			num++;
		}
	}
}