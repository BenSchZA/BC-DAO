// Import all required modules from openzeppelin-test-helpers
const {BN, constants, expectEvent, expectRevert} = require('openzeppelin-test-helpers');

// Import preferred chai flavor: both expect and should are supported
const expect = require('chai').expect;
const should = require('chai').should();

const BancorFormula = artifacts.require('BancorFormula');

contract('BancorFormula', accounts => {
  let tx;

  let values = {
    a: {
      supply: 1,
      connectorBalance: 1,
      connectorWeight: 1000,
      depositAmount: 1,
      expectedResult: new BN(0)
    },
    b: {
      supply: 1000000,
      connectorBalance: 10000,
      connectorWeight: 1000,
      depositAmount: 10000,
      expectedResult: new BN(693)
    },
    c: {
      supply: 100000000,
      connectorBalance: 1000000,
      connectorWeight: 1000,
      depositAmount: 10000,
      expectedResult: new BN(995)
    }
  };

  beforeEach(async function() {
    this.bancorFormula = await BancorFormula.new();
    await this.bancorFormula.initialize();
  });

  it('calculate correct purchase result for value set A', async function() {
    const result = await this.bancorFormula.calculatePurchaseReturn(
      values.a.supply,
      values.a.connectorBalance,
      values.a.connectorWeight,
      values.a.depositAmount
    );

    expect(result).to.be.bignumber.equal(values.a.expectedResult);
  });

  it('calculate correct purchase result for value set B', async function() {
    const result = await this.bancorFormula.calculatePurchaseReturn(
      values.b.supply,
      values.b.connectorBalance,
      values.b.connectorWeight,
      values.b.depositAmount
    );

    expect(result).to.be.bignumber.equal(values.b.expectedResult);
  });

  it('calculate correct purchase result for value set C', async function() {
    const result = await this.bancorFormula.calculatePurchaseReturn(
      values.c.supply,
      values.c.connectorBalance,
      values.c.connectorWeight,
      values.c.depositAmount
    );

    expect(result).to.be.bignumber.equal(values.c.expectedResult);
  });
});
