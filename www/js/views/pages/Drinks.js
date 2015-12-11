define(function(require) {
  var Backbone = require("backbone");
  var Drink_solo=require("views/pages/Drink");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  
  var drinkView = Utils.Page.extend({

    constructorName: "drinkView",
	id: "Drink",
    className: "bar",
   events: {
    	"tap #ciuccio1": "goback",
    	"tap .tap": "drinksolo",
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

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.drink;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.onload());
    },

    render: function() {
    	debugger;
       $(this.el).html(this.template({CollecDrink: this.collection.toJSON()}));
      return this;
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
    	$("#hideme").show();
    	$("#showme").hide();
    	//loop di tutto il contenuto localStorage for(var key in localStorage)
    	//Funziona con dati locali bisogna estendere
    	/* "(ingrediente1="+ingre1+"OR ingrediente2="+ingre2+")OR" +
	      		"(ingrediente1="+ingre2+"OR ingrediente2="+ingre1+")OR (ingrediente1="+ingre1+"OR " +
	      				"ingrediente3="+ingre3+"(OR ingrediente1="+ingre3+"OR ingrediente3="+ingre1+"OR  (ingrediente2="+ingre2+"OR" +
	    	      				"ingrediente3="+ingre3+"(OR ingrediente2="+ingre3+"OR ingrediente3="+ingre2*/
    	for(var key1 in localStorage){
        	for(var key2 in localStorage){
    	var ingre1=localStorage.getItem(key1);
	    var ingre2=localStorage.getItem(key2);
	    BaasBox.loadCollectionWithParams("drink",{where:"ingrediente1="+ingre1+"OR ingrediente2="+ingre2}).done(function(res){
	    	  sessionStorage.setItem(res[0].ident,res[0].name);
	    	  debugger;
	      });
	      }

    }    	
	  var drinks=new Drink_collection();
	     for(var key1 in sessionStorage){
		   var drink=new Drink_model({
          nome: sessionStorage[key1],
          id: key1
        });
		drinks.add(drink);
	}
	this.collection=drinks;
    },
    
    selected: function(event){
    	var id = event.target.id;
    	BaasBox.loadCollectionWithParams("drink",{where:"ident="+"'"+id+"'"}).done(function(res){
    	     sessionStorage.setItem("selezionato_nome",res[0].name);
    	     sessionStorage.setItem("selezionato_desc",res[0].descrizione);
    	     Backbone.history.navigate("Drink",{trigger: true});
    	});
    }
  });

  return drinkView;

});