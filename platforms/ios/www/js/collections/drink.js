define(function(require) {

	var Backbone = require("backbone");
    var drinkSm = require("models/Drink");
    
	var drinkSc = Backbone.Collection.extend({
		constructorName:"Drink_Solo",
		model: drinkSm
	});

	return drinkSc;
});