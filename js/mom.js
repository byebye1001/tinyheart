var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();
}

momObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
	//加载图片资源
	this.bigEye.src = "./src/bigEye0.png";
	this.bigBody.src = "./src/bigSwim0.png";
	this.bigTail.src = "./src/bigTail0.png";

}

momObj.prototype.draw = function(){

	//lerp x,y
	//在commonFunctions中存在一个函数lerpDistance
	//传入参数为目标值，当前值，百分比
	this.x = lerpDistance(mx,this.x,0.9);
	this.y = lerpDistance(my,this.y,0.9);
	//计算坐标差,每一帧都需要计算
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	//
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	//让大鱼角度一直趋向于坐标角度
	this.angle = lerpAngle(beta,this.angle,0.9);

	ctx1.save();
	//改变大鱼的坐标
	//先旋转原点再移动
	ctx1.translate(this.x,this.y);//移动原点

	ctx1.rotate(this.angle);//旋转画布
	ctx1.drawImage(this.bigEye,-this.bigEye.width*0.5,-this.bigEye.height*0.5);
	ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
	ctx1.drawImage(this.bigTail,-this.bigTail.width*0.5 + 30,-this.bigTail.height*0.5);

	ctx1.restore();
}