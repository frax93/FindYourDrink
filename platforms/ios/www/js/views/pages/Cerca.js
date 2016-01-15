define(function(require) {
  var Backbone = require("backbone");
  var Utils = require("utils");
  var drink_view=require("views/pages/Drink")
  var drink_model=require("models/Drink");
  var drink_collection=require("collections/Drink");

  var cerca = Utils.Page.extend({

    constructorName: "Cerca",
    
    initialize: function(options) {
       this.template = Utils.templates.cerca;
      this.listenTo(this, "inTheDOM", this.onLoad);
    },

    events:{
      "tap #ricerca": "Cerca"
    },

    render: function() {
    $(this.el).html(this.template());
      return this;
    },

    Cerca: function() {
      var drink=$("#find").attr("value");
      BaasBox.loadCollectionWithParams("drink",{where: "name="+"'"+drink+"'"}).done(function(response){
          if(response.length!=0){
        	  $("#error").remove();
    	  var drink=new drink_model({
            nome: response[0].name,
            id: "id"+response[0].ident
          });
          var drink_found=new drink_collection(drink);
          var drink_v=new drink_view(drink_found);
          $("#app").after("<div id='result'></div>");
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
    onLoad: function(){
    	$("#showme").hide();
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Cerca</h1>");  
    }
  });

  return cerca;

});