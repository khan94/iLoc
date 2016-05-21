/* Controller for Data Testing */


// Delete location 
function deleteDataLocation(key){
	data.unLoc(key);
    
    alert(key + " UnLoc-ed successfully!");
    $('#lol').html(refreshList());

    // Remove the Delete All button if all data is removed
    if(data.isStorageEmpty){
      $('.deleteAll').html("");  
    } 
}

// Delete all locations
function deleteAllDataLocations(){
	data.clearStorage();
    $('#lol').html(refreshList());

    // Remove the Delete All button 
    $('.deleteAll').html("");    
}

// Add location
function saveLocation(lat,lng,name,note){
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
    if(data.objectExists(object.name)){
        alert("location with such name exists already! Please choose another name for the location.");
    }else{
        data.addLoc(object);
//        document.getElementById("form").style.display = "none";
//        document.getElementById("map").style.opacity = "1";
//
//        //Empty the form's fields
//        document.getElementById("form").setAttribute("lat","");
//        document.getElementById("form").setAttribute("lng","");
//        document.getElementById("itemName").value = "";
//        document.getElementById("itemNote").value = "";
        alert("Saved successfully");
    }
}

// Open savedLocations layout
function openSavedLocations(){
	document.getElementById("menu").style.display = "none";
    if(document.getElementById("savedLocationsPage").style.display != "block")
      document.getElementById("savedLocationsPage").style.display = "block";
    $('#lol').html(refreshList());
    if(!data.isStorageEmpty){
      $('.deleteAll').html("<button type='button' id='deleteAll' class='deleteButton' onclick='deleteAllDataLocations(); deleteAllMapLocations();'>UnLoc All!</button>"); 
    }
}

// Regenerate the list (Refresh list) 
function refreshList(){
    var str = "";
    var allKeys = data.getAllDataKeysArray();

    for(var i = 0; i < allKeys.length; i++){
        str = str + "<li>" + 
                    "<a href='#' id='" + allKeys[i] + "' onClick='showOnMap(this.id)' class='locLink'>" +
                    allKeys[i] +
                    "</a>" +
                    "<button type='button' class='deleteButton' id='" + allKeys[i] +
                    "' onclick='deleleDataLocation(this.id); deleleMapLocation(this.id);'>UnLoc!</button>";               
    }
    return str;
};


//Remove menu if clicked on the locations layout
$("#savedLocationsPage").click(function(){
    document.getElementById("menu").style.display = "none";
})