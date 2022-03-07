const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSig", function () {
  it("Should return the new greeting once it's changed", async function () {
    const MultiSig = await ethers.getContractFactory("MultiSig");
    const multisig = await MultiSig.deploy("Hello, world!");
    await multisig.deployed();

    expect(await multisig.greet()).to.equal("Hello, world!");

    const setGreetingTx = await multisig.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await multisig.greet()).to.equal("Hola, mundo!");
  });
});
