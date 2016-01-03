define(function(require) {
  var Backbone = require("backbone");
  var ListView=require("views/pages/Subview/List");
  var drinkc = require("collections/Drink");
  var drinkm = require("models/Drink");
  var Utils = require("utils");
  var spinner=require("spinner");
  var drinkca=new drinkc(); 
  
  var preferitiView = Utils.Page.extend({
    collection: drinkca,
    constructorName: "preferitiView",
   events: {
	   "tap #id1": "selected",
       "tap #id2": "selected",
       "tap #id3": "selected",
       "tap #id4": "selected",
       "tap #id5": "selected",
       "tap #id6": "selected",
       "tap #id7": "selected",
       "tap #id8": "selected",
       "tap #id9": "selected",
       "tap #id10": "selected",
       "tap #id11": "selected",
       "tap #id12": "selected",
       "tap #id13": "selected",
       "tap #id14": "selected",
       "tap #id15": "selected"
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
    		var i=0;
    		for(var key in res){
    			i++;
	  	    	  var model = new drinkm({
	  	    		nome: res[key].drink,
	  	    		id: "id"+i,
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
    selected: function(event){
    	var id = event.target.id;
    	spinner.spin(document.body);
    	BaasBox.loadCollectionWithParams("drink",{where:"ident="+"'"+id+"'"}).done(function(res){
    	     sessionStorage.setItem("selezionato_nome",res[0].name);
    	     sessionStorage.setItem("selezionato_desc",res[0].descrizione);
    	     Backbone.history.navigate("Drink",{trigger: true});
    	});
    }

    
  });

  return preferitiView;

});