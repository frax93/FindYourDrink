define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var StructureView = require("views/StructureView");
  var ingredienti = require("views/pages/Ingredienti");
  var Preferiti = require("views/pages/Preferiti");
  var Cerca = require("views/pages/Cerca");
  var Drinks = require("views/pages/Drinks");
  var Locali= require("views/pages/Locali");
  var Drink = require("views/pages/Drink");
  var Locale = require("views/pages/Locale");
  var MappaView = require("views/pages/Mappa");

  var AppRouter = Backbone.Router.extend({
     
    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "Ingredienti": "ingredienti",
      "Preferiti": "preferiti",
      "Cerca": "cerca",
      "Drinks":"drinks",
      "Locali":"locali",
      "Drink":"specific_Drink",
      "Locale":"specific_Locale",
      "Mappa":"mappa"
      
    },

    firstView: "Ingredienti",

    initialize: function(options) {
      this.currentView = undefined;
    },

    ingredienti: function() {
      // highlight the nav2 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav2");      
      // create the view
      var page = new ingredienti(
	  );
      // show the view
      this.changePage(page);
      
    },
    
    cerca: function() {
      // highlight the nav3 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav3");
      // create the view and show it
      var page = new Cerca({});
      this.changePage(page);
      
    },
    
    preferiti: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav1");
      // create the view and show it
      var page = new Preferiti();
      this.changePage(page);
      
    },
    
    drinks: function() {
      // create the view and show it
      var page = new Drinks();
      this.changePage(page);
      
    },
    
    specific_Drink: function() {
      // create the view and show it
      var page = new Drink();
      this.changePage(page);
      
    },
    
    locali: function() {
      // create the view and show it
      var page = new Locali();
      this.changePage(page);
      
    },

    specific_Locale: function() {
      // create the view and show it
      var page = new Locale();
      this.changePage(page);
      
    },
    mappa: function() {
        // create the view and show it
        var page = new MappaView();
        
        this.changePage(page);
        
      },
    
    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {trigger: true});
    },

  });

  return AppRouter;

});