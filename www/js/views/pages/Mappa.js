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
	  var inizio = {lat: 41.85, lng: -87.65};
	  var fine = {lat: 39.79, lng: -86.14};

	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: inizio,
	    scrollwheel: false,
	    zoom: 7
	  });

	  var directionsDisplay = new google.maps.DirectionsRenderer({
	    map: map
	  });

	  // Set destination, origin and travel mode.
	  var request = {
	    destination: fine,
	    origin: inizio,
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
console.log("sono qui");
     var options = {
       center: inizio,
       zoom: 8,
       mapTypeId: google.maps.MapTypeId.ROADMAP
       };
		console.log("sono alla fine");
		
    }
    
  });

  return mappaView;

});



    
