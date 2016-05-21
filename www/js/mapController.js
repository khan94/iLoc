/* Controller for the map */

// DO UPON START 
function initialize() {
    document.addEventListener('deviceready', mapModel.initiate(), false);
}

// Add locations on map as marker
function addLocationOnMap(latitude,longtitude,name,note){
	if(name != "" && !data.objectExists(name)){
        
        var pos = {
		lat: parseFloat(latitude),
		lng: parseFloat(longtitude)
		}
		
		//add to map
		mapModel.addLoc(pos,name,note);
    }
}

// Get directions from your current location to the desired marker on map
function getDirection(name){
	//get position of destination
	var dest = data.getPos(name);
  currentRouteDest = dest;
	directionsDisplay.setMap(map);
  mapModel.displayRoute(directionsService, dest);
}

//Change the Direction type --  Walking, Driving, Cycling, or Transit
function changeDirectionType(directionMode){
	directionsDisplay.setMap(null);
  mode = directionMode;

  //Refresh route if exists on the map
  if(currentRouteDest != null){
    mapModel.displayRoute(directionsService, currentRouteDest);
  directionsDisplay.setMap(map);
  }

  document.getElementById("DRIVING").className = "btn btn-default";
  document.getElementById("WALKING").className = "btn btn-default";
  document.getElementById("BICYCLING").className = "btn btn-default";
  document.getElementById("TRANSIT").className = "btn btn-default";
  document.getElementById(directionMode).className = "btn btn-info";
}

//Change the theme of the map
function changeMapTheme(theme){
  var darkTheme = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
  var hipster = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];
  var blueWater = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];

  //Change directionDisplay polyline option in map model
  switch(theme) {
    case "DARK":
        map.set('styles', darkTheme);

        directionsDisplay.setMap(null);
        directionsDisplay.set('polylineOptions', {strokeColor: "orange" , strokeWeight: 8});
        directionsDisplay.setMap(map);
        break;
    case "HIPSTER":
        map.set('styles', hipster);
        directionsDisplay.setMap(null);
        directionsDisplay.set('polylineOptions', {strokeColor: "black" , strokeWeight: 8});
        directionsDisplay.setMap(map);
        break;
    case "BLUEWATER":
        map.set('styles', blueWater);
        directionsDisplay.setMap(null);
        directionsDisplay.set('polylineOptions', {strokeColor: "grey" , strokeWeight: 8});
        directionsDisplay.setMap(map);
        break;
    default:
        map.set('styles', null);
        directionsDisplay.setMap(null);
        directionsDisplay.set('polylineOptions', null);
        directionsDisplay.setMap(map);
  } 
  
  
  
  document.getElementById("STANDARD").className = "btn btn-default";
  document.getElementById("DARK").className = "btn btn-default";
  document.getElementById("HIPSTER").className = "btn btn-default";
  document.getElementById("BLUEWATER").className = "btn btn-default";
  document.getElementById(theme).className = "btn btn-info";
}


//Open the map layout
function openMap(){
	if(document.getElementById("savedLocationsPage").style.display != "none")
        document.getElementById("savedLocationsPage").style.display = "none";
}

// Show the Item(Location) on the map
function showOnMap(name){
	for(var i = 0; i< keys.length; i++){
        if(keys[i].name == name){
            google.maps.event.trigger(keys[i].marker, 'click');
            openMap();
            return;
        }
    }
}

// Delete all markers(locations) from the map
function deleteAllMapLocations(){
	for (var i = 0; i < keys.length; i++) {
        keys[i].marker.setMap(null);
    }
    keys = [];
}

// Delete the desired marker from map
function deleteMapLocation(key){
	var n;
    for (var i = 0; i < keys.length; i++) {
        if(keys[i].name == key){
            keys[i].marker.setMap(null);
            directionsDisplay.setMap(null);
            removeRouteButton.style.display = "none";
            keys.splice(i, 1);
            n = i;
            break;
        }
    }
}


// function to add all the locations to the map
function addAllLocationsOnMap(){
  var allKeys = data.getAllDataKeysArray();

  for(var i = 0; i < allKeys.length; i++){
  	var name = data.getName(allKeys[i]);
    var note = data.getNote(allKeys[i]);
    var pos  = data.getPos(allKeys[i]);
    mapModel.addLoc(pos, name, note);
  }
}

// Open the Settings menu
function openMenu() {
    if(menu.style.display != "block"){
        document.getElementById("menu").style.display = "block";
    }
    else{
        document.getElementById("menu").style.display = "none";
    }

    
      var object_bike ={
          lat: 49.26471,
          lng: -123.25349,
          name: "My Bike",
          note: "Parked right beside Sauder."
      }

      var object_car = {
          lat: 49.28196,
          lng: -123.11922,
          name: "My Car",
          note: "Parked on the 5th floor."
      }

      var object_house = {
        lat: 49.33937,
        lng:  -123.19492,
        name: "My House",
        note: "Where I live..."
      }
      data.addLoc(object_house);
      data.addLoc(object_car);
      data.addLoc(object_bike);

      $('#lol').html(refreshList());
      if(data.isStorageEmpty){
        $('.deleteAll').html("<button type='button' id='deleteAll' class='deleteButton' onclick='deleteAllDataLocations(); deleteAllMapLocations();'>UnLoc All!</button>");  
      }
    
}