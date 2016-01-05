define(function(require) {
   var $ = require("jquery");
  var Backbone = require("backbone");
  var MyCollection = require("collections/Ingredienti");
  var MyModel = require("models/ingrediente");
  var Utils = require("utils");

  var subview1 = Utils.Page.extend({
    id: "Frutta",

    constructorName: "subview",
	
    initialize: function(Collection){
	     	
      // load the precompiled template
      this.template = Utils.templates.subview1;
      // here we can register to inTheDOM or removing events
      this.collection=Collection;
      this.listenTo(this, "inTheDOM", this.loadData);
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews*/
    },
    
   
    
    events: {
         "tap #id1": "selected",
         "tap #id2": "selected",
         "tap #id3": "selected",
         "tap #id4": "selected",
         "tap #id5": "selected",
         "tap #id6": "selected",
    },

    render: function() {
    	// dopo la view sarà inizialmente vuota e la riempiremo quando arriveranno i dati dalle query fatte al db
    	//$(this.el).html(this.template());   sara' fatto così:
    	
       $(this.el).html(this.template({collec1: this.collection.toJSON()}));
      return this;
    },
    
    selected:function(event){
    	var id = event.target.id;
        var selezione=$("#"+id+".current").attr("value");
    		if(this.$("#"+id).hasClass('not-checked')){
    		        this.$("#"+id).removeClass('not-checked');
    		   		this.$("#"+id).addClass('active');
    		   		this.$("#"+id).css("color","white");
    		   	    sessionStorage.setItem(event.target.id[2],selezione);
    		}
    	    else {
    	        this.$("#"+id).removeClass('active');
    	        this.$("#"+id).css("color","#007aff");
    	        this.$("#"+id).addClass('not-checked');
    	        sessionStorage.removeItem(event.target.id[2]);
    	    }
      },
    
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    },

  });

  return subview1;

});