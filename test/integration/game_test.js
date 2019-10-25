const chai = require('chai');
const expect = chai.expect;

const app = require('../../src/app');
const gameState = require('../../src/league');
const leagueRenderer = require('../../src/league_renderer');

describe('league app', function () {
  let league;
  describe('#print', function(){
    beforeEach(function() {
      league = gameState.createLeague();
    });
    it('prints empty game state', function () {
      const game = app.startGame(league);

      expect(game.sendCommand('print')).to.equal('No players yet');
    });
    it('prints a one player', function() {
      league.addPlayer('Bob');

      const rendered = leagueRenderer.render(league);

      expect(rendered).to.equal(
`-------------------
|       Bob       |
-------------------`
      );
    });
    it('prints multiple players', function() {
      league.addPlayer('Bob');
      league.addPlayer('Perry');
      league.addPlayer('Elliot');

      const rendered = leagueRenderer.render(league);

      expect(rendered).to.equal(
`          -------------------
          |       Bob       |
          -------------------
------------------- -------------------
|      Perry      | |     Elliot      |
------------------- -------------------`
      );
    });
    it('truncates long names', function () {
      league.addPlayer('Bob_the_third_in_line_to_the_throne');

      const rendered = leagueRenderer.render(league);

      expect(rendered).to.equal(
`-------------------
|Bob_the_third_...|
-------------------`
      );
    });
  });
});