define(function(require) {

	var Backbone = require("backbone");
    var localim = require("models/Locali");
    
	var localic = Backbone.Collection.extend({
		model: localim
	});

	return localic;
});