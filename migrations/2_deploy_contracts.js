const Reward = artifacts.require('Reward'); // We already defined contracts directory in truffle-config.js
const Tether = artifacts.require('Tether'); // We already defined contracts directory in truffle-config.js
const DecentralBank = artifacts.require('DecentralBank'); // We already defined contracts directory in truffle-config.js

module.exports = async function (deployer, network, accounts) {
    // Deploy contract
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()
    
    await deployer.deploy(Reward)
    const reward = await Reward.deployed()
    
    await deployer.deploy(DecentralBank, reward.address, tether.address) // the two extra is from constructor in DecentralBank
    const decentralBank = await DecentralBank.deployed()


    // Transfer all reward token to the decentral bank
    await reward.transfer(decentralBank.address, '1000000000000000000000000')
    
    // Distribute 100 token to investor
    await tether.transfer(accounts[1], '100000000000000000000')

};