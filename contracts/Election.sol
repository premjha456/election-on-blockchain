pragma solidity ^0.5.0;

contract Election{

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping(address => bool) public voters;

    mapping(uint => Candidate) public candidates;
    
    uint public candidatesCount;

    constructor () public {
       addCandidate("Candidate 1");
       addCandidate("Candidate 2");
    }

    // function addCandidate (string _name) private {

    //     candidatesCount ++;
    //     candidates[candidatesCount]=Candidate(candidatesCount,_name,0);

    // }

        function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        
        //  to check that they have not voted
        require(!voters[msg.sender]);
        // to check that the candidate id is valid
        require(_candidateId >0 && _candidateId <= candidatesCount);
        // to set value true for voters address who casted vote
        voters[msg.sender] =true;
        //  to increment the vote count
        candidates[_candidateId].voteCount++;
    }
 
}