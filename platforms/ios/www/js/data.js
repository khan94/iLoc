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
            var pos={
                lat:parseFloat(object.lat),
                lng:parseFloat(object.lng)
            }
            addLoc(pos,object.name,object.note);
        }
        else{
            alert("ERROR: Did not save");
            //return false;
        }
    },
    readLoc: function(string){
        //maybe the inputs are gonna change
        var obj = JSON.parse(string);
        return;
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
};
