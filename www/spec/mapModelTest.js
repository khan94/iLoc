describe('mapModel',function() {
   
//    describe('addLoc',function() {
//        //window.initialize();
//        it('should push a new marker into keys', function(){
//            var obj1 = {
//                lat: 49.2827,
//                lng: 123.1207,
//                name: 'Van',
//                note: 'city'
//            }
//
//            var pos = {
//                lat: obj1.lat,
//                lng:obj1.lng
//            }
//            
//            runs(function(){
//
//                var pos = {
//                    lat: obj1.lat,
//                    lng:obj1.lng
//                }              
//                mapModel.addLoc(pos,obj1.name,obj1.note);
//                
//            });
//        });
//    });
//
    describe('addLoc',function() {
        //TODO:
        beforeEach(function() {
           window.initialize(); 
        });
            var obj1 = {
                lat: 49.2827,
                lng: 123.1207,
                name: 'Van',
                note: 'city'
            }
        //not sure how to test this one
        it('should display a route on map, given dest', function() {
            
            runs(function() {
                var dest = {
                    lat: 12.12,
                    lng: 12.12
                };

                deleteAllMapLocations();
                expect(keys.length).toBe(0);
                mapModel.addLoc(pos,obj1.name,obj1.note);
                expect(keys.length).toBe(1);
                expect(keys[0].name).toBe('Van');
            });
        });
    });
});
