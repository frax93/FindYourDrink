define(function(require) {

	var Backbone = require("backbone");
	var drinkSm = Backbone.Model.extend({
		constructorName: "Drink",
		 defaults: {
          nome: null,
          id: null
        },
	});

	return drinkSm;
});