define(function(require) {
  var Backbone = require("backbone");
  var Utils = require("utils");
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
        var drink=new drink_model(response);
        var drink_found=new drink_collection(drink);
        //Render del drink trovato
        debugger;
      }).fail(function(response){

      });
    },
    onLoad: function(){

    }
  });

  return cerca;

});