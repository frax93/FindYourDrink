define(function(require) {
  var Backbone = require("backbone");
  var Utils = require("utils");
  var spinner=require("spinner"); 

  var mappaView = Utils.Page.extend({

    constructorName: "mappaView",
   events: {
    	"tap #ciuccio1": "goback"
    },

    initialize: function(options) {
      // when I am in the DOM, I can start adding all the GOOGLE MAPS stuffs
    	$(window).on('orientationchange',this.gotolocale);
    	this.loadData();
    	this.template = Utils.templates.mappa;
     	this.listenTo(this, "inTheDOM", this.addMap());
     	
     	
    },

    render: function(){
    	$(this.el).html(this.template());
      return this;
    },

     
    
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    	$(".title").hide();
    	$("#hideme").hide();
    	$("#maps").hide();
    	$("#content").css("overflow-y","hidden");
    	$("#content").css("left","-2%");
    	$("#content").css("height","724%");
    },

 
    gotolocale: function(){
    	window.history.back("Locale");
    	$(window).off('orientationchange');
    	navigator.geolocation.clearWatch(id);
    	$(".title").show();
    	$("#hideme").show();
    	$("#maps").show();
    	$("#content").css("overflow-y","scroll");
    },
    
  addMap: function() {
	 id= navigator.geolocation.watchPosition(function(position){ 
      var posizione_attuale = {lat: position.coords.latitude, lng: position.coords.longitude };
	    var geocoder = new google.maps.Geocoder();
	  var via=sessionStorage.getItem("sel_loc_mappa");
	  geocoder.geocode({ 'address': via+",L'Aquila" }, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK){
		//Coordinate del locale
	    var posizione_locale={
	    		lat: results[0].geometry.location.lat(),
	            lng: results[0].geometry.location.lng()};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: posizione_attuale,
    scrollwheel: false,
    zoom: 20
  });
   var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });
  // Set destination, origin and travel mode.
  var request = {
    destination: posizione_locale,
    origin: posizione_attuale,
    travelMode: google.maps.TravelMode.DRIVING
  };

  // Pass the directions request to the directions service.
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
  });
	  }
	});
  }, function(){switch(error.code) {
       //nothing
    }});
   spinner.stop();
}    
    });
  return mappaView;

});