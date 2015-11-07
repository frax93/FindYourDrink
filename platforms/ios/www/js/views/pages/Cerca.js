define(function(require) {
  var Backbone = require("backbone");
  var Utils = require("utils");
  var drink_view=require("views/pages/Drink")
  var drink_model=require("models/Drink");
  var drink_collection=require("collections/Drink");

  var cerca = Utils.Page.extend({

    constructorName: "Cerca",
    id: "Cerca",
    className: "bar bar-nav",
    
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
        debugger;
    	  var drink=new drink_model({
            nome: response[0].name,
            id: "id"+response[0].ID
          });
        var drink_found=new drink_collection(drink);
        //Render del drink trovato
        var drink_v=new drink_view(drink_found);
        window.$('#result').after(drink_v.render().$el);
      }).fail(function(response){

      });
    },
    onLoad: function(){

    }
  });

  return cerca;

});