define(function(require) {
  var Backbone = require("backbone");
  var Drink_solo=require("views/pages/Drink");
  var Drink = require("views/pages/Subdrink");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  
 /* var model10 = new Drink_model({
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
   
 
    
    var Drink=new Drink_collection([model10, model11, model12,model13, model14]);*/

  var drinkView = Utils.Page.extend({

    constructorName: "drinkView",
	collection: Drink,
	id: "Drink",
    className: "bar",
   events: {
    	"tap #ciuccio1": "goback",
    	"tap .tap": "drinksolo"
    },

    initialize: function() {
		
      // load the precompiled template
      this.template = Utils.templates.drink;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.onload());
    },

    render: function() {
    	var drinks=new Drink_collection();
    	for(var key1 in sessionStorage){
    		 var drink=new Drink_model({
                 nome: sessionStorage[key1],
                 id: key1
               });
    		 drinks.add(drink);
    	}
    	this.collection=drinks;
    	debugger;
       $(this.el).html(this.template({CollecDrink: this.collection.toJSON()}));
      return this;
    },
 
    goback: function() {
      window.history.back("myview");
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
	    	  sessionStorage.setItem("id"+res[0].ID,res[0].name);
	    	  debugger;
	    	  /*var drink_collection= new Drink_collection();
	             for(var key_res in res){
	                var drink_model= new Drink_model({
	                  nome: res[key_res].name,
	                  id: "id"+res[key_res].ID
	                });
	                drink_collection.add(drink_model);
	              }
	              localStorage.setItem("RispostaDrink",drink_collection);
	              debugger;*/
	      });
	      }
    }
    	}

    
  });

  return drinkView;

});