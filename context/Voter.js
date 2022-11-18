import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";

const https = require('https');
const projectId = 'd1626e7caee8443298c02416dfb7f9b4';
const data = JSON.stringify({
  "jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1
})

//INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "./constants";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// const client = ipfsHttpClient("https://goerli.infura.io/v3/d1626e7caee8443298c02416dfb7f9b4");



//
// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)
//
//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })
//
// req.on('error', error => {
//   console.error(error)
// })
//
// req.write(data)
// req.end()


const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  // =========================================================
  //---ERROR Message
  const [error, setError] = useState("");
  const higestVote = [];

  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]);
  ///CONNECTING METAMASK
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
      getAllVoterData();
      getNewCandidate();
    } else {
      setError("Please Install MetaMask & Connect, Reload");
    }
  };

  // ===========================================================
  //CONNECT wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
    getAllVoterData();
    getNewCandidate();
  };
  // ================================================
  //
  // //UPLOAD TO IPFS Voter
  // const uploadToIPFS = async (file) => {
  //   try {
  //     const added = await client.add({ content: file });
  //
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  //
  //     setImage(url);
  //     return url;
  //   } catch (error) {
  //     console.log("Error uploading file to IPFS");
  //   }
  // };

  // //UPLOAD TO IPFS Candidate
  // const uploadToIPFSCandidate = async (file) => {
  //   try {
  //     const added = await client.add({ content: file });
  //
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  //     console.log(url);
  //     return url;
  //   } catch (error) {
  //     console.log("Error uploading file to IPFS");
  //   }
  // };
  // =============================================
  //CREATE VOTER----------------------
  const createVoter = async (formInput) => {
    const { name, address, position } = formInput;

    if (!name || !address || !position)
      return console.log("Input Data is missing");

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const data = JSON.stringify({ name, address, position});
    // const added = await client.add(data);

    console.log(contract);
    console.log("contract");
    const voter = await contract.voterRight(address, name);
    voter.wait();

    router.push("/voterList");
  };
  // =============================================

  const getAllVoterData = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      //VOTR LIST
      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);

      // addres = el
      voterListData.map(async (el) => {
        const singleVoterData = await contract.getVoterData(el);
        pushVoter.push(singleVoterData);
      });

      //VOTER Length
      const voterList = await contract.getVoterLength();
      setVoterLength(voterList.toNumber());
      console.log(voterLength);
    } catch (error) {
      console.log("All data");
    }
  };

  // =============================================

  // =============================================
  ////////GIVE VOTE

  const giveVote = async (id) => {
    try {
      const voterAddress = id.address;
      const voterId = id.id;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voteredList = await contract.vote(voterAddress, voterId);
      console.log(voteredList);
    } catch (error) {
      setError("Sorry!, You have already voted, Reload Browser");
    }
  };
  // =============================================

  const setCandidate = async (candidateForm, router) => {
    const { name, address, age } = candidateForm;

    if (!name || !address || !age) return console.log("Input Data is missing");

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const data = JSON.stringify({
      name,
      address,
      age,
    });

    const candidate = await contract.setCandidate(
      address,
      age,
      name
    );
    candidate.wait();

    router.push("/");
  };

  const getNewCandidate = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    //---------ALL CANDIDATE
    const allCandidate = await contract.getCandidate();

    //--------CANDIDATE DATA
    allCandidate.map(async (el) => {
      const singleCandidateData = await contract.getCandidateData("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

      pushCandidate.push(singleCandidateData);
      candidateIndex.push(singleCandidateData[2].toNumber());
    });

    //---------CANDIDATE LENGTH
    const allCandidateLength = await contract.getCandidateLength();
    setCandidateLength(allCandidateLength.toNumber());
  };

  console.log(error);

  return (
    <VotingContext.Provider
      value={{
        currentAccount,
        connectWallet,
        // uploadToIPFS,
        createVoter,
        setCandidate,
        getNewCandidate,
        giveVote,
        pushCandidate,
        candidateArray,
        // uploadToIPFSCandidate,
        getAllVoterData,
        voterArray,
        // giveVote,
        checkIfWalletIsConnected,
        error,
        candidateLength,
        voterLength,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
