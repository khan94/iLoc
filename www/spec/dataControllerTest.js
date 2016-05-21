describe('dataController', function() {   
    describe('deleteDataLocation', function() {
        //TODO:
        it('should call unLoc', function(){
            var obj ={
                lat: 49.2827,
                lng: 123.1207,
                name: 'Van',
                note: 'city'
            }
                runs(function() {
                    data.addLoc(obj);
                    spyOn(data, 'unLoc');
                    deleteDataLocation(obj.name);
                    expect(data.unLoc).toHaveBeenCalled();
                });
        });
    });
    describe('deleteAllLocations', function() {
        //TODO:
        it('should call clearStorage', function() {
            runs(function() {
                spyOn(data, 'clearStorage');
                deleteAllDataLocations();
                expect(data.clearStorage).toHaveBeenCalled();
            });
        });
    });
    describe('saveLocation', function(){
        it('should call addLoc', function(){
            var obj ={
                lat: 49.2827,
                lng: 123.1207,
                name: 'unique',
                note: 'city'
            }
                runs(function() {
                    spyOn(data, 'addLoc');
                    saveLocation(obj.lat,obj.lng,obj.name,obj.note);
                    expect(data.addLoc).toHaveBeenCalled();
                    //works fine, but some things like style.display are not working well with jasmine
                });
        });
        
    });
//    describe('openSavedLocations', function() {
//       //TODO: 
//        //talks to much to index.html
//        //dont know how to test this one
//        data.clearStorage();
//        expect(openSavedLocations()).toEqual(true);
////    });
//    describe('refreshList', function() {
//        //TODO:
//        //mostly ajax stuff, dont know how to test this one too
//        //should I just create string, and compare it to output of refreshList?
//    });
});