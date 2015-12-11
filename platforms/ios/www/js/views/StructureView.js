define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    events: {
      "tap #nav1": "preferiti",
      "tap #nav2": "ingredienti",
      "tap #nav3": "cerca",
      "tap #showme": "drink",
      "tap #hideme": "goBack",
      "tap #spec": "specifico",
      "tap #new": "locali",
      "tap #spec2": "specificol",
    },

    initialize: function(options) {
      // load the precompiled template
      this.resize();
      this.template = Utils.templates.structure;
      //this.on("inTheDOM", this.rendered);
      // bind the back event to the goBack function
      //document.getElementById("back").addEventListener("back", this.goBack(), false);
    },
    
    resize: function(){
      
    }, 
     
    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },

    // rendered: function(e) {
    // },

    // generic go-back function
    //Mirco: Quesito3
    goBack: function(){
      window.history.back("Ingredienti");
    },

    setActiveTabBarElement: function(elementId) {
      // here we assume that at any time at least one tab bar element is active
      document.getElementsByClassName("active")[0].classList.remove("active");
      document.getElementById(elementId).classList.add("active");
    },
    

    preferiti: function(event) {
      Backbone.history.navigate("Preferiti", {
        trigger: true
      });
    },
    
    cerca: function(event) {
      Backbone.history.navigate("Cerca", {
        trigger: true
      });
    },
    
    drink: function(event){
    	 Backbone.history.navigate("Drinks", {
        trigger: true
      });
    },
    
    specifico: function(event){
    	 Backbone.history.navigate("Drink", {
        trigger: true
      });
    },
    
    locali: function(event){
    	 Backbone.history.navigate("Locali", {
        trigger: true
      });
    },
    
    specificol: function(event){
    	 Backbone.history.navigate("Locale", {
        trigger: true
      });
    },

    ingredienti: function(event) {
      Backbone.history.navigate("Ingredienti", {
        trigger: true
      });
    }
  });
  return StructureView;

});