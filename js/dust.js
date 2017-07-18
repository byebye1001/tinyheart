var dustObj = function() {
	this.x = [];
	this.y = [];
	this.pic = [];
	this.amp = [];
	this.alpha;
	// this.no = [];
}

dustObj.prototype.num = 30;

dustObj.prototype.init = function() {
	for (var i = 0; i < 7; i++) {
		this.pic[i] = new Image();
		this.pic[i].src = "./src/dust" + i + ".png";
	}
	for (var i = 0; i < this.num; i++) {

		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = Math.random() * 15 + 20;

	}
	this.alpha = 0;
}

dustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);

	for (var i = 0; i < this.num; i++) {
		var no = Math.floor(Math.random() * 7);
		ctx1.drawImage(dust.pic[no], this.x[i] + this.amp[i] * l, this.y[i]);
	}
}