// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

// import "@openzeppelin/contracts/token/ERC20/";

contract CattleiaToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) allowanceMap;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(string memory _name, string memory _symbol) public {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        totalSupply = 1000000 * (uint256(10)**decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function allowance(address _from, address _to)
        public
        view
        returns (uint256)
    {
        return allowanceMap[_from][_to];
    }

    function aprove(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowanceMap[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowanceMap[_from][msg.sender] >= _value);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowanceMap[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
