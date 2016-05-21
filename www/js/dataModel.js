/* Model for Data */


var data = {
    addLoc: function(object){
        // if(localStorage.getItem(object.name) != null){
        //     alert("location with such name exists already! Please choose another name for the location.");
        //     return;
        // }
        var value = JSON.stringify(object);
        localStorage.setItem(object.name,value);
        console.log("added to storage");
        if(localStorage.getItem(object.name) == value){
            //alert("Saved successfully");
        }
        else{
            alert("ERROR: Did not save");
            //return false;
        }
    },
    unLoc: function(key){
        //maybe the inputs are gonna change
        localStorage.removeItem(key);
    },
    getName: function(key){
        var obj = JSON.parse(localStorage.getItem(key));
        return obj.name;
    },
    getNote: function(key){
        var obj = JSON.parse(localStorage.getItem(key));
        return obj.note;
    },
    getPos: function(key){
        var obj = JSON.parse(localStorage.getItem(key));
        var pos = {
            lat: parseFloat(obj.lat),
            lng: parseFloat(obj.lng)
        };
        return pos;
    },
    contains: function(key){
        if(localStorage.getItem(key) != null){
            return true;
        }
        else
            return false;
    },

    // Delete all data from storage (empty storage)
    clearStorage: function(){
        window.localStorage.clear();
    },

    //check to see if storage is empty. return True if stroage is empty , false otherwise
    isStorageEmpty: function(){
        if(localStorage.length == 0)
            return true;
        else
            return false;
    },

    //Check if input name exists in storage
    objectExists: function(name){
        if(localStorage.getItem(name) != null)
            return true;
        else
            return false;
    },

    //Get all the keys in storage
    getAllDataKeysArray: function(){
        var allKeys = [];

        for(var i = 0; i < localStorage.length; i++){
            allKeys.push(localStorage.key(i));
        }

        return allKeys;
    },
};
