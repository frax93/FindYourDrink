define(function(require) {
  require("baasbox");
  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyCollection = require("collections/Ingredienti");
  var MyModel = require("models/Ingrediente");
  var Utils = require("utils");
  
  var subview2 = Utils.Page.extend({
    id:"Alcolici",
    constructorName: "subview",
	
    initialize: function(Collection) {
      // load the precompiled template
      this.template = Utils.templates.subview2;
      // this.listenTo(this, "removing", functionName);s
      this.collection=Collection;
    },
    
   
    
    events: {
         "tap #id13": "selected",
         "tap #id14": "selected",
         "tap #id15": "selected",
         "tap #id16": "selected",
         "tap #id17": "selected",
         "tap #id18": "selected",
         "tap #id19": "selected",
         "tap #id20": "selected",
         "tap #id21": "selected",
         "tap #id22": "selected",
         "tap #id23": "selected",
         "tap #id24": "selected",
         "tap #id25": "selected",
         "tap #id26": "selected",
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
    
  });

  return subview2;

});