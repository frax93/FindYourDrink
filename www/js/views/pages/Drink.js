define(function(require) {
  var Backbone = require("backbone");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  
  var model10 = new Drink_model({
        nome: "Abbey",
		immagine: "abbey.jpg"
    });
    
    var collec=new Drink_collection([model10]);

  var specificDView = Utils.Page.extend({

    constructorName: "specificD",
	collection: collec,
	id: "Drink",
    className: "bar",
   events: {
        "tap #new": "localinew",
    	"tap #ciuccio1": "goback"
    },

    initialize: function() {
		
      // load the precompiled template
      this.template = Utils.templates.drinksolo;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
    },

    render: function() {
       $(this.el).html(this.template({CollecDrinksolo: this.collection.toJSON()}));
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