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
    salt: "?",
    yeast: "?",
    water: "?",
    flour: "?",
    dough: "?",
  });
  const [test, settest] = useState({});

  // get etheruem instance
  const { ethereum } = window;

  useEffect(() => {
    if (ethereum) {
      //try to connect immediatly, if that fails, address won't be set and the button to manually connect will be shown
      handleLinkWallet();

      //this function uses provider as it is above, not the version in state. Future functions use theProvider
      //getUserDetails();

      // this gets the contract address for the erc20 tokens from the mutlisig contract
      //getIngredients();

      // this function gets the balances of the user for the 5 tokens
      getBalances();
      console.log(test);

      //callback function to prevent error
      return () => {
        //getIngredients({}); // This worked for me
      };
    }
  }, []);

  let provider;
  // try to connect immediatly, if that fails, address won't be set and the button to manually connect will be shown
  const handleLinkWallet = () => {
    console.log("Attempting to link wallet");
    provider = new ethers.providers.Web3Provider(ethereum);

    // put provider in state so we can use it later without worrying about it not being set anymore
    setTheProvider(provider);
    //provider = new ethers.providers.Web3Provider(ethereum);
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        console.log("Wallet linked successfully, getting user details");
        getUserDetails();
      })
      .then(() => {
        console.log(
          "Wallet deailts retrieved successfully, getting ingredient contracts"
        );
        getIngredients();
      })
      .then(() => {
        console.log(
          "Ingredient contracts retrieved successfully, getting user balances"
        );
        getBalances();
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

  //this function uses provider as it is above, not the version in state. Future functions use theProvider
  async function getUserDetails() {
    console.log("Getting user wallet address");
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    setAddress(walletAddress);
  }

  // this gets the contract address for the erc20 tokens from the mutlisig contract
  async function getIngredients() {
    console.log("Retrieving ingredient contracts");
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
    let txIndex = 0;
    let txArray = [];
    while (true) {
      let tx = await multiSigInstance.transactions(txIndex);
      console.log(tx);
      if (tx.destination != "0x0000000000000000000000000000000000000000") {
        txArray.push(tx);
        txIndex++;
        console.log(txArray);
        break;
      } else {
        console.log("stopping");
        break;
      }
    }
    console.log(await multiSigInstance.transactions(10));
    settest(await multiSigInstance.transactions(0));
    // console.log(await multiSigInstance.transactions.length);
  }

  // this function gets the balances of the user for the 5 tokens
  async function getBalances() {
    if (ingredients.salt) {
      console.log("Fetching user balances");

      const saltContract = new Contract(
        ingredients.salt,
        ERC20JSON,
        theProvider
      );
      const saltBalance = await saltContract.balanceOf(address);

      const yeastContract = new Contract(
        ingredients.yeast,
        ERC20JSON,
        theProvider
      );
      const yeastBalance = await yeastContract.balanceOf(address);

      const waterContract = new Contract(
        ingredients.water,
        ERC20JSON,
        theProvider
      );
      const waterBalance = await waterContract.balanceOf(address);

      const flourContract = new Contract(
        ingredients.flour,
        ERC20JSON,
        theProvider
      );
      const flourBalance = await flourContract.balanceOf(address);

      const doughContract = new Contract(
        ingredients.dough,
        ERC20JSON,
        theProvider
      );
      const doughBalance = await doughContract.balanceOf(address);

      // const saltBalance = (
      //   await saltContract.balanceOf(
      //     (
      //       await theProvider.getSigners()
      //     )[0].ingredients.salt
      //   )
      // ).toString();

      setBalances({
        salt: ethers.utils.formatEther(saltBalance),
        yeast: ethers.utils.formatEther(yeastBalance),
        water: ethers.utils.formatEther(waterBalance),
        flour: ethers.utils.formatEther(flourBalance),
        dough: ethers.utils.formatEther(doughBalance),
      });
    }
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
          // TODO vote on transaction
          // TODO transaction lists (both executed and unexectued)
        }
        <section className="section">
          <HomeContent />
        </section>
        <section className="section">
          <LinkedWalletDetails
            walletAddress={address}
            balances={balances}
            getBalances={getBalances}
          />
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
        <button
          onClick={() => {
            console.log(test.destination);
          }}
        >
          test
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
