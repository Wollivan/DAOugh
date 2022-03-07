import { ethers } from "ethers";
import React, { useState } from "react";
import HomeContent from "../../components/HomeContent/HomeContent";
import LinkedWalletDetails from "../../components/LinkedWalletDetails/LinkedWalletDetails";
import LinkWallet from "../../components/LinkWallet/LinkWallet";
import MakeDough from "../../components/MakeDough/MakeDough";
import ProposeTransaction from "../../components/ProposeTransaction/ProposeTransaction";

// TODO import contsactJSON from "utils where i put the abi"

export default function Home() {
  const [address, setAddress] = useState("");
  // get etheruem instance
  const { ethereum } = window;

  //const contractInstance = new ethersContract(contractAddress, contractJSON.abi, signer);
  // TODO get hardhat confix and env from tmken project
  // TODO ask al about getting the hardhat artifact for the utils folder, to then import that json

  let provider;

  const handleLinkWallet = () => {
    // ethereum
    //   .request({ method: "eth_requestAccounts" })
    //   .then(handleAccountsChanged)
    //   .catch((error) => {
    //     if (error.code === 4001) {
    //       // EIP-1193 userRejectedRequest error
    //       console.log("Please connect to MetaMask.");
    //     } else {
    //       console.error(error);
    //     }
    //   });

    console.log("link wallet");
    provider = new ethers.providers.Web3Provider(ethereum);
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        console.log("did work");
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
    getUserDetails();
  };

  async function getUserDetails() {
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    setAddress(walletAddress);
  }

  if (address) {
    return (
      <div className="content">
        {
          // TODO current contract balance of all the tokens
          // TODO link metamask
          // TODO suggest transaction
          // TODO vote on transaction
          // TODO transaction lists (both executed and unexectued)
          // TODO link to whitepaper and discord
        }
        <section className="section">
          <LinkedWalletDetails walletAddress={address} />
        </section>
        <section className="section">
          <HomeContent />
        </section>
        <section className="section">
          <MakeDough />
        </section>
        <section className="section">
          <ProposeTransaction />
        </section>
      </div>
    );
  } else {
    return (
      <section className="section">
        <LinkWallet
          ethereum={ethereum}
          handleLinkWallet={handleLinkWallet}
          walletAddress
        />
      </section>
    );
  }
}
