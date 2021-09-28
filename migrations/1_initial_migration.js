const Migrations = artifacts.require('Migrations') // We already defined contracts directory in truffle-config.js

module.exports = function deployer() {
    deployer.deploy(Migrations)
};