const CattleiaToken = artifacts.require("CattleiaToken");

module.exports = function (deployer) {
  deployer.deploy(CattleiaToken);
};
