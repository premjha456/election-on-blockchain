var Election  = artifacts.require("./Election.sol");

contract("Election", function(accounts){
   var electionInstance;


   it("Initialize with two candidate" , function(){
      return Election.deployed().then(function(instance){
          return instance.candidatesCount();
      }).then(function(count){
           assert.equal(count,2);
      });
    });


   it("Initialize the  candidate with proper value" , function(){
        return Election.deployed().then(function(instance){
        electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate){
         assert.equal(candidate[0],1,'Contains correct id');
         assert.equal(candidate[1],'Candidate 1','Contains correct name');
         assert.equal(candidate[2],0,'Contains correct vote count');
            return electionInstance.candidates(2);
        }).then(function(candidate){
        assert.equal(candidate[0],2,'Contains correct id');
        assert.equal(candidate[1],'Candidate 2','Contains correct name');
        assert.equal(candidate[2],0,'Contains correct vote count');
        });
    });

});