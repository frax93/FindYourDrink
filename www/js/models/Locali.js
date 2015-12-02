define(function(require) {

	var Backbone = require("backbone");
	var localim = Backbone.Model.extend({
		constructorName: "Locali",
		 defaults: {
          nome: null,
          immagine: null
        },
	});

	return localim;
});