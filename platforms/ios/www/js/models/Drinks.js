define(function(require) {

	var Backbone = require("backbone");
	var Drink = Backbone.Model.extend({
		constructorName: "Drink",
		 defaults: {
          nome: null,
          immagine: null
        },
	});

	return Drink;
});