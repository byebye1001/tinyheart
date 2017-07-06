function drawBackground(){
	bgPic.onload = function(){
		ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
	}
}