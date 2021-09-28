const Tether = artifacts.require('Tether') // We already defined contracts directory in truffle-config.js

module.exports = async function () {
    await deployer.deploy(Tether)
};