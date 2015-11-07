define(function(require) {
  require("baasbox");
  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyCollection = require("collections/Ingredienti");
  var MyModel = require("models/Ingrediente");
  var Utils = require("utils");
  
  var subview2 = Utils.Page.extend({

    constructorName: "subview",
	
    initialize: function(Collection) {
      // load the precompiled template
      this.template = Utils.templates.subview2;
      // this.listenTo(this, "removing", functionName);s
      this.collection=Collection;
    },
    
   
    
    events: {
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
         "tap #id11": "selected",
         "tap #id12": "selected",
         "tap #id13": "selected",
         "tap #id14": "selected",
    },

    render: function() {
    	// dopo la view sarà inizialmente vuota e la riempiremo quando arriveranno i dati dalle query fatte al db
    	//$(this.el).html(this.template());   sara' fatto così:
      $(this.el).html(this.template({collec1: this.collection.toJSON()}));
      return this;
      
    },
    
     selected: function(event){
    	 var id = event.target.id;
         var selezione=$("#"+id+".current").attr("value");
     		if(this.$('input[type="checkbox"]').hasClass('not-checked')){
     		        this.$('input[type="checkbox"]').removeClass('not-checked');
     		   		this.$("#"+id).addClass('active');
     		   	    this.$("#"+id).css("color","white");
     		   		localStorage.setItem(selezione,selezione);
     		}
     	    else {
     	        this.$("#"+id).removeClass('active');
     	        this.$("#"+id).css("color","#007aff");
     	        this.$('input[type="checkbox"]').addClass('not-checked');
     	        localStorage.removeItem(selezione);
     	    }
       },
    
    /*NON SERVE loadData
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
      
    },
*/
  });

  return subview2;

});