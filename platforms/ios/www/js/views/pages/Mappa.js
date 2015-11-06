define(function(require) {
  var Backbone = require("backbone");
  var Utils = require("utils");
    

  var mappaView = Utils.Page.extend({

    constructorName: "mappaView",
    className: "bar",
   events: {
    	"tap #ciuccio1": "goback"
    },

    initialize: function(options) {
      // when I am in the DOM, I can start adding all the Leaflet stuff
    	 this.template = Utils.templates.mappa;
     	this.listenTo(this, "inTheDOM", this.addMap);
    },

    render: function(){
    	$(this.el).html(this.template());
      return this;
    },

     
    goback: function() {
      window.history.back("specificLView");
    },
    
    
    loadData: function() {
    	// query DB    $(this.el).html(this.template({collec: this.collection.toJSON()}));
    },

 
 
    
  addMap: function() {
var map;
var x = document.getElementById("errori");

navigator.geolocation.getCurrentPosition(function(position){ 
  var chicago = {lat: position.coords.latitude, lng: position.coords.longitude };
  var indianapolis = {lat: 41.294938, lng: 13.3537368};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    scrollwheel: false,
    zoom: 7
  });
   var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });

  // Set destination, origin and travel mode.
  var request = {
    destination: indianapolis,
    origin: chicago,
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
  
  }, function(){switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }}); 
}
});
  return mappaView;

});