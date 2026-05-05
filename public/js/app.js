// Configuration - UPDATE THIS AFTER DEPLOYMENT
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ABI (copy from artifacts after compilation)
const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateCount",
        type: "uint256",
      },
    ],
    name: "ElectionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "ElectionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateIndex",
        type: "uint256",
      },
    ],
    name: "VoteCasted",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "candidateNames",
        type: "string[]",
      },
    ],
    name: "createElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "electionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "elections",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVotes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "endElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveElectionsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getElectionData",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "candidateNames",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "voteCounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalElections",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalUsers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalVotesCast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "globalVoters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "hasVotedInElection",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalUsers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVotesCast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "candidateIndex",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Fallback - you must replace with actual ABI from compilation
// For production, copy the entire ABI array from the compiled contract

let provider, signer, contract, userAddress;

// Helper to get full ABI (you'll replace this with actual ABI from your compilation)

// DOM Elements
const loginPage = document.getElementById("loginPage");
const app = document.getElementById("app");
const connectBtn = document.getElementById("connectWalletBtn");
const navVote = document.getElementById("navVote");
const navResults = document.getElementById("navResults");
const navAdminDashboard = document.getElementById("navAdminDashboard");
const navCreateElection = document.getElementById("navCreateElection");
const logoutBtn = document.getElementById("logoutBtn");
const voteSection = document.getElementById("voteSection");
const resultsSection = document.getElementById("resultsSection");
const adminDashboardSection = document.getElementById("adminDashboardSection");
const createElectionSection = document.getElementById("createElectionSection");

// Connect Wallet
connectBtn.onclick = async () => {
  console.log("Connect button clicked");
  if (typeof window.ethereum !== "undefined") {
    try {
      console.log("Requesting accounts...");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Accounts granted");

      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      userAddress = await signer.getAddress();
      console.log("User address:", userAddress);

      // Check network
      const network = await provider.getNetwork();
      console.log("Network chainId:", network.chainId.toString());
      if (network.chainId !== 1337n) {
        alert(
          `Wrong network. Please switch to Localhost 8545 (Chain ID 1337). Current: ${network.chainId}`,
        );
        return;
      }

      console.log("Creating contract with address:", CONTRACT_ADDRESS);
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      console.log("Calling admin()...");
      const adminAddress = await contract.admin();
      console.log("Admin address:", adminAddress);

      const isAdmin = userAddress.toLowerCase() === adminAddress.toLowerCase();
      console.log("Is admin?", isAdmin);

      if (isAdmin) {
        navAdminDashboard.style.display = "block";
        navCreateElection.style.display = "block";
      }

      console.log("Hiding login page, showing app");
      loginPage.style.display = "none";
      app.style.display = "block";

      showVoteSection();
      console.log("Setup complete");
    } catch (error) {
      console.error("Detailed error:", error);
      alert("Failed to connect: " + error.message);
    }
  } else {
    alert("Please install MetaMask");
  }
};

// Logout
logoutBtn.onclick = () => {
  loginPage.style.display = "block";
  app.style.display = "none";
};

// Navigation
navVote.onclick = () => showVoteSection();
navResults.onclick = () => showResultsSection();
navAdminDashboard.onclick = () => showAdminDashboard();
navCreateElection.onclick = () => showCreateElectionSection();

function showVoteSection() {
  hideAllSections();
  voteSection.style.display = "block";
  loadActiveElections();
}

function showResultsSection() {
  hideAllSections();
  resultsSection.style.display = "block";
  loadAllResults();
}

async function showAdminDashboard() {
  hideAllSections();
  adminDashboardSection.style.display = "block";
  await loadDashboardStats();
  await loadAdminElectionsList();
}

function showCreateElectionSection() {
  hideAllSections();
  createElectionSection.style.display = "block";
}

function hideAllSections() {
  voteSection.style.display = "none";
  resultsSection.style.display = "none";
  adminDashboardSection.style.display = "none";
  createElectionSection.style.display = "none";
}

