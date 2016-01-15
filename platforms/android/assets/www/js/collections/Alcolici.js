define(function(require) {
	 

	var Backbone = require("backbone");
	var ingredienti = require("models/ingrediente");

	var alcolici_collection = Backbone.Collection.extend({
		//constructorName: "alcolici",
		model: ingredienti,
		url : function(){
              return BaasBox.endPoint + "/document/alcolici";
        },
        parse: function(response) {
        	debugger;
           //unwrap the response from the server....
           if(response.data) return response.data;
           return response;
    }
	});

	return alcolici_collection;
});