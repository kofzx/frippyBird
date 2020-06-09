import {DataStore} from './base/DataStore.js';
import {UpPencil} from './runtime/UpPencil.js';
import {DownPencil} from './runtime/DownPencil.js';

// 导演类，控制游戏逻辑
export class Director {

	constructor () {
		this.dataStore = DataStore.getInstance();
		this.moveSpeed = 2;
	}

	static getInstance () {
		if (!Director.instance) {
			Director.instance = new Director();
		}
		return Director.instance;
	}

	createPencil () {
		const minTop = DataStore.getInstance().canvas.height / 8;
		const maxTop = DataStore.getInstance().canvas.height / 2;
		const top = minTop + Math.random() * (maxTop - minTop);
		this.dataStore.get('pencils').push(new UpPencil(top));
		this.dataStore.get('pencils').push(new DownPencil(top));
	}

	// 点击事件
	birdsEvent () {
		for (let i = 0; i <= 2; i++) {
			this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
		}
		// 将速度重置0，意味着重力加速度也为0
		this.dataStore.get('birds').time = 0;
	}

	// 小鸟与铅笔的碰撞检测
	static isStrike (bird, pencil) {
		let s = false;
		// todo... 铅笔的一半宽26， 笔尖到三角底部距离26
		// 求得斜面的长度36
		// 更易理解
		if (bird.top <= pencil.bottom &&
			bird.bottom >= pencil.top &&
			bird.right >= pencil.left &&
			bird.left <= pencil.right
		) {
			s = true;
		}
		return s;
	}

	// 小鸟的碰撞检测
	check () {
		const birds = this.dataStore.get('birds');
		const land = this.dataStore.get('land');
		const pencils = this.dataStore.get('pencils');
		const score = this.dataStore.get('score');
		// 与地板的碰撞检测
		if (birds.birdsY[0] + birds.clippingHeight[0] >= land.y) {
			console.log('land hit!');
			this.isGameOver = true;
			return;
		}

		// 小鸟的边框模型
		const birdsBorder = {
			top: birds.y[0],
			right: birds.birdsX[0] + birds.clippingWidth[0],
			bottom: birds.birdsY[0] + birds.clippingHeight[0],
			left: birds.birdsX[0]
		};

		const length = pencils.length;
		for (let i = 0; i < length; i++) {
			const pencil = pencils[i];
			const pencilBorder = {
				top: pencil.y,
				right: pencil.x + pencil.width,
				bottom: pencil.y + pencil.height,
				left: pencil.x
			};

			if (Director.isStrike(birdsBorder, pencilBorder)) {
				console.log('hit pencil!');
				this.isGameOver = true;
				return;
			}
		}

		// 加分逻辑
		if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
			score.isScore = false;
			score.scoreNum++;
		}

	}

	run () {
		this.check();
		if (!this.isGameOver) {
			this.dataStore.get('background').draw();

			const pencils = this.dataStore.get('pencils');
			// 边界左侧
			if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
				pencils.shift();
				pencils.shift();
				// 铅笔回收时，开启score.isScore
				this.dataStore.get('score').isScore = true;
			}

			// 生成一组铅笔
			if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
				this.createPencil();
			}

			this.dataStore.get('pencils').forEach(value => value.draw());
			this.dataStore.get('land').draw();
			this.dataStore.get('score').draw();
			this.dataStore.get('birds').draw();

			let timer = requestAnimationFrame(() => this.run());
			this.dataStore.put('timer', timer);
		} else {
			// 游戏结束， 绘制重新开始按钮
			this.dataStore.get('startButton').draw();
			cancelAnimationFrame(this.dataStore.get('timer'));
			// 清空数据
			this.dataStore.destroy();
		}
	}

}