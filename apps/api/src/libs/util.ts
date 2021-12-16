import Web3 from "web3";
import { RankModel } from "../models";
import { Rank } from "./interfaces";

export const rankColor = (name: string) => {
  switch (name) {
    case "newbie":
      return "#DF569A";
    case "bronze":
      return "#CD7F32";
    case "silver":
      return "#C0C0C0";
    case "gold":
      return "#FFD700";
    default:
      return "#DF569A";
  }
};

export const getRank = async (points: number) => {
  const _ranks: Rank[] = await RankModel.find();

  _ranks.sort((a, b) => {
    return a.points < b.points ? -1 : b.points < a.points ? 1 : 0;
  });

  const next = _ranks.filter((r) => {
    if (points < r.points) {
      return r;
    }
    if (points >= 1000 && r.points === 1000) {
      return r;
    }
  })[0];

  const current = _ranks
    .filter((r) => {
      if (points >= r.points) {
        return r;
      }
    })
    .slice(-1)[0];

  return { current, next };
};

/* istanbul ignore next */
export const transferToken = async (
  web3: Web3,
  abi: any,
  contractAddress: string,
  to: string,
  value: string | number,
  privateKey: string
) => {
  const contract = new web3.eth.Contract(abi, contractAddress);
  const data = contract.methods.transfer(to, value).encodeABI();
  const txObject = {
    to: contractAddress,
    gasLimit: web3.utils.toHex(1000000), // Raise if need
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data,
  };

  const tx = await web3.eth.accounts.signTransaction(txObject, privateKey);
  const raw = tx.rawTransaction || "";

  const result = await web3.eth.sendSignedTransaction(raw);

  return result;
};
