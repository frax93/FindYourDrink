define(function(require) {

	var Backbone = require("backbone");
    var drinkm = require("models/Drinks");
    
	var drinkc = Backbone.Collection.extend({
		constructorName:"Drink",
		model: drinkm
	});

	return drinkc;
});