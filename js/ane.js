var aneObj = function() {
	// this.x = [];
	// this.len = []; //海葵的高度
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.alpha = 0;
	this.amp = []; //振幅
}

aneObj.prototype.num = 50; //50条海葵
aneObj.prototype.init = function() {
	//初始化海葵,确定每一条海葵的位置
	//画一条线从顶端画下来或者从底部画上去
	//这里采用从低端画上去


	for (var i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20; //返回一个[0,1)的值
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
	}
}

aneObj.prototype.draw = function() {

	ctx2.save();
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3B154E";
	// for (var i = 0; i < this.num; i++) {
	// 	//绘制海葵,在第二个场景绘制海葵
	// 	//beginPath路径
	// 	//moveTo,起始点
	// 	//lineTo路径从起始点到另一个点
	// 	//stroke绘制线段
	// 	//strokeStyle线段样式,必须定义在stroke之前
	// 	//lineWidth线宽
	// 	//lineCap终点样式
	// 	//globalAlpha透明度
	// 	ctx2.beginPath();
	// 	ctx2.moveTo(this.x[i], canHeight);
	// 	ctx2.lineTo(this.x[i], canHeight - this.len[i]);
	// 	ctx2.stroke();
	// }
	for (var i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
		//  canHeight-100-Math.sqrt((canHeight-this.heady[i]-100)*(canHeight-this.heady[i]-100)-this.amp[i]*l*this.amp[i]*l)
		// ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i] + l * this.amp[i], canHeight-100-Math.sqrt((canHeight-this.heady[i]-100)*(canHeight-this.heady[i]-100)-this.amp[i]*l*this.amp[i]*l));
		ctx2.stroke();
	}
	ctx2.restore();

}