//////////////////////////////// SEPARATE CLASS JS ///////////////////////////////

var ClassName = function(options) {
	this._privatevar = 1234;
	
	this.publicvar = 'hello';
	
	this._construct = function(args) {
		this._privatevar = args;
	}
	
	this._privatefunc = function(args) {
		return args;
	}
	
	this.publicfunc = function(args) {
		retval = this._privatefunc(args);
		
		console.log(retval);

		return retval;
	}
	
	// call "constructor"
	this._construct(options);
}

//////////////////////////////// SEPARATE INSTANTIATION JS ///////////////////////////////

$(document).ready(function() {

	var options = {
		id: 'hello',
		foo: 123,
		bar: 45
	}
	
	var myObject = new ClassName(options);
	
	myObject.publicfunc(options);	
	
	myObject.prototype.baz = function() {
		var test = {
			x: this.publicvar,
			y: this._privatevar
		}
		
		return test;
	}
});

