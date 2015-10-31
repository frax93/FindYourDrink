define(function(require) {
  var Backbone = require("backbone");
  var localeSc = require("collections/Locale");
  var localeSm = require("models/Locale");
  var Utils = require("utils");
        
  var model10 = new localeSm({
        nome: "LOCALE1",
		immagine: "locale1.jpg"
    });
    
    var collec=new localeSc([model10]);

  var specificLView = Utils.Page.extend({
    constructorName: "Locale",
	collection: collec,
	id: "Locale",
    className: "bar",
   events: {
    	"tap #ciuccio1": "goback",
    	"tap #mappa": "mappa"
    },

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.localesolo;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
    },

    render: function() {
       $(this.el).html(this.template({CollecLocalesolo: this.collection.toJSON()}));
      return this;
    },   
    goback: function() {
      window.history.back("localiView");
    },
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    },

    
  });

  return specificLView;

});