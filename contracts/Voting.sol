// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingSystem {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Election {
        string title;
        uint256 status; // 0 = pending, 1 = active, 2 = ended
        Candidate[] candidates;
        mapping(address => bool) voters;
        uint256 totalVotes;
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;
    address public admin;
    mapping(address => bool) public globalVoters;
    uint256 public totalUsers;
    uint256 public totalVotesCast;

    event ElectionCreated(uint256 electionId, string title, uint256 candidateCount);
    event VoteCasted(uint256 electionId, address indexed voter, uint256 candidateIndex);
    event ElectionEnded(uint256 electionId);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionExists(uint256 electionId) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist");
        _;
    }

    function createElection(string memory title, string[] memory candidateNames) external onlyAdmin {
        require(candidateNames.length >= 2, "At least 2 candidates required");
        electionCount++;
        Election storage newElection = elections[electionCount];
        newElection.title = title;
        newElection.status = 1; // active by default

        for (uint256 i = 0; i < candidateNames.length; i++) {
            require(bytes(candidateNames[i]).length > 0, "Candidate name cannot be empty");
            newElection.candidates.push(Candidate(candidateNames[i], 0));
        }

        emit ElectionCreated(electionCount, title, candidateNames.length);
    }

    function vote(uint256 electionId, uint256 candidateIndex) external electionExists(electionId) {
        Election storage election = elections[electionId];
        require(election.status == 1, "Election is not active");
        require(!election.voters[msg.sender], "You have already voted in this election");
        require(candidateIndex < election.candidates.length, "Invalid candidate index");

        election.voters[msg.sender] = true;
        election.candidates[candidateIndex].voteCount++;
        election.totalVotes++;
        totalVotesCast++;

        if (!globalVoters[msg.sender]) {
            globalVoters[msg.sender] = true;
            totalUsers++;
        }

        emit VoteCasted(electionId, msg.sender, candidateIndex);
    }

    function endElection(uint256 electionId) external onlyAdmin electionExists(electionId) {
        Election storage election = elections[electionId];
        require(election.status == 1, "Election is already ended");
        election.status = 2;
        emit ElectionEnded(electionId);
    }

    // View functions
    function getElectionData(uint256 electionId)
        external
        view
        electionExists(electionId)
        returns (
            string memory title,
            uint256 status,
            string[] memory candidateNames,
            uint256[] memory voteCounts
        )
    {
        Election storage election = elections[electionId];
        title = election.title;
        status = election.status;
        uint256 len = election.candidates.length;
        candidateNames = new string[](len);
        voteCounts = new uint256[](len);

        for (uint256 i = 0; i < len; i++) {
            candidateNames[i] = election.candidates[i].name;
            voteCounts[i] = election.candidates[i].voteCount;
        }
    }

    function getTotalElections() external view returns (uint256) {
        return electionCount;
    }

    function getActiveElectionsCount() external view returns (uint256) {
        uint256 active = 0;
        for (uint256 i = 1; i <= electionCount; i++) {
            if (elections[i].status == 1) active++;
        }
        return active;
    }

    function getTotalUsers() external view returns (uint256) {
        return totalUsers;
    }

    function getTotalVotesCast() external view returns (uint256) {
        return totalVotesCast;
    }

    function hasVotedInElection(uint256 electionId, address voter) external view electionExists(electionId) returns (bool) {
        return elections[electionId].voters[voter];
    }
}