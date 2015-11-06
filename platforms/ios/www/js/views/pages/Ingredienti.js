define(function(require) {
  var Backbone = require("backbone");
  var Frutta = require("views/pages/Subview/Frutta");
  var Alcolici = require("views/pages/Subview/Alcolici");
  var Altro = require("views/pages/Subview/Altro");
  var Utils = require("utils");
  var MyCollection = require("collections/Ingredienti");
  var Ingrediente = require("models/Ingrediente");

  var Ingredienti = Utils.Page.extend({

    constructorName: "Ingredienti",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.ingredienti;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.onload());
      BAASBOX_URL="http://localhost:9000";
      BAASBOX_APP_CODE="1234567890";
      BAASBOX_USER="admin";
      BAASBOX_PASSWORD="admin";
    
      //initialize BaasBox
      BaasBox.setEndPoint(BAASBOX_URL); //the address of your BaasBox server
      BaasBox.appcode =BAASBOX_APP_CODE;               //the application code of your server
      
  
      //at the moment we log in as admin  
      BaasBox.login(BAASBOX_USER,BAASBOX_PASSWORD)
        .done(function (user) {
            console.log("Logged in ", user);
        })
        .fail(function (err) {
          console.log("error ", err);
    });
     
      // by convention, all the inner views of a view must be stored in this.subViews
	},

    id: "ingredienti",
    className: "bar bar-standard",
    
    
   events: {
    
      "default": "frutta",
      "tap #tool1": "frutta",
      "tap #tool2": "alcolici",
      "tap #tool3": "altro"
      
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
             window.$('.img').remove();
             window.$('.segmented-control').after(frutta_view.render().$el);
             localStorage.getItem("Arancia");
         }).fail(function(error){
        	 
         });
     
    },
    alcolici: function(event){
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
          window.$('.img').remove();
          window.$('.segmented-control').after(alcolici_view.render().$el);
          
      }).fail(function(error){
     	 
      });
    },
    altro: function(event){
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
             window.$('.img').remove();
             window.$('.segmented-control').after(altro_view.render().$el);
             
         }).fail(function(error){
        	 
         });
    },
    
    
    onload: function() {
      //spinner.spin(document.body);
    	$("#hideme").hide();
    	$("#showme").show();

		
    },



    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return Ingredienti;

});