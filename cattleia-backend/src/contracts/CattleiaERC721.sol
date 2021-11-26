// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CattleiaERC721 is ERC721PresetMinterPauserAutoId {
    using Counters for Counters.Counter;

    string private _baseUri;

    Counters.Counter private _track;

    struct Track {
        uint256[] tokens;
    }

    mapping(address => Track) private _totals;

    event BaseURIChanged(string _old, string _new);

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_,
        uint256 supply_
    ) ERC721PresetMinterPauserAutoId(name_, symbol_, baseURI_) {
        _baseUri = baseURI_;
        for (uint256 i = 0; i < supply_; i++) {
            mint(msg.sender);
        }
    }

    function changeBaseURI(string memory _newURI) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
        emit BaseURIChanged(_baseUri, _newURI);
        _baseUri = _newURI;
    }

    function baseURI() public view returns (string memory) {
        return _baseURI();
    }

    function tokensOf(address _owner) public view returns (uint256[] memory) {
        return _totals[_owner].tokens;
    }

    function transfer(address _to, uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);
        _transfer(msg.sender, _to, _tokenId);
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal override {
        super._transfer(_from, _to, _tokenId);

        uint256 i = 0;
        while (_totals[_from].tokens[i] != _tokenId) {
            i++;
        }

        while (i < _totals[_from].tokens.length - 1) {
            _totals[_from].tokens[i] = _totals[_from].tokens[i + 1];
            i++;
        }
        _totals[_from].tokens.pop();
        _totals[_to].tokens.push(_tokenId);
    }

    function mint(address _to) public override {
        super.mint(_to);
        _totals[_to].tokens.push(_track.current());
        _track.increment();
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }
}
