define(function(require) {

  var Backbone = require("backbone");
  var collection = require("collections/Drink");
  var Utils = require("utils");

  var ListView = Utils.Page.extend({

    constructorName: "ListView",

    collection: collection,

    initialize: function() {
      this.template = Utils.templates.list;  
    },

    id: "listview",

    render: function() {
      $(this.el).html(this.template({list: this.collection.toJSON()}));
      return this;
    },
  });

  return ListView;

});
