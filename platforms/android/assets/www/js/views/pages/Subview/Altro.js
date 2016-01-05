define(function(require) {
  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyCollection = require("collections/Ingredienti");
  var MyModel = require("models/Ingrediente");
  var Utils = require("utils");

  var subview3 = Utils.Page.extend({
    id: "Altro",

    constructorName: "subview",

    initialize: function(Collection) {
     
	  	
      // load the precompiled template
      this.template = Utils.templates.subview3;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData);
      this.collection=Collection;
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews*/
    },
    
   
    
    events: {
         "tap #id27": "selected",
         "tap #id28": "selected",
         "tap #id29": "selected",
         "tap #id30": "selected",
         "tap #id31": "selected",
         "tap #id32": "selected",
    },

    render: function() {
		//alert(this.collection.at(0).toJSON());
    	// dopo la view sarà inizialmente vuota e la riempiremo quando arriveranno i dati dalle query fatte al db
    	//$(this.el).html(this.template());   sara' fatto così:
		
      $(this.el).html(this.template({collec1: this.collection.toJSON()}));
      return this;
    },
    
    selected: function(event){
    	var id = event.target.id;
        var selezione=$("#"+id+".current").attr("value");
    		if(this.$("#"+id).hasClass('not-checked')){
    		        this.$("#"+id).removeClass('not-checked');
    		   		this.$("#"+id).addClass('active');
    		   		this.$("#"+id).css("color","white");
    		   	    sessionStorage.setItem(event.target.id[2]+event.target.id[3],selezione);
    		}
    	    else {
    	        this.$("#"+id).removeClass('active');
    	        this.$("#"+id).css("color","#007aff");
    	        this.$("#"+id).addClass('not-checked');
    	        sessionStorage.removeItem(event.target.id[2]+event.target.id[3]);
    	    }
      },
    
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    },

  });

  return subview3;

});