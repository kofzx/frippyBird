var Animal = function (name) {
	this.name = name;
};
Animal.prototype.say = function () {
	console.log(this.name);
};

// 寄生组合继承
var Cat = function (name) {
	Animal.apply(this, arguments);
};

Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.say = function () {
	var p = {
		name: 'ppp'
	};
	Animal.prototype.say.apply(p);
	console.log('cat:' + this.name);
};

var cat = new Cat('子猫');
cat.say();
