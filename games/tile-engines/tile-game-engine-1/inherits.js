/**
 * Inheritance monkey-patched implementation on the JS base Object definition
 * 
 * This adds a method for all objects to inherit methods and attributes from
 * another object, via a call structured as:
 * 
 * 		var result_object = {child-object}.inherits({parent-object} [, options]);
 * 
 * Where:
 * 
 * 		result_object => resulting object from the inheritance
 * 		child-object  => child object inheriting (usually "this")
 * 		parent-object => parent object inheriting from
 * 		options       => optional basic object of option values; these are
 * 						 concatenated together for the result object
 * 
 * The resulting object will also have implemented by this system two additional
 * methods, as follows:
 * 
 * 		getOptions() - returns the consolidated options list, as defined on all 
 * 					   parents and passed in options
 * 
 * 		getSuper() - returns the "ultimate parent" object of the inheritance tree
 * 
 */ 
Object.prototype.inherits = function inherits() {
	// Get the child object
	var child = this;

	// Get all arguments (there must be at least one argument)
	if (arguments.length >= 1) {
		if (arguments.length == 1) {
			// Singular argument for parent; instantiate the object from it
			var parent = new arguments[0];
		}
		else if (arguments.length == 2) {
			// Argument for parent; instantiate the object from it
			var parent = new arguments[0](arguments[1]);			
			
			// Extend the options of the child using passed in options and parent options
			child._options = $.extend(true, parent._options, arguments[1]);
		}
		else {
			// Invalid number of arguments - return			
			return null;
		}
	}
	else {
		// Invalid number of arguments - return
		return null;
	}
	
	// Define a method to get the options from the private attribute
	child.getOptions = function() {
		return this._options;
	}
	
	// Define a method to get the super class/object from "this" object
	child.getSuper = function() {
		// If there isn't a "super" class on "this" class (at "base"), then
		// return the child's super class
		if (!this._super) {
			if (this._child) {
				return this._child._super;
			}
		}
		else {
			// Otherwise return the super class/object
			return this._super;
		}
	}
	
	// Assign child class to parent
	parent._child = child;
	
	// Re-assign the prototype
	child.__proto__ = parent;
	
	// Assign parent class to child
	child._super = parent;

	// Extend the child from the parent
	child = $.extend(true, child, parent);

	return child;
}
