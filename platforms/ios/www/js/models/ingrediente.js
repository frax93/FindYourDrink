define(function(require) {
	var Backbone = require("backbone");
   var Ingrediente = Backbone.Model.extend({
       defaults: {
          nome: null,
          immagine: null
        },
	    constructorName:"Ingrediente",
      initialize: function() {
  }
});
	return Ingrediente;
});
