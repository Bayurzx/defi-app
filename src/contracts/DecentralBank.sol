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
    }

    function depositTokens(uint _amount) public {
        // Staking amount should be greater than zero
        require(_amount > 0, "Input must be greater than 0");
        // Transfer tether to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}