class Animal {
	constructor (name = 'noname', age = 0) {
		this.name = name;
		this.age = age;
	}

	say () {
		console.log(this.name, this.age);
	}
}

class Cat extends Animal {
	constructor (name, age) {
		super(name, age);
	}

	say () {
		super.say();
		console.log('children');
	}
}

const cat = new Cat('cat', 7);
cat.say();