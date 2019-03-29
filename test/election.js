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

it("throws an exception if invalid candidate" , function(){
    return Election.deployed().then(function(instance){
    electionInstance = instance;
        return electionInstance.vote(99,{from: accounts[0]});
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0,'error message must contain revert');
        return electionInstance.candidates(1);  
    }).then(function(candidate1){
        var voteCount = candidate1[2];
        assert.equal(voteCount,1,"Candidate 1 did not recieve any vote");
        return electionInstance.candidates(2);
    }).then(function(candidate2){
        var voteCount = candidate2[2];
        assert.equal(voteCount,0,"Candidate 2 did not recieve any vote");
    });
});

it("throws an exception if invalid candidate" , function(){
    return Election.deployed().then(function(instance){
    electionInstance = instance;
        return electionInstance.vote(99,{from: accounts[0]});
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0,'error message must contain revert');
        return electionInstance.candidates(1);  
    }).then(function(candidate1){
        var voteCount = candidate1[2];
        assert.equal(voteCount,1,"Candidate 1 did not recieve any vote");
        return electionInstance.candidates(2);
    }).then(function(candidate2){
        var voteCount = candidate2[2];
        assert.equal(voteCount,0,"Candidate 2 did not recieve any vote");
    });
});


it("throws an exception candidate votes more than once" , function(){
    return Election.deployed().then(function(instance){
    electionInstance = instance;
    candidateId = 2;
     electionInstance.vote(candidateId,{from: accounts[0]});
     return electionInstance.candidates(candidateId);
    }).then(function(candidate){
        var voteCount = candidate[2];
        assert.equal(voteCount,1,"accepts first vote");
        return  electionInstance.vote(candidateId,{from: accounts[0]});
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0,'error message must contain revert');
        return electionInstance.candidates(1);  
    }).then(function(candidate1){
        var voteCount = candidate1[2];
        assert.equal(voteCount,1,"Candidate 1 did not recieve any vote");
        return electionInstance.candidates(2);
    }).then(function(candidate2){
        var voteCount = candidate2[2];
        assert.equal(voteCount,0,"Candidate 2 did not recieve any vote");
    });
});