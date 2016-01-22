define(function(require) {
  var Backbone = require("backbone");
  var localic = require("collections/Locali");
  var localim = require("models/Locali");
  var ListView=require("views/pages/Subview/List");
  var Utils = require("utils");
  var spinner=require("spinner");

  var localiView = Utils.Page.extend({

    constructorName: "localiView",
   events: {
    	"tap #ciuccio1": "goback",
    	"tap #id1": "selected",
        "tap #id2": "selected",
        "tap #id3": "selected",
        "tap #id4": "selected",
        "tap #id5": "selected",
        "tap #id6": "selected",
        "tap #id7": "selected",
        "tap #id8": "selected",
        "tap #id9": "selected",
        "tap #id10": "selected"
    },

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.append;
      // here we can register to inTheDOM or removing events
      this.listenTo(this, "inTheDOM", this.onload);
    },

    render: function() {
       $(this.el).html(this.template());
      return this;
    },   
    onload: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	$("#showme").hide();
    	$(".title").remove();
    	$("#title").after("<h1 class='title prova'>Locali</h1>"); 
    	var drink=sessionStorage.getItem("selezionato_nome");
    	drink="'"+drink+"'";
    	var collection=new localic();
	    BaasBox.loadCollectionWithParams("Locali",{where:"drink1="+drink+"OR drink2="+drink+"OR drink3="+drink}).done(function(res){ 
	    	navigator.geolocation.getCurrentPosition(function(position){
	    		//Prendo geo-posizione attuale
	    		var latitude1=position.coords.latitude;
	    		var longitude1=position.coords.longitude;
	    		    for(var key2 in res)
	    		    	positions(key2,latitude1,longitude1,res.length);
	    	});
	   function positions(key2,latitude1,longitude1,length){ 
		   var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': res[key2].via }, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK){
			//Coordinate del locale
		    var latitude2=results[0].geometry.location.lat();
		    var longitude2=results[0].geometry.location.lng();
		    //calcolo distanza tra position e via 
		    var distanza=Math.sqrt(Math.pow(latitude2-latitude1,2)+Math.pow(longitude2-longitude1,2));
    	        var model = new localim({
    		      id: res[key2].ident,
    		      nome: res[key2].name,
    		      cartella: "locali",
    		      distanza:distanza
    	  }); 
    	  collection.add(model);
    	  if(key2==length-1){
    		  //ordina per distanza
    		  collection.models.sort(function(a,b){
    			  return a.attributes.distanza-b.attributes.distanza;});
    		  //render della collection
    	  var page = new ListView({
	  			collection: collection
	  		  });
    	  spinner.stop();
window.$('#append').after(page.render().$el);}
		  }
		  });
		}
	    }).fail(function(error){});    	
    },
    
     selected: function(event){
    	var id = event.target.id;
    	spinner.spin(document.body);
    	BaasBox.loadCollectionWithParams("Locali",{where:"ident="+"'"+id+"'"}).done(function(res){		
    	     sessionStorage.setItem("selezionato_nome_locale",res[0].name);
    	     sessionStorage.setItem("selezionato_desc_locale",res[0].descrizione);
    	     sessionStorage.setItem("sel_loc_mappa",res[0].via);
    	     sessionStorage.setItem("sel_loc_orario",res[0].orario);
    	     sessionStorage.setItem("sel_loc_numero",res[0].telefono);
    	     Backbone.history.navigate("Locale",{trigger: true});
    	});
    }

    
  });
  
  

  return localiView;

});