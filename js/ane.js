var aneObj = function(){
	this.x = [];
	this.len = [];//海葵的高度
}

aneObj.prototype.num = 50;//50条海葵
aneObj.prototype.init = function(){
	//初始化海葵,确定每一条海葵的位置
	//画一条线从顶端画下来或者从底部画上去
	//这里采用从低端画上去
	for (var i = 0; i < this.num; i++) {
		//随机画出海葵位置
		this.x[i] = i*16 + Math.random()*20;//返回一个[0,1)的值
		this.len[i] = 200 + Math.random()*50;
	}
}

aneObj.prototype.draw = function(){

	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3B154E";
	for (var i = 0; i < this.num; i++) {
		//绘制海葵,在第二个场景绘制海葵
		//beginPath路径
		//moveTo,起始点
		//lineTo路径从起始点到另一个点
		//stroke绘制线段
		//strokeStyle线段样式,必须定义在stroke之前
		//lineWidth线宽
		//lineCap终点样式
		//globalAlpha透明度
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);
		ctx2.lineTo(this.x[i],canHeight - this.len[i]);
		ctx2.stroke();
	}
	ctx2.restore();

}