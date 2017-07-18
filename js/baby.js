var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	// this.babyEye = new Image();
	// this.babyBody = new Image();
	// this.babyTail = new Image();
	this.babyTail = [];
	this.babyEye = [];
	this.babyBody = [];

	//定时器
	this.babyTailTimer = 0;
	//确定图片序号
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	//当前时间持续的时间
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;

}

babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;

	// this.babyEye.src = "./src/babyEye0.png";
	// this.babyTail.src = "./src/babyTail0.png";
	// this.babyBody.src = "./src/babyFade0.png";


	for (var i = 0; i < 8; i++) {
		this.babyTail[i] = new Image();
		this.babyTail[i].src = "./src/babyTail" + i + ".png";
	}

	for (var i = 0; i < 20; i++) {
		this.babyBody[i] = new Image();
		this.babyBody[i].src = "./src/babyFade" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		this.babyEye[i] = new Image();
		this.babyEye[i].src = "./src/babyEye" + i + ".png";
	}


}

babyObj.prototype.draw = function() {

	//lerp x,y
	//在commonFunctions中存在一个函数lerpDistance
	//传入参数为目标值，当前值，百分比
	this.x = lerpDistance(mom.x, this.x, 0.95);
	this.y = lerpDistance(mom.y, this.y, 0.95);
	//计算坐标差,每一帧都需要计算
	//Math.atan2(y,x)
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;

	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	//让大鱼角度一直趋向于坐标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//计数
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50) {
		//对8取模，使babyTailCount一直在0-7之间
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	//计数
	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {

		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		//判断
		if (this.babyEyeCount == 0) {
			//眯着眼睛
			//[2000,3500)
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		} else {
			//闭着眼睛，200毫秒之后睁开眼睛
			this.babyEyeInterval = 200;
		}
	}

	//时间监控
	this.babyBodyTimer += deltaTime;
	if (this.babyBodyTimer > 300) {
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount > 19) {
			//停在这里
			this.babyBodyCount = 19;
			//提示游戏结束
			data.gameOver = true;
		}

	}
	ctx1.save();
	//改变大鱼的坐标
	//先旋转原点再移动
	ctx1.translate(this.x, this.y); //移动原点

	ctx1.rotate(this.angle); //旋转画布
	//临时变量
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(this.babyTail[babyTailCount], -this.babyTail[babyTailCount].width * 0.5 + 23, -this.babyTail[babyTailCount].height * 0.5);

	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(this.babyBody[babyBodyCount], -this.babyBody[babyBodyCount].width * 0.5, -this.babyBody[babyBodyCount].height * 0.5);
	// ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);

	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(this.babyEye[babyEyeCount], -this.babyEye[babyEyeCount].width * 0.5, -this.babyEye[babyEyeCount].height * 0.5);
	ctx1.restore();
}