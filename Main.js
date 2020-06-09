// 初始化整个游戏的精灵，作为游戏的入口
import {ResourceLoader} from './js/base/ResourceLoader.js';
import {Director} from './js/Director.js';
import {Background} from './js/runtime/Background.js';
import {Land} from './js/runtime/Land.js';
import {DataStore} from './js/base/DataStore.js';
import {Birds} from './js/player/Birds.js';
import {StartButton} from './js/player/StartButton.js';
import {Score} from './js/player/Score.js';

export class Main {

	constructor () {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.dataStore = DataStore.getInstance();
		this.director = Director.getInstance();
		const loader = ResourceLoader.create();
		loader.onLoaded(map => this.onResourceFirstLoaded(map));
	}

	onResourceFirstLoaded (map) {
		this.dataStore.canvas = this.canvas;
		this.dataStore.ctx = this.ctx;
		this.dataStore.res = map;
		this.init();
	}

	init () {
		// 初始游戏是没有结束的
		this.director.isGameOver = false;

		this.dataStore
			.put('background', Background)
			.put('land', Land)
			.put('pencils', [])
			.put('birds', Birds)
			.put('startButton', StartButton)
			.put('score', Score);
		this.registerEvent();
		// 创建铅笔要在游戏逻辑运行之前
		this.director.createPencil();
		this.director.run();
	}

	registerEvent () {
		this.canvas.addEventListener('touchstart', e => {
			e.preventDefault();
			if (this.director.isGameOver) {
				console.log('游戏重新开始');
				this.init();
			} else {
				this.director.birdsEvent();
			}
		});
	}
}