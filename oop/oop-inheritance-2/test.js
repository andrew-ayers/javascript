$(document).ready(function() {
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
});
