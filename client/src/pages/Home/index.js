import { ethers, Contract } from "ethers";
import React, { useState, useEffect } from "react";
import HomeContent from "../../components/HomeContent/HomeContent";
import LinkedWalletDetails from "../../components/LinkedWalletDetails/LinkedWalletDetails";
import LinkWallet from "../../components/LinkWallet/LinkWallet";
import MakeDough from "../../components/MakeDough/MakeDough";
import ProposeTransaction from "../../components/ProposeTransaction/ProposeTransaction";
import TransactionListExecuted from "../../components/TransactionListExecuted/TransactionListExecuted";
import TransactionListUnexecuted from "../../components/TransactionListUnexecuted/TransactionListUnexecuted";
import MultiSigJSON from "../../utils/MultiSig.json";
import ERC20JSON from "../../utils/ERC20.json";
const MultiSigAddress = "0xE4d5f244acC731b8dEae4bc42d02A3B35ee8Be4e"; //"0x45c85aa590b2Bc725E63aF2b746B7D3EF73e0138";

// TODO get the addresses for the dropdown from the contract

export default function Home({ address, setAddress }) {
  const [theProvider, setTheProvider] = useState(null);
  const [formValid, setFormValid] = useState(true);
  const [form, setForm] = useState({
    recipient: "",
    token: "",
    value: "",
  });
  const [ingredients, setIngredients] = useState({
    salt: "",
    yeast: "",
    water: "",
    flour: "",
    dough: "",
  });
  const [balances, setBalances] = useState({
    salt: 0,
    yeast: 0,
    water: 0,
    flour: 0,
    dough: 0,
  });

  // get etheruem instance
  const { ethereum } = window;

  useEffect(() => {
    if (ethereum) {
      //try to connect immediatly, if that fails, address won't be set and the button to manually connect will be shown
      handleLinkWallet();

      //this function uses provider as it is above, not the version in state. Future functions use theProvider
      getUserDetails();

      // this gets the contract address for the erc20 tokens from the mutlisig contract
      getIngredients();

      // this function gets the balances of the user for the 5 tokens
      getBalances();

      //callback function to prevent error
      return () => {
        //getIngredients({}); // This worked for me
      };
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
    console.log("get user dteails");
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    setAddress(walletAddress);
  }

  async function getBalances() {
    if (address && ingredients.salt) {
      console.log("getting salty");
      // const signer = await provider.getSigner();
      console.log("test1");
      const saltContract = new Contract(
        ingredients.salt,
        ERC20JSON,
        theProvider
      );
      const saltBalance = await saltContract.balanceOf(address);

      // const saltBalance = (
      //   await saltContract.balanceOf(
      //     (
      //       await theProvider.getSigners()
      //     )[0].ingredients.salt
      //   )
      // ).toString();

      // const yeastBalance = await contract.balanceOf(walletAddress);
      // const waterBalance = await contract.balanceOf(walletAddress);
      // const flourBalance = await contract.balanceOf(walletAddress);
      // const doughBalance = await contract.balanceOf(walletAddress);
      console.log(toString(saltBalance));
      setBalances({
        salt: saltBalance,
        yeast: 0, // yeastBalance,
        water: 0, // waterBalance,
        flour: 0, // flourBalance,
        dough: 0, // doughBalance,
      });
    }
  }
  async function getIngredients() {
    const signer = await provider.getSigner();
    const multiSigInstance = new ethers.Contract(
      MultiSigAddress,
      MultiSigJSON.abi,
      signer
    );
    let salt = await multiSigInstance.salt();
    let yeast = await multiSigInstance.yeast();
    let water = await multiSigInstance.water();
    let flour = await multiSigInstance.flour();
    let dough = await multiSigInstance.dough();

    setIngredients({
      salt,
      yeast,
      water,
      flour,
      dough,
    });
    // console.log("test");
    // console.log(await multiSigInstance.transactions(0));
    // console.log(await multiSigInstance.transactions.length);
  }

  async function submitTransaction(recipient, value, erc20) {
    let ABI = ["function transfer(address to, uint amount)"];
    let iface = new ethers.utils.Interface(ABI);
    let zeros = "000000000000000000"; //because JS is scared of big numbers, but I ain't afraid of no 18 zeros...
    let fullValue = value + zeros;
    let callData = iface.encodeFunctionData("transfer", [recipient, fullValue]);
    console.log(callData);
    console.log({ recipient, fullValue, erc20 });
    const signer = await theProvider.getSigner();
    const multiSigInstance = new ethers.Contract(
      MultiSigAddress,
      MultiSigJSON.abi,
      signer
    );
    await multiSigInstance.submitTransaction(erc20, parseInt(0), callData); // 0 value because it isn't ETH (we should be so lucky)
    // set the list to update so it shows the new submitted transaction
  }

  async function makeDough() {
    console.log("making dough");
    const signer = await theProvider.getSigner();
    const multiSigInstance = new ethers.Contract(
      MultiSigAddress,
      MultiSigJSON.abi,
      signer
    );
    await multiSigInstance.makeDough();
  }

  async function getGreetingFromMultisig() {
    const signer = await theProvider.getSigner();
    const multiSigInstance = new ethers.Contract(
      MultiSigAddress,
      MultiSigJSON.abi,
      signer
    );
    const currentGreeting = await multiSigInstance.greet();
    console.log(currentGreeting);
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
          <LinkedWalletDetails walletAddress={address} balances={balances} />
        </section>
        <section className="section">
          <MakeDough makeDough={makeDough} />
        </section>
        <section className="section">
          <ProposeTransaction
            submitTransaction={submitTransaction}
            form={form}
            setForm={setForm}
            formValid={formValid}
            setFormValid={setFormValid}
            ingredients={ingredients}
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
        <button onClick={getBalances}>getBalances</button>
        <button onClick={getGreetingFromMultisig}>
          Get greeting from multisig
        </button>
        <button
          onClick={() => {
            console.log(ingredients);
          }}
        >
          Ingredients
        </button>
        <button
          onClick={() => {
            console.log(balances);
          }}
        >
          balances
        </button>
        <button
          onClick={() => {
            console.log(address);
          }}
        >
          walletAddress
        </button>
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
