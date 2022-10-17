const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${process.env.INFURA_ID}`
);

const account_1 = "0x7745A54152022498952a8703C885694aC69C12c9"; // Your account address 1
const account_2 = "0x0C23712C99D97F600190b7b415478b0cEADA70ba"; // Your account address 2

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const main = async () => {
  const senderBalanceBefore = await provider.getBalance(account_1);
  const receiverBalanceBefore = await provider.getBalance(account_2);

  console.log(
    `Sender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`
  );
  console.log(
    `receiver balance before: ${ethers.utils.formatEther(
      receiverBalanceBefore
    )}`
  );

  const transaction = await wallet.sendTransaction({
    to: account_2,
    value: ethers.utils.parseEther("0.025"),
  });

  console.log("---> Mining ...");
  await transaction.wait();
  console.log(transaction);

  const senderBalanceAfter = await provider.getBalance(account_1);
  const receiverBalanceAfter = await provider.getBalance(account_2);

  console.log(
    `\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`
  );
  console.log(
    `receiver balance after: ${ethers.utils.formatEther(
      receiverBalanceAfter
    )}\n`
  );
};

main();
