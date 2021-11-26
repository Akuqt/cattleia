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
    assert.equal(balance, "5");
  });

  it("should be able to change the base uri", async () => {
    const newUri = "http://some-uri.com/";
    await this.CattleiaERC721.changeBaseURI(newUri);
    const uri = await this.CattleiaERC721.baseURI();
    assert.equal(uri, newUri);
  });

  it("should be able to transfer", async () => {
    await this.CattleiaERC721.transfer(accounts[0], accounts[1], 0);
    const balance1 = (
      await this.CattleiaERC721.balanceOf(accounts[0])
    ).toString();
    const balance2 = (
      await this.CattleiaERC721.balanceOf(accounts[1])
    ).toString();
    assert.equal(balance1, "4");
    assert.equal(balance2, "1");
  });

  it("should return an array of tokens", async () => {
    const balance = (
      await this.CattleiaERC721.balanceOf(accounts[0])
    ).toString();
    const res = (await this.CattleiaERC721.tokensOf(accounts[0]))
      .toString()
      .split(",");
    assert.equal(res.length, parseInt(balance));
  });
});
