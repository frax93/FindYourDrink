define(function(require) {

	var Backbone = require("backbone");
    var ingredienti = require("models/ingredienti");
    
	var frutta = Backbone.Collection.extend({
		//constructorName: "frutta",
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

	return frutta;
});