define(function(require) {

	var Backbone = require("backbone");
	var drinkSm = Backbone.Model.extend({
		constructorName: "Drink",
		 defaults: {
          nome: null,
          immagine: null
        },
	});

	return drinkSm;
});