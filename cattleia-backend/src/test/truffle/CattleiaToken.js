const CattleiaToken = artifacts.require("CattleiaToken");

contract("CattleiaToken", async () => {
  before(async () => {
    this.cattleiaToken = await CattleiaToken.deployed();
  });

  it("migration successfull", async () => {
    const address = this.cattleiaToken.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });
});
