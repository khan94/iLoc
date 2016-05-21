

describe('mapController', function() { 
    
    
    
    describe('initialize()', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(mapModel,'initiate');
                initialize();

                expect(mapModel.initiate).toHaveBeenCalled();
            });
        });
    });
    
    
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================

    describe('addLocationOnMap()', function() {
        it('should call addLoc to add marker on map', function() {
            var obj = {
                lat: 49.2827,
                lng: 123.1207,
                name: 'Van',
                note: 'city'
            }
            data.clearStorage();
            runs(function() {
                spyOn(mapModel,'addLoc');
                addLocationOnMap(obj.lat.toString(), obj.lat.toString(), obj.name, obj.note);
                expect(mapModel.addLoc).toHaveBeenCalled();  
            });
        });

        it('should NOT call addLoc to add marker on map since we are adding same marker', function() {
            var obj = {
                lat: "49.2827",
                lng: "123.1207",
                name: 'Van',
                note: 'city'
            }
            data.addLoc(obj);
            runs(function() {
                
                spyOn(mapModel,'addLoc');
                addLocationOnMap(obj.lat, obj.lng, obj.name, obj.note);
                expect(mapModel.addLoc).not.toHaveBeenCalled();  
            });
        });
        it('should NOT call addLoc to add marker on map since name is null', function() {
            var obj = {
                lat: "49.2827",
                lng: "123.1207",
                name: '',
                note: 'city'
            }
            runs(function() {
                spyOn(mapModel,'addLoc');
                addLocationOnMap(obj.lat, obj.lng, obj.name, obj.note);
                expect(mapModel.addLoc).not.toHaveBeenCalled();  
            });
        });
        
    });
    
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================

    describe('getDirection()', function(){
        it('Should call displayRoute', function(){

           runs(function() {
            spyOn(mapModel, 'displayRoute');
            getDirection('Van');
            expect(mapModel.displayRoute).toHaveBeenCalled();
           });
        });
    });
    
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
//    
//    describe('changeDirectionType',function() {
//        
//        //  mapModel.initiate();
//        it('should change the mode to DRIVING', function(){
//            runs(function(){
//                changeDirectionType("DRIVING");
//                expect(mode).toEqual("DRIVING");
//            });
//        });
//
//        it('should change the mode to WALKING', function(){
//            runs(function() {
//                changeDirectionType("WALKING");
//                expect(mode).toEqual("WALKING");
//            });
//          });
//
//        it('should change the mode to BICYCLING', function(){
//            runs(function(){
//                changeDirectionType("BICYCLYING");
//                expect(mode).toEqual("BICYCLYING"); 
//            });
//        })
//
//        it('should change the mode to TRANSIT', function(){
//            runs(function(){
//                changeDirectionType("TRANSIT");
//                expect(mode).toEqual("TRANSIT");
//            });
//        });
//
//      });
});