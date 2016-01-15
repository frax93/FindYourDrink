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
    facebook: function(){
    	var u;
    	var t;
    	var url4Share;
    	//valorizziamo le variabili con i valori da passare
    	u=self.location.href;
    	t=document.title;
    	//codifichiamo secondo i dettami di Fb
    	u=encodeURIComponent(u);
    	t=encodeURIComponent(t);
    	//costruiamo il link:
    	url4Share='http://www.facebook.com/sharer.php?u='+u+'&t='+t;
    	//apriamo il link
    	self.location.href=url4Share;
    },
    render: function() {
       $(this.el).html(this.template({CollecLocalesolo: this.collection.toJSON()}));
      return this;
    },   
    
    loadData: function() {
    	$("#showme").hide();
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Locale</h1>");
    	$("#analcolici").append("<span class='icon icon-share' id='social'></span>");
        $("#social").css("left","400px");
        $("#social").on('tap',this.facebook);
    	var locale=new localeSm();
    	locale.attributes.nome=sessionStorage.getItem("selezionato_nome_locale");
    	locale.attributes.descrizione=sessionStorage.getItem("selezionato_desc_locale");
    	
    	var localec=new localeSc(locale);
    	this.collection= localec;
    	spinner.stop();
    },

    
  });

  return specificLView;

});