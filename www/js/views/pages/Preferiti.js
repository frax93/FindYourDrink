define(function(require) {
  var Backbone = require("backbone");
  var drinkc = require("collections/Drinks");
  var drinkm = require("models/Drinks");
  var Utils = require("utils");
  
  var model10 = new drinkm({
        nome: "Abbey",
		immagine: "abbey.jpg"
    });
     var model11 = new drinkm({
        nome: "Americano",
		immagine: "Americano.jpg"
    });
    var model12 = new drinkm({
        nome: "Alexander",
		immagine: "ALEXANDER.jpg"
    });
    var model13 = new drinkm({
        nome: "Angelface",
		immagine: "angelface.jpg"
    });
     var model14 = new drinkm({
        nome: "Apotheke",
		immagine: "apotheke.jpg"
    });
   
 
    
    var collec=new drinkc([model10, model11, model12,model13, model14]);

  var preferitiView = Utils.Page.extend({

    constructorName: "preferitiView",
	collection: collec,
	id: "Preferiti",
    className: "bar",
   events: {
    	"tap #ciuccio1": "goback",
    	"scroll " : "scrollfun"
    },

    initialize: function() {
		
      // load the precompiled template
      this.template = Utils.templates.drink;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
    },

    render: function() {
       $(this.el).html(this.template({CollecDrink: this.collection.toJSON()}));
      return this;
    },   
    scrollfun: function (){
         
    },
    localinew: function (){
         
    },
    goback: function() {
      window.history.back("myview");
    },
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    },

    
  });

  return preferitiView;

});