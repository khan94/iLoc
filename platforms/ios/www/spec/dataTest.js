describe('data',function() {
    // here we are going to create a mock object
    // and pass it to addLoc, but since addLoc actually saves the object to localStorage
    // we will delete it from data after the test
    
    var obj1 ={
        lat: 49.2827,
        lng: 123.1207,
        name: 'Van',
        note: 'city'
    }
    
    var obj2 ={
        lat: 49.2827,
        lng: 123.1207,
        name: "",
        note: 'city'
    }
    
    describe('addLoc',function() {
        
        it('should add a new location to the database', function(){
            runs(function(){
                data.addLoc(obj1);
                expect(data.contains(obj1.name)).toEqual(true);
            }); 
        });
        //this one above is wrong, because we actually added location with such name, but not the second time
    });
    
    describe('getters', function(){
        it('should get the name, note, and position of the saved location', function(){

            var pos = {
                lat: obj1.lat,
                lng:obj1.lng
            };
            
            expect(data.getName('Van')).toEqual('Van');
            expect(data.getNote('Van')).toEqual('city');
            expect(data.getPos('Van')).toEqual(pos);
        })
    });
    
    describe('unLoc', function(){
        it('should delete a location from database based on given name', function() {
            runs(function(){
                data.unLoc(obj1.name);
                expect(data.contains(obj1.name)).toEqual(false);
            });
        });
    });
});