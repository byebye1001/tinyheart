var can1;
var can2;

var ctx1;//canvas 对应的场景
var ctx2;

var canWidth;
var canHeight;

var lastTime;//上一次执行的时间
var deltaTime;//两帧执行间隔的时间差使时间差相等，让运动平滑

var bgPic = new Image();

var ane;


document.body.onload = game;//加载完body，把game作为所有js脚本的入口

function game(){
	init();
	// lastTime = Date.now();
	// deltaTime = 0;
	gameloop();
}

//初始化
function init(){
	//获得canvas context
	//canvas1:fishes,dust,UI,circle
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext('2d');
	//canvas2:background,ane, fruits
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext('2d');

	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	drawBackground();
	
}

//游戏循环
function gameloop(){
	//相对setInterval,setTimeout()更科学
	//当前绘制完成后根据机器选择相隔多长时间绘制下一帧
	//fps
	requestAnimFrame(gameloop);

	// var now = Date.now();
	// deltaTime = now - lastTime;
	// lastTime = now;
	ane.draw();

}