function openMenu() {
    makeMockLocs();
    if(menu.style.display != "block"){
        document.getElementById("menu").style.display = "block";
    }
    else{
        document.getElementById("menu").style.display = "none";
    }
}

function openSavedLocations(){
    document.getElementById("menu").style.display = "none";
    if(document.getElementById("savedLocationsPage").style.display != "block")
      document.getElementById("savedLocationsPage").style.display = "block";
    $('#lol').html(generateUpdatedLink());
    if(localStorage.length != 0){
      $('.deleteAll').html("<button type='button' id='deleteAll' class='deleteButton' onclick='deleteItem(this.id)'>UnLoc All!</button>");  
    }
}

function openMap(){
    if(document.getElementById("savedLocationsPage").style.display != "none")
        document.getElementById("savedLocationsPage").style.display = "none";
    //clean all saved locs on map
    
    //refresh locs based on new data
}

function toggleMap(){
    if(document.getElementById("savedLocationsPage").style.display == "none"){
        document.getElementById("savedLocationsPage").style.display = "block";
        document.getElementById("toggleTitle").innerHTML = "Map";
    }
    else{
        document.getElementById("savedLocationsPage").style.display = "none";
        document.getElementById("toggleTitle").innerHTML = "Saved Locations";
    }
    //check if form is on display
    if(document.getElementById("form").style.display == "block"){
      document.getElementById("form").style.display = "none";
      document.getElementById("map").style.opacity = "1";
   }

   //close menu
   document.getElementById("menu").style.display = "none";
}

function saveItem(lat,lng,name,note){
    if(name === ""){
        alert("Name field is empty");
        return;
    }
    var object ={
        lat:lat,
        lng:lng,
        name:name,
        note:note
    }

    //parse and save object locally
    if(localStorage.getItem(object.name) != null){
        alert("location with such name exists already! Please choose another name for the location.");
    }else{
        data.addLoc(object);
        document.getElementById("form").style.display = "none";
        document.getElementById("map").style.opacity = "1";
        //Empty the form's fields
        document.getElementById("form").setAttribute("lat","");
        document.getElementById("form").setAttribute("lng","");
        document.getElementById("itemName").value = "";
        document.getElementById("itemNote").value = "";
        alert("Saved successfully");
    }
}

function deleteItem(id){
    if(id == "deleteAll"){
        window.localStorage.clear();
        $('#lol').html(generateUpdatedLink());
        for (var i = 0; i < keys.length; i++) {
            keys[i].marker.setMap(null);
          }
          keys = [];
    }
    else{
        data.unLoc(id);
        alert(id + " UnLoc-ed successfully!");
        $('#lol').html(generateUpdatedLink());
        var n;
        for (var i = 0; i < keys.length; i++) {
            if(keys[i].name == id){
                keys[i].marker.setMap(null);
                keys.splice(i, 1);
                n = i;
                break;
            }
        }
    }
    
    if(localStorage.length == 0){
      $('.deleteAll').html("");  
    }     
}
    
function generateUpdatedLink(){
    var str = "";
    for(var i = 0; i < localStorage.length; i++){
        str = str + "<li>" + 
                    "<a href='#'  onClick='showOnMap(" + i +")' class='locLink'>" +
                    localStorage.key(i) +
                    "</a>" +
                    "<button type='button' class='deleteButton' id='" + localStorage.key(i) +
                    "' onclick='deleteItem(this.id)'>UnLoc!</button>";               
    }
    return str;
};

function changeMode(directionMode){
    directionsDisplay.setMap(null);
    mode = directionMode;
    document.getElementById("DRIVING").className = "btn btn-default";
    document.getElementById("WALKING").className = "btn btn-default";
    document.getElementById("BICYCLING").className = "btn btn-default";
    document.getElementById("TRANSIT").className = "btn btn-default";
    document.getElementById(directionMode).className = "btn btn-info";
}

function showOnMap(key){
    google.maps.event.trigger(keys[key].marker, 'click');
    openMap();
}

$("#savedLocationsPage").click(function(){
    document.getElementById("menu").style.display = "none";
})


