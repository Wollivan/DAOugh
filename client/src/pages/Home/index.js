import { ethers } from "ethers";
import React from "react";
import HomeContent from "../../components/HomeContent/HomeContent";
import LinkedWalletDetails from "../../components/LinkedWalletDetails/LinkedWalletDetails";
import LinkWallet from "../../components/LinkWallet/LinkWallet";
import MakeDough from "../../components/MakeDough/MakeDough";
import ProposeTransaction from "../../components/ProposeTransaction/ProposeTransaction";
import TransactionListExecuted from "../../components/TransactionListExecuted/TransactionListExecuted";
import TransactionListUnexecuted from "../../components/TransactionListUnexecuted/TransactionListUnexecuted";
import MultiSigJSON from "../../utils/MultiSig.json";
const MultiSigAddress = "0xb0bf7Ba98d1ceA8a4Ff8556Ab8381B2E92d4C823";

// TODO import contsactJSON from "utils where i put the abi"

export default function Home({ address, setAddress }) {
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

  async function submitTransaction(recipient, value, data) {
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      MultiSigAddress,
      MultiSigJSON,
      signer
    );
    await contractInstance.submitTransaction();
    // set the list to update so it shows the new submitted transaction
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
          <HomeContent />
        </section>
        <section className="section">
          <LinkedWalletDetails walletAddress={address} />
        </section>
        <section className="section">
          <MakeDough />
        </section>
        <section className="section">
          <ProposeTransaction submitTransaction={submitTransaction} />
        </section>

        <section className="section">
          <h3>Transactions awaiting approval</h3>
          <TransactionListUnexecuted />
        </section>
        <section className="section">
          <h3>Previous Transactions</h3>
          <TransactionListExecuted />
        </section>
      </div>
    );
  } else {
    return (
      <div className="content">
        <section className="section">
          <HomeContent />
        </section>
        <section className="section">
          <LinkWallet
            ethereum={ethereum}
            handleLinkWallet={handleLinkWallet}
            walletAddress
          />
        </section>
      </div>
    );
  }
}
