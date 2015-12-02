define(function(require) {
  var Backbone = require("backbone");
  var localic = require("collections/Locali");
  var localim = require("models/Locali");
  var Utils = require("utils");
  
  var model10 = new localim({
        nome: "LOCALE1",
		immagine: "locale1.jpg"
    });
     var model11 = new localim({
        nome: "LOCALE2",
		immagine: "locale2.jpg"
    });
    var model12 = new localim({
        nome: "LOCALE3",
		immagine: "locale3.jpg"
    });
     var model13 = new localim({
        nome: "LOCALE4",
		immagine: "locale4.jpg"
    });
   
 
    
    var collec=new localic([model10, model11,model12, model13]);

  var localiView = Utils.Page.extend({

    constructorName: "localiView",
	collection: collec,
	id: "Locali",
    className: "bar",
   events: {
        "tap #speclocal": "localinew",
    	"tap #ciuccio1": "goback",
    	"scroll " : "scrollfun"
    },

    initialize: function() {
		
      // load the precompiled template
      this.template = Utils.templates.locali;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
    },

    render: function() {
       $(this.el).html(this.template({CollecLocali: this.collection.toJSON()}));
      return this;
    },   
    scrollfun: function (){
         
    },
    localinew: function (){
         
    },
    goback: function() {
      window.history.back("drinkView");
    },
    
    onload: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	$("#showme").show();
    },

    
  });

  return localiView;

});