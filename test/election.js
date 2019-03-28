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


    it("allows voter to cast votes" , function(){
        return Election.deployed().then(function(instance){
        electionInstance = instance;
        candidateId=1;
            return electionInstance.vote(candidateId,{from: accounts[0]});
        }).then(function(recipt){
            return electionInstance.voters(accounts[0]);
        }).then(function(voted){
        assert(voted,'voter was added as record');
        return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount =candidate[2];
            assert.equal(voteCount,1,"increments the vote counts");
        });
    });

});