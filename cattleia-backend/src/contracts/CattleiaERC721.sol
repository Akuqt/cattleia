// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract CattleiaERC721 is ERC721PresetMinterPauserAutoId {
    string private _baseUri;

    event BaseURIChanged(string _old, string _new);

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_
    ) ERC721PresetMinterPauserAutoId(name_, symbol_, baseURI_) {
        _baseUri = baseURI_;
    }

    function changeBaseURI(string memory _newURI) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        emit BaseURIChanged(_baseUri, _newURI);
        _baseUri = _newURI;
    }

    function baseURI() public view returns (string memory) {
        return _baseURI();
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseUri;
    }
}
