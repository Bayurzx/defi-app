// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import './Reward.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Reward public reward;
    Tether public tether;

    constructor(Reward _reward, Tether _tether){
        reward = _reward;
        tether = _tether;
    }
}