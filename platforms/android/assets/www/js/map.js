var map;
var pos;
document.addEventListener("deviceready", initMap, false);

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 1000, enableHighAccuracy: true });
    

    function onSuccess(position) {
        pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);                        
    }
    function onError() {

    		phonegap.plugins.diagnostic.isLocationEnabled(function(enabled){
		    console.log("Location is " + (enabled ? "enabled" : "disabled"));
		}, function(error){
		    console.error("The following error occurred: "+error);
		});
       
    }
   
      
}

