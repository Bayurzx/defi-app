const { assert } = require('chai');

const Reward = artifacts.require('Reward');
const Tether = artifacts.require('Tether'); // We already defined contracts directory in truffle-config.js
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should();


contract('Tethero', accounts => {
    let tether, reward, decentralBank;
    before(async () => {
        tether = await Tether.new()
        reward = await Reward.new()
        decentralBank = await DecentralBank.new(reward.address, tether.address) // This is two are necessary for deployment like in 2_deploy_contract

        // Transfer all reward token to the decentral bank
        await reward.transfer(decentralBank.address, web3.utils.toWei('1000000')) // 1000000000000000000000000
        
        // Distribute 100 token to investor
        await tether.transfer(accounts[1], web3.utils.toWei('100'), {from: accounts[0]})

    })
    // Code goes here
    describe('Mock Tether Deployment', async () => {
        it('matches name sucessfully', async () => {
            const name = await tether.name();
            assert.equal(name, 'Mock Tether')
        })
    })
    
    describe('Reward Token Deployment', async () => {
        it('matches name sucessfully', async () => {
            const name = await reward.name();
            assert.equal(name, 'Reward Token')
        })
    })
    
    describe('DecetralBank Token Deployment', async () => {
        it('matches name sucessfully', async () => {
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () => {
            const balance = await reward.balanceOf(decentralBank.address);
            assert.equal(balance, web3.utils.toWei("1000000"))
        })


    })
    
    describe('Yield Farming', async () => {
        it('reward tokens for staking', async () => {
            // check investor balance
            const check = await tether.balanceOf(accounts[1]);
            assert.equal(check.toString(), web3.utils.toWei("100"), "customer mock wallet balance")

            // // check staking for customer
            // await tether.approve(decentralBank.address, web3.utils.toWei("100"), {from: accounts[1]})
            // await decentralBank.depositTokens(web3.utils.toWei("100"), {from: accounts[1]})
        })


    })
    
});

