define(function(require) {

	var Backbone = require("backbone");
    var drinkm = require("models/Drink");
    
	var drinkc = Backbone.Collection.extend({
		constructorName:"Drink",
		model: drinkm
	});

	return drinkc;
});