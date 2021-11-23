const CattleiaERC721 = artifacts.require("CattleiaERC721");

contract("CattleiaERC721", (accounts) => {
  before(async () => {
    this.CattleiaERC721 = await CattleiaERC721.deployed();
  });

  it("should migrate successfully", async () => {
    const address = this.CattleiaERC721.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("should be able to mint", async () => {
    await this.CattleiaERC721.mint(accounts[0]);
    const balance = (
      await this.CattleiaERC721.balanceOf(accounts[0])
    ).toString();
    assert.equal(balance, "1");
  });

  it("should be able to change the base uri", async () => {
    const newUri = "http://some-uri.com/";
    await this.CattleiaERC721.changeBaseURI(newUri);
    const uri = await this.CattleiaERC721.baseURI();
    assert.equal(uri, newUri);
  });

  it("should be able to transfer", async () => {
    await this.CattleiaERC721.transferFrom(accounts[0], accounts[1], 0);
    const balance1 = (
      await this.CattleiaERC721.balanceOf(accounts[0])
    ).toString();
    const balance2 = (
      await this.CattleiaERC721.balanceOf(accounts[1])
    ).toString();
    assert.equal(balance1, "0");
    assert.equal(balance2, "1");
  });
});
