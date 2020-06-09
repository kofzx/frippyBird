// 精灵的基类， 负责初始化精灵加载的资源和大小以及位置
import {DataStore} from './DataStore.js';

export class Sprite {
	
	constructor (img = null,
	  			 sx = 0,
	   			 sy = 0,
	    		 swidth = 0,
	     		 sheight = 0,
	      		 x = 0,
	      		 y = 0,
	      		 width = 0,
	      		 height = 0 ) {
		this.dataStore = DataStore.getInstance();
		this.ctx = this.dataStore.ctx;
		this.img = img;
		this.sx = sx;
		this.sy = sy;
		this.swidth = swidth;
		this.sheight = sheight;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	static getImage (key) {
		return DataStore.getInstance().res.get(key);
	}

	draw (img = this.img,
		  sx = this.sx,
		  sy = this.sy,
		  swidth = this.swidth,
		  sheight = this.sheight,
		  x = this.x,
		  y = this.y,
		  width = this.width,
		  height = this.height) {
		this.ctx.drawImage(
			img,
			sx,
			sy,
			swidth,
			sheight,
			x,
			y,
			width,
			height
		);
	}
}