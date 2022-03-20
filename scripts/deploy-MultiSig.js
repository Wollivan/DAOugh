// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
let owners = [
  "0xbAA390D7b0e7adAc5dF373c43187e412a2D2D200", // al
  "0x9AdD9608916bA821c642dc57a567096a6AF7e923", // Tim S
  "0x1A4B691738C9c8Db8f2EDf0b9207f6acb24ADF07", // Hunter K
];
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MultiSig = await hre.ethers.getContractFactory("MultiSig");
  const multisig = await MultiSig.deploy(owners);

  await multisig.deployed();

  console.log("MultiSig deployed to:", multisig.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//multisig 0x13fDd03647e6Df9895D212c2Dee2995CdDF111C6
// new multisig 0xB6974FfcCC30Bd6626A4Ae58F7fFf80fc417AC16
// new new 0x4AE86D696fDec7E4F8B80418a04827Fc8aE8ef2c
