import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import HomeContent from "../../components/HomeContent/HomeContent";
import LinkedWalletDetails from "../../components/LinkedWalletDetails/LinkedWalletDetails";
import LinkWallet from "../../components/LinkWallet/LinkWallet";
import MakeDough from "../../components/MakeDough/MakeDough";
import ProposeTransaction from "../../components/ProposeTransaction/ProposeTransaction";
import TransactionListExecuted from "../../components/TransactionListExecuted/TransactionListExecuted";
import TransactionListUnexecuted from "../../components/TransactionListUnexecuted/TransactionListUnexecuted";
import MultiSigJSON from "../../utils/MultiSig.json";
import GreeterJSON from "../../utils/Greeter.json";
const MultiSigAddress = "0x13fDd03647e6Df9895D212c2Dee2995CdDF111C6";
const greeterAddress = "0xA413FBac1487Cf37e82295e23f02f53D64bBCa5A";

// TODO import contsactJSON from "utils where i put the abi"

export default function Home({ address, setAddress }) {
  const [theProvider, setTheProvider] = useState(null);
  const [formValid, setFormValid] = useState(true);
  const [form, setForm] = useState({
    recipient: "",
    token: "",
    value: "",
  });

  // get etheruem instance
  const { ethereum } = window;

  useEffect(() => {
    if (ethereum) {
      //try to connect immediatly, if that fails, address won't be set and the button to manually connect will be shown
      handleLinkWallet();
      //this function uses provider as it is above, not the version in state. Future functions use theProvider
      getUserDetails();
    }
  }, []);

  let provider;

  const handleLinkWallet = () => {
    console.log("Attempting to link wallet");
    provider = new ethers.providers.Web3Provider(ethereum);

    // put provider in state so we can use it later without worrying about it not being set anymore
    setTheProvider(provider);
    //provider = new ethers.providers.Web3Provider(ethereum);
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        console.log("Wallet linked successfully");
        getUserDetails();
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  };

  async function getUserDetails() {
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    setAddress(walletAddress);
  }

  async function getGreetingFromGreeter() {
    const signer = await theProvider.getSigner();
    const greeterInstance = new ethers.Contract(
      greeterAddress,
      GreeterJSON.abi,
      signer
    );
    const currentGreeting = await greeterInstance.greet();
    console.log(currentGreeting);
  }

  async function submitTransaction(recipient, value, erc20) {
    let ABI = ["function transfer(address to, uint amount)"];
    let iface = new ethers.utils.Interface(ABI);
    let callData = iface.encodeFunctionData("transfer", [recipient, value]);
    console.log(callData);
    console.log({ recipient, value, erc20 });
    const signer = await theProvider.getSigner();
    const contractInstance = new ethers.Contract(
      MultiSigAddress,
      MultiSigJSON.abi,
      signer
    );
    await contractInstance.submitTransaction(erc20, parseInt(0), callData);
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
          <ProposeTransaction
            submitTransaction={submitTransaction}
            form={form}
            setForm={setForm}
            formValid={formValid}
            setFormValid={setFormValid}
          />
        </section>

        <section className="section">
          <h3>Transactions awaiting approval</h3>
          <TransactionListUnexecuted />
        </section>
        <section className="section">
          <h3>Previous Transactions</h3>
          <TransactionListExecuted />
        </section>
        <button onClick={getGreetingFromGreeter}>Get greeting</button>
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
