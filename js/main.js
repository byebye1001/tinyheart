var can1;
var can2;

var ctx1; //canvas 对应的场景
var ctx2;

var canWidth;
var canHeight;

var lastTime; //上一次执行的时间
var deltaTime; //两帧执行间隔的时间差使时间差相等，让运动平滑

var bgPic = new Image();

var ane;

var fruits;

var mom;
//鼠标
var mx;
var my;


document.body.onload = game; //加载完body，把game作为所有js脚本的入口

function game() {
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

//初始化
function init() {
	//获得canvas context
	//canvas1:fishes,dust,UI,circle
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext('2d');
	//canvas2:background,ane, fruits
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext('2d');

	//鼠标移动时候可以被监听到
	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruits = new fruitObj();
	fruits.init();

	mom = new momObj();
	mom.init();
	
	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	drawBackground();

}

//游戏循环
function gameloop() {
	//相对setInterval,setTimeout()更科学
	//当前绘制完成后根据机器选择相隔多长时间绘制下一帧
	//fps
	window.requestAnimFrame(gameloop);
	//为什么要画一遍背景才可以使果实不呈现直线轨迹，盖住上一帧的痕迹
	ctx2.drawImage(bgPic, 0, 0);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	ane.draw();
	fruitMonitor();
	fruits.draw();
	//清除前一帧
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
}

function onMouseMove(e){
	if(e.offSetX || e.layerX){
		//获取鼠标坐标
		mx = e.offSetX == undefined?e.layerX:e.offSetX;
		my = e.offSetY == undefined?e.layerY:e.offSetY;
	}
}