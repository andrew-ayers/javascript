var myObject = (function() {
  //these are only accessible internally
  var privateVar = 'this is private';
  var privateFunction = function() {
    return "this is also private";
  };
   
  return {
    //these can be accessed externally
    publicVar: 'this is public',
     
    publicFunction: function() {
      return "this is also public"
    },
 
    //this is a 'privileged' function - it can access the internal private vars
    myFunction: function() {
      return privateVar;
    }
  };
})();
 
console.log(myObject.privateVar); //returns null as private var is private
console.log(myObject.myFunction()); //return the private var as myFunction has access to private properties