// Load Active Elections for Voting
async function loadActiveElections() {
  const container = document.getElementById("activeElectionsList");
  container.innerHTML = '<div class="text-center">Loading elections...</div>';

  try {
    const total = await contract.getTotalElections();
    let activeElections = [];

    for (let i = 1; i <= total; i++) {
      const data = await contract.getElectionData(i);
      if (data[1] === 1n) {
        // status active
        activeElections.push({
          id: i,
          title: data[0],
          candidates: data[2],
          voteCounts: data[3],
        });
      }
    }

    if (activeElections.length === 0) {
      container.innerHTML =
        '<div class="alert alert-info">No active elections at the moment.</div>';
      return;
    }

    container.innerHTML = "";
    for (const election of activeElections) {
      const hasVoted = await contract.hasVotedInElection(
        election.id,
        userAddress,
      );
      const card = document.createElement("div");
      card.className = "col-md-6 mb-4";
      card.innerHTML = `
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4>${election.title}</h4>
          </div>
          <div class="card-body">
            ${
              hasVoted
                ? '<div class="alert alert-success">You have already voted in this election</div>'
                : `
              <h5>Candidates:</h5>
              <div id="candidates-${election.id}">
                ${election.candidates
                  .map(
                    (c, idx) => `
                  <button class="btn btn-outline-primary m-2 vote-btn" data-eid="${election.id}" data-cid="${idx}">
                    ${c}
                  </button>
                `,
                  )
                  .join("")}
              </div>
            `
            }
          </div>
        </div>
      `;
      container.appendChild(card);
    }

    // Attach vote event handlers
    document.querySelectorAll(".vote-btn").forEach((btn) => {
      btn.onclick = async () => {
        const electionId = parseInt(btn.dataset.eid);
        const candidateId = parseInt(btn.dataset.cid);
        if (confirm("Confirm your vote? This action cannot be undone.")) {
          try {
            // For vote, createElection, endElection:
            const tx = await contract.vote(electionId, candidateId, {
              gasLimit: 300000,
              maxFeePerGas: 0,
              maxPriorityFeePerGas: 0,
            });
            await tx.wait();
            alert("Vote cast successfully!");
            loadActiveElections();
          } catch (err) {
            console.error(err);
            alert("Error casting vote: " + err.message);
          }
        }
      };
    });
  } catch (error) {
    console.error(error);
    container.innerHTML =
      '<div class="alert alert-danger">Error loading elections</div>';
  }
}

// Load All Results
async function loadAllResults() {
  const container = document.getElementById("resultsList");
  container.innerHTML = '<div class="text-center">Loading results...</div>';

  try {
    const total = await contract.getTotalElections();
    if (total === 0n) {
      container.innerHTML =
        '<div class="alert alert-info">No elections created yet.</div>';
      return;
    }

    container.innerHTML = "";
    for (let i = 1; i <= total; i++) {
      const data = await contract.getElectionData(i);
      const title = data[0];
      const status =
        data[1] === 1n ? "Active" : data[1] === 2n ? "Ended" : "Pending";
      const candidates = data[2];
      const voteCounts = data[3];

      let maxVotes = 0;
      let winners = [];
      voteCounts.forEach((count, idx) => {
        const num = Number(count);
        if (num > maxVotes) {
          maxVotes = num;
          winners = [candidates[idx]];
        } else if (num === maxVotes && maxVotes > 0) {
          winners.push(candidates[idx]);
        }
      });

      const winnerText = winners.length ? winners.join(", ") : "No votes yet";

      const card = document.createElement("div");
      card.className = "card mb-4";
      card.innerHTML = `
        <div class="card-header bg-secondary text-white">
          <h3>${title} <span class="badge bg-light text-dark">${status}</span></h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            ${candidates
              .map(
                (c, idx) => `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                ${c}
                <span class="badge bg-primary rounded-pill">${Number(
                  voteCounts[idx],
                )} votes</span>
              </li>
            `,
              )
              .join("")}
          </ul>
          <div class="mt-3 alert alert-success">
            <strong>🏆 Winner(s):</strong> ${winnerText} (${maxVotes} votes)
          </div>
        </div>
      `;
      container.appendChild(card);
    }
  } catch (error) {
    console.error(error);
    container.innerHTML =
      '<div class="alert alert-danger">Error loading results</div>';
  }
}

