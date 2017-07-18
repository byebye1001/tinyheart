//碰撞检测
function momFruitCollision() {
	//当且仅当游戏还未结束时候进行判断检测
	if (!data.gameOver) {
		for (var i = 0; i < fruits.num; i++) {
			if (fruits.alive[i]) {
				//判断鱼和果实距离
				//利用坐标差，计算斜边
				var l = calLength2(fruits.x[i], fruits.y[i], mom.x, mom.y);
				if (l < 400) {
					fruits.dead(i);
					data.fruitNum++;
					mom.bigBodyCount++;
					if (mom.bigBodyCount > 7) {
						mom.bigBodyCount = 7;
					}
					if (fruits.fruitType[i] == "blue") {
						data.double = 2;
					} else {
						data.double = 1;
					}
					//吃到果实就产生
					wave.born(fruits.x[i],fruits.y[i]);
				}
			}
		}
	}

}


function momBabyCollision() {
	if (data.fruitNum > 0 && !data.gameOver) {
		var l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if (l < 400) {
			//大鱼碰到小鱼，小鱼身体恢复
			baby.babyBodyCount = 0;
			//会与addScore发生冲突，并不需要这个方法
			// data.reset();
			mom.bigBodyCount = 0;
			//碰到小鱼才会更新分数
			data.addScore();
			halo.born(baby.x,baby.y);
		}
	}

}