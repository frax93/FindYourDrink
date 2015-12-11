define(function(require) {
  var Backbone = require("backbone");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  


  var specificDView = Utils.Page.extend({

    constructorName: "specificD",
   events: {
        "tap #new": "localinew",
    	"tap #ciuccio1": "goback"
    },

    initialize: function(Collection) {
		
      // load the precompiled template
      this.template = Utils.templates.drinksolo;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData());
      //this.collection=Collection;
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

    
  });

  return specificDView;

});