define(function(require) {
  var Backbone = require("backbone");
  var Frutta = require("views/pages/Subview/Frutta");
  var Alcolici = require("views/pages/Subview/Alcolici");
  var Altro = require("views/pages/Subview/Altro");
  var Utils = require("utils");
  var MyCollection = require("collections/Ingredienti");
  var Ingrediente = require("models/Ingrediente");
  var Drink = require("views/pages/Drinks");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var spinner=require("spinner");

  var Ingredienti = Utils.Page.extend({

    constructorName: "Ingredienti",


    initialize: function() {
    
      // load the precompiled template
      this.template = Utils.templates.ingredienti;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.onload());
      // by convention, all the inner views of a view must be stored in this.subViews
	},

   events: {
    
      "default": "frutta",
      "tap #tool1": "frutta",
      "tap #tool2": "alcolici",
      "tap #tool3": "altro",
      "tap #showme":"goToDrink"
      
    },

    render: function() {
      
    	// dopo la view sarà inizialmente vuota e la riempiremo quando arriveranno i dati dalle query fatte al db
    	//$(this.el).html(this.template());   sara' fatto così:
      $(this.el).html(this.template());

      //Mirco: Quesito1
      this.$el.trigger("default");
      return this;
    },
    //FARE IL .fail in frutta,alcolici e altro
    frutta: function(event){
       spinner.spin(document.body);
    	 BaasBox.loadCollection("frutta").done(function(response){
             var collect= new MyCollection();
             for(var key_res in response){
                var model= new Ingrediente({
                  nome: response[key_res].Nome,
                  id: "id"+response[key_res].ID
                });
                collect.add(model);
              }
             var frutta_view=new Frutta(collect);
             window.$('#Alcolici').remove();
             window.$('#Altro').remove();
             spinner.stop();
             window.$('.segmented-control').after(frutta_view.render().$el);
             for(var key in sessionStorage){
          		$("#id"+key).addClass("active");
          		$("#id"+key).css("color","white");
          	}
         }).fail(function(error){
        	 
         });
     
    },
    alcolici: function(event){
      spinner.spin(document.body);
      BaasBox.loadCollection("alcolici").done(function(response){
          var collect= new MyCollection();
          for(var key_res in response){
             var ingrediente_model= new Ingrediente({
               nome: response[key_res].Nome,
               id: "id"+response[key_res].ID
             });
             collect.add(ingrediente_model);
           }
          var alcolici_view=new Alcolici(collect);
          window.$('#Frutta').remove();
          window.$('#Altro').remove();
          spinner.stop();
          window.$('.segmented-control').after(alcolici_view.render().$el);
          for(var key in sessionStorage){
        		$("#id"+key).addClass("active");
        		$("#id"+key).css("color","white");
        	}
      }).fail(function(error){
     	 
      });
    },
    altro: function(event){
      spinner.spin(document.body);
    	 BaasBox.loadCollection("altro").done(function(response){
             var altro_collection= new MyCollection();
             for(var key_res in response){
                var ingrediente_model= new Ingrediente({
                  nome: response[key_res].Nome,
                  id: "id"+response[key_res].ID
                });
                altro_collection.add(ingrediente_model);
              }
             var altro_view=new Altro(altro_collection);
             window.$('#Alcolici').remove();
             window.$('#Frutta').remove();
             spinner.stop();
             window.$('.segmented-control').after(altro_view.render().$el);
             for(var key in sessionStorage){
           		$("#id"+key).addClass("active");
           		$("#id"+key).css("color","white");
           	}
         }).fail(function(error){
        	 
         });
    },
    
    
    onload: function() {
    	$("#hideme").hide();
    	$("#showme").show();
    	$("#drink").hide();
    	
    },



    goToDrink: function(event) {

       	 Backbone.history.navigate("Drinks", {
           trigger: true
         });
       
    }
  });

  return Ingredienti;

});