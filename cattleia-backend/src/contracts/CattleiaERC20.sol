// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract CattleiaERC20 is ERC20PresetMinterPauser {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 supply_
    ) ERC20PresetMinterPauser(name_, symbol_) {
        uint256 total = supply_ * (uint256(10)**18);
        _mint(address(this), total);
        _transfer(address(this), msg.sender, uint256((total * 10) / 100));
    }
}
