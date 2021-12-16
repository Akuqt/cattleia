const CattleiaERC20 = artifacts.require("CattleiaERC20");

const name = "CattleiaToken";
const symbol = "CTT";
const supply = 100000000;
module.exports = function (deployer) {
  deployer.deploy(CattleiaERC20, name, symbol, supply);
};
