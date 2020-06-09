import {Sprite} from '../base/Sprite.js';
import {DataStore} from '../base/DataStore.js';

export class Background extends Sprite {

	constructor () {
		const img = Sprite.getImage('background');
		super(img, 0, 0, img.width, img.height, 0, 0, DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
	}

}