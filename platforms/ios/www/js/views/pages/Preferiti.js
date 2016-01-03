define(function(require) {
  var Backbone = require("backbone");
  var ListView=require("views/pages/Subview/List");
  var drinkc = require("collections/Drink");
  var drinkm = require("models/Drink");
  var Utils = require("utils");
  var drinkca=new drinkc(); 
  var preferitiView = Utils.Page.extend({
    collection: drinkca,
    constructorName: "preferitiView",
   events: {
    	"tap #ciuccio1": "goback",
    },

    initialize: function() {
      // load the precompiled template
    	this.template = Utils.templates.append;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
    },

    render: function() {
       $(this.el).html(this.template({Collec: this.collection.toJSON()}));
      return this;
    },   
   
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	$("#showme").hide();
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Preferiti</h1>");  
    	var collection= new drinkc();
    	BaasBox.loadCollection("Preferiti").done(function(res){
    		for(var key in res){
	  	    	  var model = new drinkm({
	  	    		nome: res[key].drink,
	  	    		cartella: "drink"
	  	    	  }); 
	  	    	  collection.add(model);
	  	    	 }
	        var page = new ListView({
			    collection: collection
		    });
            window.$('#append').after(page.render().$el);
    	}).fail(function(error){
    		//Fare qualcosa per segnalare errore
    	});
    },

    
  });

  return preferitiView;

});