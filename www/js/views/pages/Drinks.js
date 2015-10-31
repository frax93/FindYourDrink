define(function(require) {
  var Backbone = require("backbone");
  var Drink_collection = require("collections/Drinks");
  var Drink_model = require("models/Drinks");
  var Utils = require("utils");
  
  var model10 = new Drink_model({
        nome: "Abbey",
		immagine: "abbey.jpg"
    });
     var model11 = new Drink_model({
        nome: "Americano",
		immagine: "Americano.jpg"
    });
    var model12 = new Drink_model({
        nome: "Alexander",
		immagine: "ALEXANDER.jpg"
    });
    var model13 = new Drink_model({
        nome: "Angelface",
		immagine: "angelface.jpg"
    });
     var model14 = new Drink_model({
        nome: "Apotheke",
		immagine: "apotheke.jpg"
    });
   
 
    
    var Drink=new Drink_collection([model10, model11, model12,model13, model14]);

  var drinkView = Utils.Page.extend({

    constructorName: "drinkView",
	collection: Drink,
	id: "Drink",
    className: "bar",
   events: {
    	"tap #ciuccio1": "goback",
    },

    initialize: function() {
		
      // load the precompiled template
      this.template = Utils.templates.drink;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.onload());
    },

    render: function() {
       $(this.el).html(this.template({CollecDrink: this.collection.toJSON()}));
      return this;
    },
 
    goback: function() {
      window.history.back("myview");
    },
    
    onload: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	$("#hideme").show();
    	$("#showme").hide();
    	//LocalStorage riprendo i dati e poi query a Baasbox.loadCollectionwithParams("drink",....).done(function(response){});
    	debugger;
    	BaasBox.loadCollection("drink").done(function(response){
    		var drink_model=new Drink_model(response);
    		var drink_collection=new Drink_collection(drink_model);
    		debugger;
    	});
    },

    
  });

  return drinkView;

});