// Admin Dashboard Stats
async function loadDashboardStats() {
  try {
    const totalUsers = await contract.getTotalUsers();
    const totalElections = await contract.getTotalElections();
    const activeElections = await contract.getActiveElectionsCount();
    const totalVotes = await contract.getTotalVotesCast();

    document.getElementById("totalUsers").innerText = totalUsers.toString();
    document.getElementById("totalElections").innerText =
      totalElections.toString();
    document.getElementById("activeElections").innerText =
      activeElections.toString();
    document.getElementById("totalVotesCast").innerText = totalVotes.toString();
  } catch (err) {
    console.error(err);
  }
}

async function loadAdminElectionsList() {
  const container = document.getElementById("adminElectionsList");
  container.innerHTML = '<div class="text-center">Loading elections...</div>';

  try {
    const total = await contract.getTotalElections();
    if (total === 0n) {
      container.innerHTML =
        '<div class="alert alert-info">No elections yet.</div>';
      return;
    }

    container.innerHTML = '<div class="row">';
    for (let i = 1; i <= total; i++) {
      const data = await contract.getElectionData(i);
      const title = data[0];
      const status =
        data[1] === 1n ? "Active" : data[1] === 2n ? "Ended" : "Pending";

      const col = document.createElement("div");
      col.className = "col-md-6 mb-3";
      col.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5>${title}</h5>
            <p>Status: <strong>${status}</strong></p>
            ${
              data[1] === 1n
                ? `<button class="btn btn-danger btn-sm end-election-btn" data-id="${i}">End Election</button>`
                : ""
            }
          </div>
        </div>
      `;
      container.appendChild(col);
    }
    container.innerHTML += "</div>";

    document.querySelectorAll(".end-election-btn").forEach((btn) => {
      btn.onclick = async () => {
        const electionId = parseInt(btn.dataset.id);
        if (
          confirm(
            `End election #${electionId}? No more votes will be accepted.`,
          )
        ) {
          try {
            const tx = await contract.endElection(electionId);
            await tx.wait();
            alert("Election ended!");
            loadAdminElectionsList();
            loadDashboardStats();
          } catch (err) {
            alert("Error: " + err.message);
          }
        }
      };
    });
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<div class="alert alert-danger">Error loading elections</div>';
  }
}

// Create Election Form
document.getElementById("addCandidateBtn").onclick = () => {
  const container = document.getElementById("candidatesInputs");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control mb-2 candidate-input";
  input.placeholder = `Candidate ${container.children.length + 1}`;
  input.required = true;
  container.appendChild(input);
};

document.getElementById("createElectionForm").onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("electionTitle").value;
  const candidateInputs = document.querySelectorAll(".candidate-input");
  const candidates = Array.from(candidateInputs)
    .map((inp) => inp.value)
    .filter((v) => v.trim() !== "");

  if (candidates.length < 2) {
    alert("Please add at least 2 candidates");
    return;
  }

  const msgDiv = document.getElementById("createElectionMessage");
  msgDiv.innerHTML =
    '<div class="alert alert-info">Creating election... Please confirm transaction.</div>';

  try {
    const tx = await contract.createElection(title, candidates);
    await tx.wait();
    msgDiv.innerHTML =
      '<div class="alert alert-success">Election created successfully!</div>';
    document.getElementById("createElectionForm").reset();
    document.getElementById("candidatesInputs").innerHTML = `
      <input type="text" class="form-control mb-2 candidate-input" placeholder="Candidate 1" required>
      <input type="text" class="form-control mb-2 candidate-input" placeholder="Candidate 2" required>
    `;
  } catch (err) {
    console.error(err);
    msgDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
  }
};
