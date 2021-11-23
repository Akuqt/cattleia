const CattleiaERC20 = artifacts.require("CattleiaERC20");

contract("CattleiaERC20", (accounts) => {
  before(async () => {
    this.CattleiaERC20 = await CattleiaERC20.deployed();
  });

  it("should migrate successfully", async () => {
    const address = this.CattleiaERC20.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("should have 90% supply in contract and 10% in owner", async () => {
    const supply = 100000000;
    const balance1 = (
      await this.CattleiaERC20.balanceOf(this.CattleiaERC20.address)
    ).toString();
    const balance2 = (
      await this.CattleiaERC20.balanceOf(accounts[0])
    ).toString();
    assert.equal(balance1, (supply * 0.9).toString());
    assert.equal(balance2, (supply * 0.1).toString());
  });

  it("should be able to transfer tokens", async () => {
    await this.CattleiaERC20.transfer(accounts[1], 100);
    const balance = await this.CattleiaERC20.balanceOf(accounts[1]);
    assert.equal(balance, "100");
  });
});
