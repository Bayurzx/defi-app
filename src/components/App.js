import React, { useState, useEffect } from 'react';

import bootstrap from 'bootstrap'
import "./app.css";
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import Particle from './Particle.js';
import Tether from '../truffle_abis/Tether.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Reward from '../truffle_abis/Reward.json';


const App = () => {
    const [account, setAccount] = useState("0x0");
    const [tether, setTether] = useState(null);
    const [reward, setReward] = useState(null);
    const [decentralBank, setDecentralBank] = useState(null);
    const [tetherBal, setTetherBal] = useState(0);
    const [rewardBal, setRewardBal] = useState(0);
    const [stakingBal, setStakingBal] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadWeb3()
    }, [account])

    useEffect(() => {
        loadBlockchain();
    }, [])

    function toEther(wei) {
        return Web3.utils.fromWei(wei, 'ether')
    }

    function toWei(ether) {
        return Web3.utils.toWei(ether, 'ether')
    }

    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("Get metamask extension")
        }
    }

    async function loadBlockchain() {
        setLoading(true);

        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        console.log(account);
        setAccount(account);

        const networkId = await web3.eth.net.getId();
        console.log(`Network Id: ${networkId}`);

        // tether
        const tetherData = Tether.networks[networkId];
        if (tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            await setTether(tether);

            let tetherBalance = await tether.methods.balanceOf(account[0]).call()
            setTetherBal(toEther(tetherBalance));
        } else {
            window.alert("Tether contract not deployed to network")
        }

        // Reward
        const rewardData = Reward.networks[networkId];
        if (rewardData) {
            const reward = new web3.eth.Contract(Reward.abi, rewardData.address)
            await setReward(reward);

            let rewardBalance = await reward.methods.balanceOf(account[0]).call()
            setRewardBal(toEther(rewardBalance));
        } else {
            window.alert("Reward contract not deployed to network")
        }

        // Decentral Bank
        const decentralBankData = DecentralBank.networks[networkId];
        if (decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            await setDecentralBank(decentralBank);

            let theStakingBal = await decentralBank.methods.stakingBalance(account[0]).call()
            setStakingBal(toEther(theStakingBal));
        } else {
            window.alert("DecentralBank contract not deployed to network")
        }

        setLoading(false);
    }

    function loader() {
        return (
            <div className="loader"></div>
        )
    }

    function stakeTokens(amount) {
        setLoading(true);

        // run decentral bank transaction through approve function in tether
        console.log(decentralBank._address);
        tether.methods.approve(decentralBank._address, amount)
            .send({ from: account[0] })
            .on('transactionHash', hash => {
                // decentralBank transaction goes here
                decentralBank.methods.depositTokens(amount)
                    .send({ from: account[0] })
                    .on('transactionHash', hash => {

                        setLoading(false);
                    }).on('transactionHash', () => window.location.reload())

            });

    }


    function unStakeTokens(amount) {
        setLoading(true);

        // run decentral bank transaction through approve function in tether
        decentralBank.methods.unStakeToken()
            .send({ from: account[0] })
            .on('transactionHash', hash => {

                setLoading(false);
            }).on('transactionHash', () => window.location.reload());


    }

    return (
        <div className="App relativeParticle">
            {console.log(`Staking Bal: ${stakingBal}`)}
            <div className="absoluteParticle">
                {/* This utilize about 20% of CPU */}
                <Particle /> 
            </div>
            <Navbar account={account} />
            <div className="container mt-5">
                <div className="row">
                    <main className="col-lg-12 ml-auto mr-auto" role="main" styles={{ maxWIdth: '600px', minHeight: '100vm' }}>
                        <div className="_main">
                            {!loading ? (
                                <Main
                                    tetherBalance={tetherBal}
                                    rewardBalance={rewardBal}
                                    stakingBalance={stakingBal}
                                    stakeTokens={stakeTokens}
                                    unStakeTokens={unStakeTokens}
                                    toWei={toWei}
                                    toEther={toEther}
                                />
                            ) : loader()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;