define(function(require) {
  var Backbone = require("backbone");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  


  var specificDView = Utils.Page.extend({

    constructorName: "specificD",
	
	id: "Drink",
    className: "bar",
   events: {
        "tap #new": "localinew",
    	"tap #ciuccio1": "goback"
    },

    initialize: function(Collection) {
		
      // load the precompiled template
      this.template = Utils.templates.drinksolo;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
      this.collection=Collection;
    },

    render: function() {
    	debugger;
       $(this.el).html(this.template({Drinksolo: this.collection.toJSON()}));
      return this;
    },   
    goback: function() {
      window.history.back("drinkView");
    },
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    },

    
  });

  return specificDView;

});