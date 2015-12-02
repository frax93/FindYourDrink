define(function(require) {

	var Backbone = require("backbone");
	var localeSm = Backbone.Model.extend({
		constructorName: "Locale",
		 defaults: {
          nome: null,
          immagine: null
        },
	});

	return localeSm;
});