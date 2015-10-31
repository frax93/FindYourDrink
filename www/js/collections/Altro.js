define(function(require) {

	var Backbone = require("backbone");
	var ingredienti = require("models/ingrediente");

	var altroc = Backbone.Collection.extend({
		//constructorName: "altro",
		model: ingredienti,
		url : function(){
              return BaasBox.endPoint + "/document/categoria";
        },
        parse: function(response) {
           //unwrap the response from the server....
           if(response.data) return response.data;
           return response;
    }
	});

	return altroc;
});