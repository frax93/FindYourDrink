define(function(require) {
  var Backbone = require("backbone");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  


  var specificDView = Utils.Page.extend({

    constructorName: "specificD",
   events: {
        "tap #new": "gotoLocale",
    	"tap #star":"add_preferiti"
    },

    initialize: function(Collection) {
		
      // load the precompiled template
      this.template = Utils.templates.drinksolo;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData());
    },

    render: function() {
      $(this.el).html(this.template({Drinksolo: this.collection.toJSON()}));
      return this;
    },   
 
    
    loadData: function() {
    	// query DB   sul Locale $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	var drink_solo=new Drink_model();
    	drink_solo.attributes.nome=sessionStorage.getItem("selezionato_nome");
    	drink_solo.attributes.descrizione=sessionStorage.getItem("selezionato_desc");
    	var drink_collection=new Drink_collection(drink_solo);
    	this.collection= drink_collection;
    },
    gotoLocale: function(){
       Backbone.history.navigate("Locali",{trigger: true});  
    },
    add_preferiti: function(event) {
    	if($("#star").hasClass("icon-star")){
    	   $("#star").removeClass("icon-star");
    	   $("#star").addClass("icon-star-filled");
    	   $("#star").css("color","#FFD700");
    	   var drink_value=$(".media-body").attr("value");
    	   var drink={ "drink" : drink_value};
     	   BaasBox.createCollection("Preferiti").done(function(res){
    		  BaasBox.save(drink,"Preferiti");
    	   });
    	}
    	else{
    	   $("#star").addClass("icon-star");
     	   $("#star").removeClass("icon-star-filled");
     	  $("#star").css("color","black");
     	  var drink_value=$(".media-body").attr("value");
     	  BaasBox.deleteCollection("Preferiti");
     	 /*Bisogna vedere come fare 
     	  BaasBox.delete("","Preferiti").done(function(res) {
     	    console.log("res ", res);
     	  })
     	  .fail(function(error) {
     	    console.log("error ", error);
     	  });*/
    	}
    	
    }

    
  });

  return specificDView;

});