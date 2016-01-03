define(function(require) {
  var Backbone = require("backbone");
  var Drink_solo=require("views/pages/Drink");
  var ListView=require("views/pages/Subview/List");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  var dm=new Drink_model();
  var spinner=require("spinner");
  
  var drinkView = Utils.Page.extend({

    constructorName: "drinkView",
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
        "tap #id15": "selected",
    },
    model: dm, 
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.append;
      // here we can register to inTheDOM or removing events
      sessionStorage.removeItem("selezionato_nome");
      sessionStorage.removeItem("selezionato_desc");
      this.listenTo(this, "inTheDOM", this.onload);
    },

    render: function() {
       $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
 
    analcolici: function(){
    	debugger;
    },
    drinksolo: function(){
    	//Aggiungere presa del nome del drink da html dinamicamente
    	var drink="Abbey";
    	BaasBox.loadCollectionWithParams("drink",{where: "name="+"'"+drink+"'"}).done(function(response){
            if(response.length!=0){
          	  $("#error").remove();
      	  var drink=new Drink_model({
              nome: response[0].name,
              id: "id"+response[0].ID
            });
            var drink_found=new Drink_collection(drink);
            var drink_v=new Drink_solo(drink_found);
            window.$('#result').after(drink_v.render().$el);
          }
            else{
          	  $("#result").remove();
          	  $("#error").append("<br>Drink non trovato, inserisci nome corretto");
            }
        }).fail(function(error){
      	  $("#error").append("<br>Errore di connessione riprovare più tardi");
        });
    },
    	
    onload: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	spinner.spin(document.body);
    	$("#hideme").show();
    	$("#showme").hide();
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Drinks</h1>");  
    	for(var key in sessionStorage){
    	   var ingre1=sessionStorage.getItem(key);
    	   var collection=new Drink_collection();
	    BaasBox.loadCollectionWithParams("drink",{where:"ingrediente1="+ingre1+"OR ingrediente2="+ingre1}).done(function(res){
	    		for(var key2 in res){
		  	    	  var model = new Drink_model({
		  	    		id: res[key2].ident,
		  	    		nome: res[key2].name,
		  	    		cartella: "drink"
		  	    	  }); 
		  	    	  collection.add(model);
		  	    	 }

	    	var page = new ListView({
	 			collection: collection
	 		  });
	    	spinner.stop();
  	   window.$('#append').after(page.render().$el);	
	    	
	      });
	    }
   	
	
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

  return drinkView;

});