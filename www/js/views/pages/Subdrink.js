define(function(require){
	  var Backbone = require("backbone");
	  var Drink_collection = require("collections/Drink");
	  var Drink_model = require("models/Drink");
	  var Utils = require("utils");
	  
	  var subview = Utils.Page.extend({
		    constructorName: "subviewD",
		    initialize: function(Collection){
		        // load the precompiled template
		        this.template = Utils.templates.drink;
		        // here we can register to inTheDOM or removing events
		        this.listenTo(this, "inTheDOM", this.loadData);
		        this.collection=Collection;
		        // this.listenTo(this, "removing", functionName);
		        // by convention, all the inner views of a view must be stored in this.subViews*/
		      },
		    events: {
		         "tap #new": "localinew",
		     	"tap #ciuccio1": "goback"
		    },
		    render: function() {
		         $(this.el).html(this.template({CollecDrink: this.collection.toJSON()}));
		         return this;
		    },
		    
	  });
	  return subview;
})