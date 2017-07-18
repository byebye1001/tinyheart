var waveObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];

}

waveObj.prototype.num = 10;

waveObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.r[i] = 0;

	}
}

waveObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.sgadowBlur = 10;
	ctx1.shadowColor = "white";
	for (var i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			this.r[i] += deltaTime * 0.04;
			if (this.r[i] > 60) {
				this.alive[i] = false;
				continue;
				// break;
			}
			var alpha = 1 - this.r[i] / 60;

			//绘制圈圈
			ctx1.beginPath();
			//获取起始点坐标,果实位置
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.closePath();
			//半径和颜色成反比，利用这个关系获取alpha值
			ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";

			ctx1.stroke();
		}

	}
	ctx1.restore();
}

waveObj.prototype.born = function(x, y) {
	for (var i = 0; i < this.num; i++) {
		if (!this.alive[i]) {
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			//找到了一个之后就跳出来
			return;
		}
	}
}