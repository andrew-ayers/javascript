/*
 * From:
 * 
 * http://www.htmlgoodies.com/html5/tutorials/create-an-object-oriented-javascript-class-constructor.html
 * http://www.htmlgoodies.com/tutorials/emulate-classical-inheritance-in-javascript.html
 * http://www.htmlgoodies.com/html5/javascript/extending-javascript-objects-in-the-classical-inheritance-style.html
 * 
 */ 
var Class = function() {
	var parent;
	var methods;
	
	var klass = function() {
		this._initialize.apply(this, arguments);

		// copy the properties so that they can be called directly from the child
		// class without $super, i.e., this.name
		var reg = /\(([\s\S]*?)\)/;
		var params = reg.exec(this._initialize.toString());
		
		if (params) {
			var param_names = params[1].split(',');
			
			for (var i = 0; i < param_names.length; i++) {
				this[param_names[i]] = arguments[i];
			}
		}		
	}
	
	var extend = function(destination, source) {   
         for (var property in source) {
			destination[property] = source[property];
         }

		destination.$super = function(method) {
			return this.$parent[method].apply(this.$parent, Array.prototype.slice.call(arguments, 1));
		}
		
		return destination;
	}

	if (typeof arguments[0] === 'function') {       
       parent  = arguments[0];       
       methods = arguments[1];     
    } 
    else {       
       methods = arguments[0];     
    }     
   
    if (parent !== undefined) {       
       extend(klass.prototype, parent.prototype);       
       
       klass.prototype.$parent = parent.prototype;
    }
    
    extend(klass.prototype, methods);
    
    klass.prototype.constructor = klass;      
	
	if (!klass.prototype.initialize) klass.prototype.initialize = function() {};

	return klass;
}
