// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CattleiaERC20 is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 supply_
    ) ERC20(name_, symbol_) {
        _mint(address(this), supply_);
        _transfer(address(this), msg.sender, uint256((supply_ * 10) / 100));
    }
}
