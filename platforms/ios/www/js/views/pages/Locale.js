define(function(require) {
  var Backbone = require("backbone");
  var localeSc = require("collections/Locale");
  var localeSm = require("models/Locale");
  var Utils = require("utils");
  var spinner=require("spinner");
  
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
    	spinner.spin(document.body);
    	 Backbone.history.navigate("Mappa", {
    	       trigger: true
    	     });
    },
    
    render: function() {
       $(this.el).html(this.template({CollecLocalesolo: this.collection.toJSON()}));
      return this;
    },   
    
    loadData: function() {
    	$("#showme").hide();
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Locale</h1>");
    	var locale=new localeSm();
    	locale.attributes.nome=sessionStorage.getItem("selezionato_nome_locale");
    	locale.attributes.descrizione=sessionStorage.getItem("selezionato_desc_locale");
    	locale.attributes.orario=sessionStorage.getItem("sel_loc_orario");
    	locale.attributes.numero=sessionStorage.getItem("sel_loc_numero");	
    	var localec=new localeSc(locale);
    	this.collection= localec;
    	spinner.stop();
    },

    
  });

  return specificLView;

});