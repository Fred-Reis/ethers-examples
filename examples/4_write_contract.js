const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${process.env.INFURA_ID}`
);

const account_1 = "0x7745A54152022498952a8703C885694aC69C12c9"; // Your account address 1
const account_2 = "0x0C23712C99D97F600190b7b415478b0cEADA70ba"; // Your account address 2

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

const address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const balance = await contract.balanceOf(account_1);

  console.log(`Reading from: ${address}`);
  console.log(`Balance of sender: ${balance}\n`);

  const contractWithWallet = contract.connect(wallet);

  console.log("---> Mining ...");
  const transaction = await contractWithWallet.transfer(account_2, balance);
  await transaction.wait();

  console.log(transaction);

  const balanceOfSender = await contract.balanceOf(account_1);
  const balanceOfReceiver = await contract.balanceOf(account_2);

  console.log(`Balance of sender: ${balanceOfSender}`);
  console.log(`Balance of receiver: ${balanceOfReceiver}`);
};

main();
