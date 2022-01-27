// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import './Reward.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public reward;

    address [] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Reward _reward, Tether _tether) {
        reward = _reward;
        tether = _tether;
        owner = msg.sender;
    }

    function depositTokens(uint _amount) public {

        // require staking amount to be greater than zero
        require(_amount > 0, 'amount cannot be 0');

        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update Staking Balance
            isStaking[msg.sender] = true;
            hasStaked[msg.sender] = true;
    }

    function unStakeToken() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance muts be greater than zero");
        tether.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // update staking status
        isStaking[msg.sender] = false;
    }

    function issueToken() public {
        require(msg.sender == owner, "Caller must be the owner");
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;

            if(balance > 0) reward.transfer(recipient, balance);
        }

    }

}