define(function(require) {
  var Backbone = require("backbone");
  var drinkc = require("collections/Drink");
  var drinkm = require("models/Drink");
  var Utils = require("utils");
  
  var preferitiView = Utils.Page.extend({

    constructorName: "preferitiView",
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
      this.listenTo(this, "inTheDOM", this.loadData());
    },

    render: function() {
       $(this.el).html(this.template({CollecDrink: this.collection.toJSON()}));
      return this;
    },   
   
    goback: function() {
      window.history.back("myview");
    },
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	BaasBox.loadCollection("Preferiti").done(function(response){
    		for(var key in response)
    		 sessionStorage.setItem("Preferito"+key,response[key].drink);
    	}).fail(function(error){
    		//Fare qualcosa per segnalare errore
    	});
    	var drink_collection=new drinkc();
    	//STESSO PROBLEMA DI DRINKS con SFASAMENTO RICHIESTA
    	//Generalizzare per più preferiti
        //for(var key in sessionStorage){
        	var drink=sessionStorage.getItem("Preferito0");
    	 var drink_model=new drinkm({
    		nome: drink
    	 });
        drink_collection.add(drink_model);
        //}
        this.collection=drink_collection;
    },

    
  });

  return preferitiView;

});