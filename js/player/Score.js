// 计分器类
import {DataStore} from '../base/DataStore.js';

export class Score {
	constructor () {
		this.ctx = DataStore.getInstance().ctx;
		this.scoreNum = 0;
		// 因为canvas刷新很快，所以需要一个变量控制加分，只加一次
		this.isScore = true;
	}

	draw () {
		this.ctx.font = '25px Arial';
		this.ctx.fillStyle = 'red';
		this.ctx.fillText(this.scoreNum, DataStore.getInstance().canvas.width / 2, DataStore.getInstance().canvas.height / 18);
	}
}