define(function(require) {
  var Backbone = require("backbone");
  var Drink_solo=require("views/pages/Drink");
  var ListView=require("views/pages/Subview/List");
  var Drink_collection = require("collections/Drink");
  var Drink_model = require("models/Drink");
  var Utils = require("utils");
  var dm=new Drink_model();
  var spinner=require("spinner");
  
  var drinkView = Utils.Page.extend({

    constructorName: "drinkView",
   events: {
    	"tap #id1": "selected",
        "tap #id2": "selected",
        "tap #id3": "selected",
        "tap #id4": "selected",
        "tap #id5": "selected",
        "tap #id6": "selected",
        "tap #id7": "selected",
        "tap #id8": "selected",
        "tap #id9": "selected",
        "tap #id10": "selected",
        "tap #id11": "selected",
        "tap #id12": "selected",
        "tap #id13": "selected",
        "tap #id14": "selected",
        "tap #id15": "selected",
        "default":"alcolici"
    },
    model: dm, 
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.append;
      // here we can register to inTheDOM or removing events
      sessionStorage.removeItem("selezionato_nome");
      sessionStorage.removeItem("selezionato_desc");
      this.listenTo(this, "inTheDOM", this.onload);
    },

    render: function() {
       $(this.el).html(this.template(this.model.toJSON()));
       this.$el.trigger("default");
      return this;
    },
 
    analcolici: function(){
    	if($("#toogle").hasClass("active")){
    		$("#listview").remove();
    		var collection=new Drink_collection();
    		for(var key=0;key<=sessionStorage.length;key++)
    	       baasbox("analcolici",key,collection);
    	}
    	else{
    		$("#listview").remove();
    		var collection=new Drink_collection();
    		for(var key=0;key<=sessionStorage.length;key++)
    	       baasbox("drink",key,collection);
    	}
    },
    	
    onload: function() {
    	spinner.spin(document.body);
    	$("#hideme").show();
    	$("#showme").hide();
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Drinks</h1>");
    	if(!$("#toogle").length){
    	   $("#analcolici").append(" <span class='toggle' id='toogle'><span class='toggle-handle' ></span></span>");
           $("#toogle").css("left","80%");
    	}
    	baasbox=this.baasboxrequest;
        $("#toogle").on('tap',this.analcolici);
    },
    alcolici:function(){
    	var collection=new Drink_collection();
    	for(var key=0;key<=sessionStorage.length;key++){
    		if(sessionStorage.selezionato_nome||sessionStorage.selezionato_nome_locale){
    		   sessionStorage.removeItem("selezionato_nome_locale");
   	           sessionStorage.removeItem("selezionato_desc_locale");
   	           sessionStorage.removeItem("selezionato_nome");
   	           sessionStorage.removeItem("selezionato_desc");
   	           sessionStorage.removeItem("sel_loc_mappa");
   	           sessionStorage.removeItem("sel_loc_orario");
    	       sessionStorage.removeItem("sel_loc_numero");
   	        }
    		this.baasboxrequest("drink",key,collection);
    	}
    },
    baasboxrequest:function(table,key,collection){
    	var chiave=sessionStorage.key(key);
 	   var ingre1=sessionStorage.getItem(chiave);
	    BaasBox.loadCollectionWithParams(table,{where:"ingrediente1="+ingre1+"OR ingrediente2="+ingre1+"OR ingrediente3="+ingre1}).done(function(res){
	    	     for(var key2 in res){
	    	    	 if(!$("#"+res[key2].ident).length){
		  	    	  var model = new Drink_model({
		  	    		id: res[key2].ident,
		  	    		nome: res[key2].name,
		  	    		cartella: "drink"
		  	    	  }); 
		  	    	  collection.add(model);
	    	    	 }
	    	    	 }
		  	    	if(key==sessionStorage.length-1){
		  		    	var page = new ListView({
		  		 			collection: collection
		  		 		  });
		  		    	spinner.stop();
		  	  	   window.$('#append').after(page.render().$el);	
		  	    	 }}).fail(function(error){
		  	    		 
		  	    	 });
       
	    },
    selected: function(event){
    	var id = event.target.id;
    	spinner.spin(document.body);
    	if(!$("#toogle").hasClass("active")){
    	BaasBox.loadCollectionWithParams("drink",{where:"ident="+"'"+id+"'"}).done(function(res){
    	     sessionStorage.setItem("selezionato_nome",res[0].name);
    	     sessionStorage.setItem("selezionato_desc",res[0].descrizione);
    	     Backbone.history.navigate("Drink",{trigger: true});
    	});
    	}
    	else{
    	BaasBox.loadCollectionWithParams("analcolici",{where:"ident="+"'"+id+"'"}).done(function(res){
   	     sessionStorage.setItem("selezionato_nome",res[0].name);
   	     sessionStorage.setItem("selezionato_desc",res[0].descrizione);
   	     Backbone.history.navigate("Drink",{trigger: true});
   	});}
    }
  });

  return drinkView;

});