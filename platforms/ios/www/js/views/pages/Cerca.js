define(function(require) {

  var Backbone = require("backbone");
  var L = require("leaflet");
  var Utils = require("utils");

  var cerca = Utils.Page.extend({

    constructorName: "Cerca",


    id: "Cerca",
    className: "bar bar-nav",
    
    initialize: function(options) {
       this.template = Utils.templates.cerca;
      // when I am in the DOM, I can start adding all the Leaflet stuff
      this.listenTo(this, "inTheDOM", this.addCerca);
    },

    
    render: function() {
    $(this.el).html(this.template());
      return this;
    },

    addCerca: function() {
      
    }
  });

  return cerca;

});