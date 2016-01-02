define(function(require) {
  var Backbone = require("backbone");
  var localic = require("collections/Locali");
  var localim = require("models/Locali");
  var ListView=require("views/pages/Subview/List");
  var Utils = require("utils");

  var localiView = Utils.Page.extend({

    constructorName: "localiView",
   events: {
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
        "tap #id10": "selected"
    },

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.append;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.onload);
    },

    render: function() {
       $(this.el).html(this.template());
      return this;
    },   

    goback: function() {
      window.history.back("drinkView");
    },
    
    onload: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	$("#showme").hide();
    	var drink=sessionStorage.getItem("selezionato_nome");
    	drink="'"+drink+"'";
    	var collection=new localic();
	    BaasBox.loadCollectionWithParams("Locali",{where:"drink1="+drink+"OR drink2="+drink}).done(function(res){ 
	    	for(var key2 in res){
	  	    	  var model = new localim({
	  	    		id: res[key2].ident,
	  	    		nome: res[key2].name,
	  	    		cartella: "locali"
	  	    	  }); 
	  	    	  collection.add(model);
	  	    	 }
  	var page = new ListView({
			collection: collection
		  });
   window.$('#append').after(page.render().$el);
	    }).fail(function(error){});    	
    },
    
     selected: function(event){
    	var id = event.target.id;
    	BaasBox.loadCollectionWithParams("Locali",{where:"ident="+"'"+id+"'"}).done(function(res){		
    	     sessionStorage.setItem("selezionato_nome_locale",res[0].name);
    	     sessionStorage.setItem("selezionato_desc_locale",res[0].descrizione);
    	     Backbone.history.navigate("Locale",{trigger: true});
    	});
    }

    
  });
  
  

  return localiView;

});