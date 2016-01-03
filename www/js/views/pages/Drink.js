define(function(require) {
  var Backbone = require("backbone");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  var spinner=require("spinner");
  


  var specificDView = Utils.Page.extend({

    constructorName: "specificD",
   events: {
        "tap #new": "gotoLocale",
    	"tap #star":"add_preferiti"
    },

    initialize: function(Collection) {
    	this.collection=Collection;
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
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Drink</h1>");  
    	if(this.collection==undefined){
    	var drink_solo=new Drink_model();
    	drink_solo.attributes.nome=sessionStorage.getItem("selezionato_nome");
    	drink_solo.attributes.descrizione=sessionStorage.getItem("selezionato_desc");
    	var drink_collection=new Drink_collection(drink_solo);
    	this.collection= drink_collection;
    	spinner.stop();
    	}
    },
    gotoLocale: function(){
    	  spinner.spin(document.body);
    	Backbone.history.navigate("Locali",{trigger: true});  
    },
    add_preferiti: function(event) {
    	if($("#star").hasClass("icon-star")){
    	   $("#star").removeClass("icon-star");
    	   $("#star").addClass("icon-star-filled");
    	   $("#star").css("color","#FFD700");
    	   var drink_value=$(".media-body").attr("value");
    	   var drink={ "drink" : drink_value};
     	   BaasBox.loaCollection("Preferiti").done(function(res){
    		  BaasBox.save(drink,"Preferiti");
    	   });
    	}
    	else{
    		debugger;
    	   $("#star").addClass("icon-star");
     	   $("#star").removeClass("icon-star-filled");
     	  $("#star").css("color","black");
     	  var drink_value=$(".media-body").attr("value");
     	$.ajax({
            url: 'http://localhost:9000' + '/document/' + 'Preferiti' + '?where=drink=Abbey',
            method: 'DELETE'
          });
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