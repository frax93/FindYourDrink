define(function(require) {

	var Backbone = require("backbone");
    var locale_model = require("models/Locale");
    
	var locale_collection = Backbone.Collection.extend({
		model: locale_model
	});

	return locale_collection;
});