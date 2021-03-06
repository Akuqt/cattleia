const CattleiaERC721 = artifacts.require("CattleiaERC721");

const name = "Cattleia";
const symbol = "CTN";
const baseURI = "https://api.aku-mi.xyz/api/v1/nft/metadata/";
const supply = 4;

module.exports = function (deployer) {
  deployer.deploy(CattleiaERC721, name, symbol, baseURI, supply);
};
