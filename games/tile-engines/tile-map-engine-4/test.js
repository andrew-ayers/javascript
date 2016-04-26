$(document).ready(function() {
	/*
	var world = [];
	
	for (var y = 0; y < 128; y++) {
		var row = [];
		for (var x = 0; x < 128; x++) {
			/*
			var x2 = Math.pow(x - 64, 2);
			var y2 = Math.pow(y - 64, 2); 
			
			var v = (Math.sin(x2 + y2) / (x2 + y2)) * 10000;
			if (v < 0) v = 0;
			
			row[x] = Math.floor(v);
			* /
			
			row[x] = Math.floor(Math.random() * 4);
		}
		
		world[y] = row;
	}
	
	var options = {
		id: 'myCanvas',

		tileset: {
			path: 'tiles/dg_grounds32.gif',	// path to tileset for world
			width: 9,					// width of tileset (in tiles)
			height: 19					// height of tileset (in tiles)
		},

		tiles: {
			width: 32,					// width of a tile (in pixels)
			height: 32					// height of a tile (in pixels)
		},
		
		display: {
			width: 15,					// width of the displayed map window (in tiles)
			height: 15					// height of the displayed map window (in tiles)
		},
		
		map: {
			data: world					// map data
		},
		
		ptileset: {
			path: 'tiles/dg_people32a.gif',	// path to tileset for people (players)
			width: 4,					// width of tileset (in tiles)
			height: 3					// height of tileset (in tiles)
		},
		
		player: {
			tile: 10,
			x: 6,						// player x-position (in tiles)
			y: 6,						// player y-position (in tiles)
			dx: 1,						// player movement delta-x (in tiles)
			dy: 1						// player movement delta-y (in tiles)
		}
	}	
	
	//console.log(options);
		
	var myEngine = new TileEngine(options);
	
	myEngine.start();
	*/
	
	var Person = Class({
		// private vars (defaults)
		_name: '',
		_age: 0,
		
		// constructor (private)
		_initialize: function(name, age) {
			this._name = name;
			this._age = age;
		},
		
		// getters/setters
		getName: function()     { return this._name; },
		setName: function(name) { this._name = name; },
		
		// public methods		
		addBirthday: function() {
			this._age++;
		},
		
		toString: function() {
			return "My name is " + this._name + " and I am " + this._age + " years old.";
		}
	});
	
	var alice = new Person('Alice', 26);
	
	console.log(alice.getName());
	console.log(alice.toString());

	alice.setName('Bob');

	console.log(alice.getName());
	console.log(alice.toString());

	alice.addBirthday();
	console.log(alice.getName());
	console.log(alice.toString());

	// Extending the Person class
	var Employee = Class(Person, {
		_initialize: function(name, age, id) {
			//OR put subclass params first:
			//this.$super('initialize', Array.prototype.slice.call(arguments, 0,2));
			this.$super('_initialize', name, age);
			this.id = id;
		},
		
		toString: function() {
			return "I am employee #" + this.id + ". " + this.$super('toString');
		},
		
		anotherFunction: function() {
			return 'test';
		}
	});
	
	var chuck = new Employee('Chuck', '44', '1234');
	
	console.log(chuck.toString());
	
	//var myPlayer = new Player({});
	
	//myPlayer.testFunc();
	
	//console.log(Object.getPrototypeOf(myPlayer));
	
	//console.log(myPlayer.position);
	
/*	
console.log('Defining Person class:');
var Person = Class({
    _initialize: function(name, age) {
        console.log('init:'+name);
        this.name = name;
        this.age  = age;
    },
    toString: function() {
        return "My name is "+this.name+" and I am "+this.age+" years old.";
    }
});

console.log('Defining Employee class:');
var Employee = Class(Person, {
    _initialize: function(name, age, id) {
      //OR put subclass params first:
      //this.$super('initialize', Array.prototype.slice.call(arguments, 0,2));
      this.$super('_initialize', name, age);
      this.id = id;
    },
    toString: function() {
      return "I am employee #"+this.id+". "+ this.$super('toString');
    },
    anotherFunction: function() {
      return 'test';
    }
});

console.log('Defining Manager class:');
var Manager = Class(Employee, {
    _initialize: function(name, age, id, numberOfEmployees) {
      //OR put subclass params first:
      //this.$super('initialize', Array.prototype.slice.call(arguments, 0,2));
      this.$super('_initialize', name, age, 'MA_'+id);
      this.numberOfEmployees = numberOfEmployees || 1;
    },
    toString: function() {
      return this.$super('toString')+"I have "+this.numberOfEmployees+" employee(s) working for me.";
    },
                fireEmployee: function(employee) {
                  return employee.name+", you're fired!";
                }
});

console.log('Instantiating  Person class:');
var alice = new Person('Alice', 26);
console.log('Instantiating  Employee class:');
var bob = new Employee('Bob', '40', '12345');
console.log('Alice\'s age is '+alice.age);
console.log(alice.toString());
console.log('');
//document.writeln(bob.anotherFunction());
var manager = new Manager('Sue', '43', '9999');
console.log(manager.toString());
console.log(manager.fireEmployee(bob));
*/	
	
	
	
	
	/*
	myPlayer.position = {x: 10, y: 5}
	
	console.log(myPlayer.position);
	
	myPlayer.moveTo(20, 20);
	
	console.log(myPlayer.position);
	*/
});
