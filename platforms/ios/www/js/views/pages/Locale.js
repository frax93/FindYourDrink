define(function(require) {
  var Backbone = require("backbone");
  var localeSc = require("collections/Locale");
  var localeSm = require("models/Locale");
  var Utils = require("utils");
  var specificLView = Utils.Page.extend({
    constructorName: "Locale",

    initialize: function() {
      // load the precompiled template
      $(window).on('orientationchange',this.gotomap);
      this.template = Utils.templates.localesolo;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.loadData());
    },
    
    gotomap: function(){
    	 Backbone.history.navigate("Mappa", {
    	       trigger: true
    	     });
    },
    render: function() {
       $(this.el).html(this.template({CollecLocalesolo: this.collection.toJSON()}));
      return this;
    },   
    goback: function() {
      window.history.back("localiView");
    },
    
    loadData: function() {
    	$("#showme").hide();
    	var locale=new localeSm();
    	locale.attributes.nome=sessionStorage.getItem("selezionato_nome_locale");
    	locale.attributes.descrizione=sessionStorage.getItem("selezionato_desc_locale");
    	var localec=new localeSc(locale);
    	this.collection= localec;
    },

    
  });

  return specificLView;

});