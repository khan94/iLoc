/* Model for map */

var map;
var pos;
var keys = [];
var directionsService; 
var directionsDisplay; 
var mode = "DRIVING";
var currentRouteDest;


var mapModel = {

	// Initiate map and find Geolocation and show on the map
	initiate: function() {
        var check = false;
//	  map = new google.maps.Map(document.getElementById('map'), {
//	    zoom: 15,
//	    streetViewControl: false,
//	    mapTypeControl: false,
//	    zoomControl: false
//	  });
	   directionsService = new google.maps.DirectionsService;
	   directionsDisplay = new google.maps.DirectionsRenderer({
	   	markerOptions:{
	   		visible:false,
	   	}
	   });
	   
	    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 4000, enableHighAccuracy: true });


	    function onSuccess(position) {
            check = true;
	      pos = {
	      lat: position.coords.latitude,
	      lng: position.coords.longitude
	      };
	      //center map on user
	      map.setCenter(pos);
	      var currentLocationImage = {
	      url: 'img/myLocation.png',
	      scaledSize: new google.maps.Size(40, 40)
	    };

		var marker = new google.maps.Marker({
	    	position: pos,
	    	map: map,
	    	icon: currentLocationImage
		});
		
		var infowindow = new google.maps.InfoWindow({
	  		content: "<div>"+
	  				 "<h1 style='color:#00a3cc;'>"+
	  				 "YOU!"+
	  				 "</h1>"+
	  				 "</div>"
	  	});
	  	
	  	marker.addListener('click', function() {
	    	infowindow.open(map, marker);
	  	});
	    
	    google.maps.event.addListener(map, "click", function(event) {
		    infowindow.close();
		});
            
	    }
	    function onError(error) {
	        //alert("Turn on GPS");
	        var err = {
	        1: 'Permission denied',
	        2: 'Position unavailable',
	        3: 'Request timeout'
	        };
	  alert("Error: " + err[error.code]);
	    }

	    // SAVE LOCATION on map & Form click events
	    var saveLocationButton = document.createElement('button');
	    saveLocationButton.style.color = 'rgb(25,25,25)';
	    saveLocationButton.style.backgroundColor = '#3498db'
	    saveLocationButton.style.fontFamily = 'Roboto,Arial,sans-serif';
	    saveLocationButton.style.fontSize = '60px';
	    saveLocationButton.style.margin = "20px";
	    saveLocationButton.style.borderRadius = '20px';
	    saveLocationButton.style.border = 'solid #3498db';
	    saveLocationButton.innerHTML = 'Save Location';

	    saveLocationButton.index = 1;
//	    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(saveLocationButton);
	    saveLocationButton.addEventListener('click', function() {
	      var object = pos;
	      $("#form").attr("lat", object.lat);
	      $("#form").attr("lng", object.lng);
	      document.getElementById("form").style.display = "block";
	      document.getElementById("map").style.opacity = "0.2";
	    });

	    //Close form if map is clicked
//	    google.maps.event.addListener(map, 'click', function(event) {
//	      document.getElementById("menu").style.display = "none";
//	      document.getElementById("form").style.display = "none";
//	      document.getElementById("map").style.opacity = "1";
//	       
//	    });

		// Remove Route on map & its click events
	    var removeRouteButton = document.createElement('button');
	    removeRouteButton.id = "removeRouteButton";
	    removeRouteButton.className = "btn btn-danger";
	    removeRouteButton.style.fontSize = '40px';
	    removeRouteButton.style.margin = "20px";
	    removeRouteButton.style.opacity = 0.8;
	    removeRouteButton.style.display = "none";
	    removeRouteButton.innerHTML = 'Remove<br/>Route!';

	    removeRouteButton.index = 2;
//	    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(removeRouteButton);
	    removeRouteButton.addEventListener('click', function(){
	    	currentRouteDest = null;
	    	directionsDisplay.setMap(null);
	    	removeRouteButton.style.display = "none";
	    });

	    //Add all marker stored in storage to map
	    addAllLocationsOnMap();
        return check;
	},



	// Add location to map as a marker, set its infowindow
	addLoc: function(location,name,note) {
		var locIcon = {
		url: 'img/key.png',
		scaledSize: new google.maps.Size(70, 70)
		};

		var marker = new google.maps.Marker({
	    	id: name,
	    	position: location,
	        map: map,
	        icon: locIcon
	  	});

	  	//Add infoWindows
	  	var contentString = "<div>" +
	              			"<h1 >" +
			              	name +
			              	"</h1>" +
			              	"<hr>" +
			              	"<h2>" +
			              	"Notes: "+
			              	"</h2>" +
			              	"<p style='font-size: 40px;'>" +
			              	note+
			              	"</p>" +
			            	"<hr>" +
			            	"<input type='button' class='btn btn-primary' id='" + name + "' value='Get Directions!' onclick = 'getDirection(this.id)'/>" +
			            	"</br>" +
			            	"<hr>" +
			            	"</br>" +
			            	"<input type='button' class='btn btn-danger' id='" + name + "' value='UnLoc!' onclick = 'deleleDataLocation(this.id); deleleMapLocation(this.id);'/>" +
			            	"</div>"
			            	;

	  	var infowindow = new google.maps.InfoWindow({
	  		content: contentString
	  	});
//	  	marker.addListener('click', function() {
//	    	infowindow.open(map, marker);
//	  	});

	  	//close infowindow if clicked on map's layout
//	  	google.maps.event.addListener(map, "click", function(event) {
//		    infowindow.close();
//		});
	 	keys.push({name, marker});
	},

	//Calculate and display the desired route or display an error
	displayRoute: function(directionsService, dest){
		directionsService.route({
	    origin: pos,
	    destination: dest, //get the location of the marker
	    travelMode: google.maps.TravelMode[mode]
	  	}, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
            
	    	directionsDisplay.setDirections(response);
	    	document.getElementById("removeRouteButton").style.display = "block";
	    } else {
	    	window.alert('Directions request failed due to ' + status);
	    }
	  	});
	}
}
