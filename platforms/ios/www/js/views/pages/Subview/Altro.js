define(function(require) {
  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyCollection = require("collections/Ingredienti");
  var MyModel = require("models/Ingrediente");
  var Utils = require("utils");

  var subview3 = Utils.Page.extend({
    id: "s3",

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
    		if(this.$('input[type="checkbox"]').hasClass('not-checked')){
    		        this.$('input[type="checkbox"]').removeClass('not-checked');
    		   		this.$("#"+id).addClass('active');
    		   		localStorage.setItem(selezione,selezione);
    		}
    	    else {
    	        this.$("#"+id).removeClass('active');
    	        this.$('input[type="checkbox"]').addClass('not-checked');
    	        localStorage.removeItem(selezione);
    	    }
      },
    
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    },

  });

  return subview3;

});