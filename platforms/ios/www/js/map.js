var map;
var pos;
var keys = [];
var directionsService; 
var directionsDisplay; 
var mode = "DRIVING";
function initialize() {
    document.addEventListener('deviceready', initMap(), false);
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });
   directionsService = new google.maps.DirectionsService;
   directionsDisplay = new google.maps.DirectionsRenderer;
  //makeMockLocs();
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 4000, enableHighAccuracy: true });


    function onSuccess(position) {
      pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
      //center map on user
      map.setCenter(pos);
      var currentLocationImage = {
      url: 'img/myLocation.png',
      scaledSize: new google.maps.Size(20, 20)
    };

	  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: currentLocationImage

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


    var saveLocationButton = document.createElement('button');
    saveLocationButton.style.color = 'rgb(25,25,25)';
    saveLocationButton.style.backgroundColor = '#3498db'
    saveLocationButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    saveLocationButton.style.fontSize = '20px';
    saveLocationButton.style.margin = "20px";
    saveLocationButton.style.borderRadius = '20px';
    saveLocationButton.style.border = 'solid #3498db';
    saveLocationButton.innerHTML = 'Save Location';

    saveLocationButton.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(saveLocationButton);
    saveLocationButton.addEventListener('click', function() {
      var object = pos;
      $("#form").attr("lat", object.lat);
      $("#form").attr("lng", object.lng);
      document.getElementById("form").style.display = "block";
      document.getElementById("map").style.opacity = "0.2";
    });

    //Close form is map is clicked
    google.maps.event.addListener(map, 'click', function(event) {
      document.getElementById("menu").style.display = "none";
      document.getElementById("form").style.display = "none";
      document.getElementById("map").style.opacity = "1";
       
    });

    addAllLocs();
}

// Function for adding Locs to the map.
    function addLoc(location,name,note) {
      var locIcon = {
      url: 'img/key.png',
      scaledSize: new google.maps.Size(30, 30)
      };
      var marker = new google.maps.Marker({
          id: name,
          position: location,
          map: map,
          icon: locIcon
      });

      //Add infoWindows
      var contentString = "<div>" +
                  "<h2 >" +
                  name +
                  "<hr>" +
                  "</h2>" +
                  "<p>" +
                  "<h4>" +
                  "Notes: "+
                  "</h4>" +
                  note+
                  "</p>" +
                "<hr>" +
                "<input type='button' class='btn btn-primary' id='dir_" + name + "' value='Get Directions!' onclick = 'getDir(this.id)'/>" +
                "</div>"
                ; //added a button to gety diretions from current location to this marker

      var infowindow = new google.maps.InfoWindow({
      content: contentString
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      keys.push({name, marker});
    }

// function to add all the locations to the map
    function addAllLocs(){
      for(var i = 0; i < localStorage.length; i++){
        var name = data.getName(localStorage.key(i));
        var note = data.getNote(localStorage.key(i));
        var pos  = data.getPos(localStorage.key(i));
        addLoc(pos, name, note);
      }

    }

    function makeMockLocs(){
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

      $('#lol').html(generateUpdatedLink());
      if(localStorage.length != 0){
        $('.deleteAll').html("<button type='button' id='deleteAll' class='deleteButton' onclick='deleteItem(this.id)'>UnLoc All!</button>");  
      }
    }



function getDir(id){
    var name = id.substring(4);
    console.log(name);
    
  
    // we have map
  
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, name);
  //var onChangeHandler = function() {
    
  //};
  //document.getElementById('start').addEventListener('change', onChangeHandler);
  //document.getElementById('end').addEventListener('change', onChangeHandler);
}


function calculateAndDisplayRoute(directionsService,name) {
    var dest = data.getPos(name);
  directionsService.route({
    origin: pos,
    destination: dest, //get the location of the marker
    travelMode: google.maps.TravelMode[mode]
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
