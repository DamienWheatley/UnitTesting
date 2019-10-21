const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

Given('the league has no players', function () {
  // Nothing to do because a new league always has no players
});

When('I print the league', function () {
  this.response = this.game.sendCommand('print');
});

Then('I should see that there are no players', function () {
  expect(this.response).to.equal('No players yet');
});

