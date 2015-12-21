define(function(require) {
  var Backbone = require("backbone");
  var localic = require("collections/Locali");
  var localim = require("models/Locali");
  var Utils = require("utils");

  var localiView = Utils.Page.extend({

    constructorName: "localiView",
	id: "Locali",
    className: "bar",
   events: {
        "tap #speclocal": "localinew",
    	"tap #ciuccio1": "goback",
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
        "tap #id11": "selected"
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

    goback: function() {
      window.history.back("drinkView");
    },
    
    onload: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	$("#showme").show();
    	var drink=sessionStorage.getItem("selezionato_nome");
	    BaasBox.loadCollectionWithParams("Locali",{where:"drink1="+drink+"OR drink2="+drink}).done(function(res){
	    	  for(var key1 in res)
	    	      sessionStorage.setItem(res[key1].name,res[key1].via);
	    });    	
	  var locali=new localic();
	     for(var key1 in sessionStorage){
		   var locale=new localim({
          nome: sessionStorage[key1],
          id: key1
        });
		locali.add(locale);
	}
	this.collection=locali;
    },
    
     selected: function(event){
    	var id = event.target.id;
    	BaasBox.loadCollectionWithParams("Locali",{where:"ident="+"'"+id+"'"}).done(function(res){
    	     sessionStorage.setItem("selezionato_nome",res[0].name);
    	     sessionStorage.setItem("selezionato_desc",res[0].descrizione);
    	     Backbone.history.navigate("Locale",{trigger: true});
    	});
    }

    
  });
  
  

  return localiView;

});