var momObj = function() {
	this.x;
	this.y;
	this.angle;
	// this.bigEye = new Image();
	// this.bigBody = new Image();
	// this.bigTail = new Image();

	this.bigBodyOrange = [];
	this.bigBodyBlue = [];
	//当大鱼吃到果实时起作用
	this.bigBodyCount = 0;

	this.bigTail = [];
	//定时器
	this.bigTailTimer = 0;
	//确定图片序号
	this.bigTailCount = 0;

	this.bigEye = [];
	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	//当前时间持续的时间
	this.bigEyeInterval = 1000;
}

momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	//加载图片资源
	// this.bigEye.src = "./src/bigEye0.png";
	// this.bigBody.src = "./src/bigSwim0.png";
	// this.bigTail.src = "./src/bigTail0.png";

	for (var i = 0; i < 8; i++) {
		this.bigTail[i] = new Image();
		this.bigTail[i].src = "./src/bigTail" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		this.bigEye[i] = new Image();
		this.bigEye[i].src = "./src/bigEye" + i + ".png";
	}

	for (var i = 0; i < 8; i++) {
		this.bigBodyOrange[i] = new Image();
		this.bigBodyBlue[i] = new Image();
		
		this.bigBodyOrange[i].src = "./src/bigSwim" + i + ".png";
		this.bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
	}
}

momObj.prototype.draw = function() {

	//lerp x,y
	//在commonFunctions中存在一个函数lerpDistance
	//传入参数为目标值，当前值，百分比
	this.x = lerpDistance(mx, this.x, 0.95);
	this.y = lerpDistance(my, this.y, 0.95);
	//计算坐标差,每一帧都需要计算
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	//
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	//让大鱼角度一直趋向于坐标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);


	//计数
	this.bigTailTimer += deltaTime;
	if (this.bigTailTimer > 50) {
		//对8取模，使babyTailCount一直在0-7之间
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}

	//计数
	this.bigEyeTimer += deltaTime;
	if (this.bigEyeTimer > this.bigEyeInterval) {

		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;

		//判断
		if (this.bigEyeCount == 0) {
			//眯着眼睛
			//[2000,3500)
			this.bigEyeInterval = Math.random() * 1500 + 1900;
		} else {
			//闭着眼睛，200毫秒之后睁开眼睛
			this.bigEyeInterval = 200;
		}
	}

	ctx1.save();
	//改变大鱼的坐标
	//先旋转原点再移动
	ctx1.translate(this.x, this.y); //移动原点

	ctx1.rotate(this.angle); //旋转画布

	var bigTailCount = this.bigTailCount;
	ctx1.drawImage(this.bigTail[bigTailCount], -this.bigTail[bigTailCount].width * 0.5 + 30, -this.bigTail[bigTailCount].height * 0.5);

	var bigBodyCount = this.bigBodyCount;
	if (data.double == 1) {
		//吃到橙色
		ctx1.drawImage(this.bigBodyOrange[bigBodyCount], -this.bigBodyOrange[bigBodyCount].width * 0.5, -this.bigBodyOrange[bigBodyCount].height * 0.5);

	} else {
		//吃到蓝色
		ctx1.drawImage(this.bigBodyBlue[bigBodyCount], -this.bigBodyBlue[bigBodyCount].width * 0.5, -this.bigBodyBlue[bigBodyCount].height * 0.5);

	}
	// ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
	var bigEyeCount = this.bigEyeCount;
	ctx1.drawImage(this.bigEye[bigEyeCount], -this.bigEye[bigEyeCount].width * 0.5, -this.bigEye[bigEyeCount].height * 0.5);

	ctx1.restore();
}