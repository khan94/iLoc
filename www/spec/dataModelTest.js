describe('dataModel',function() {
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
    
// Testing really far away outlier coordinate being saved
    var obj3 ={
        lat: 1000.0000,
        lng: 2000.0000,
        name: 'Outlier Far',
        note: 'city'
            }

// Testing really close outlier coordinate being saved
    var obj4 ={
        lat: 0.0000,
        lng: 0.0000,
        name: "Outlier Close",
        note: 'city'

    }

    describe('addLoc',function() {
        
        it('should add a new location to the database', function() {
            runs(function() {
                //expect(data.contains(obj1.name)).toEqual(false);
                data.addLoc(obj1);
                expect(data.contains(obj1.name)).toEqual(true);
            }); 
        });
        //this one above is wrong, because we actually added location with such name, but not the second time
    });
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================


  describe('addOutlierLoc',function() {

        it('should add a new location to the database that is unconventionally far', function(){
            runs(function(){
                data.addLoc(obj3);
                expect(data.contains(obj3.name)).toEqual(true);
            })
        })
    });
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================

    describe('addOutlierLocClose',function() {

        it('should add a new location to the database that is unconventionally close', function(){
            runs(function(){
                data.addLoc(obj4);
                expect(data.contains(obj4.name)).toEqual(true);
            });
        });
    });
    
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================
    
    //passing!
    describe('getters', function(){
        it('should get the name, note, and position of the saved location', function(){

            var pos = {
                lat: obj1.lat,
                lng:obj1.lng
            };
            
            expect(data.getName('Van')).toEqual('Van');
            expect(data.getNote('Van')).toEqual('city');
            expect(data.getPos('Van')).toEqual(pos);
        });
    });
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================
    
    //passing!
    describe('unLoc', function(){
        it('should delete a location from database based on given name', function() {
            runs(function(){
                data.unLoc(obj1.name);
                expect(data.contains(obj1.name)).toEqual(false);
            });
        });
    });
    
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================
    
    describe('clearStorage()', function() {
       it('should clear data', function() {
           //
          runs(function(){
              data.addLoc(obj1);
              data.clearStorage();
              expect(data.isStorageEmpty()).toEqual(true);
          }); 
       });
    });
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================
    
    
    describe('isStorageEmpty',function(){
        it('should empty the data', function(){
            runs(function() {
                data.clearStorage();
                expect(data.isStorageEmpty()).toEqual(true);
            });
        });
    });
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================
    
    describe('objectExists()', function() {
       it('should check if object exists in data', function() {
           //
          runs(function(){
              data.addLoc(obj1);
              expect(data.objectExists('Van')).toEqual(true);
          }); 
       });
    });
    
    //========================================================
    //========================================================
    //========================================================
    //========================================================
    
    
    describe('getAllDataKeysArray', function() {
        it('should return an array of locations from data', function() {
            runs(function(){
                data.addLoc(obj1);
                data.addLoc(obj2);
                data.addLoc(obj3);
                var checker = [];
                
                checker.push(obj2.name);
                checker.push(obj3.name);
                checker.push(obj1.name);
                
                
                var objArray = data.getAllDataKeysArray();
                expect(objArray).toEqual(checker);
            });
        });
    });
});