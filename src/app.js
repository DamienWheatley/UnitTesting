const fileService = require('./file_service');
const leagueRenderer = require('./league_renderer');
const InvalidArgumentException = require('./invalid_argument_exception');

exports.startGame = function (initialLeague) {
  let league = initialLeague;

  function recordWin (command) {
    const regex = /record win (\w*) (\w*)/;
    const found = command.match(regex);
    const winner = found[1];
    const loser = found[2];

    league.recordWin(winner, loser);
  }

  function save (command) {
    const regex = /save (.*)$/;
    const filename = command.match(regex)[1];
    fileService.save(filename, league);
  }

  function load (command) {
    const regex = /load (.*)$/;
    const filename = command.match(regex)[1];
    league = fileService.load(filename);
  }

  return {
    sendCommand: function (command) {
      try {
        if (command.startsWith('add player')) {
          league.addPlayer(command.slice(11));
        } else if (command.startsWith('record win')) {
          recordWin(command);
        } else if (command === 'print') {
          return leagueRenderer.render(league);
        } else if (command === 'winner') {
          return league.getWinner();
        } else if (command.startsWith('save')) {
          save(command);
        } else if (command.startsWith('load')) {
          load(command);
        } else {
          return `Unknown command "${command}"`;
        }
      } catch (e) {
        if (e instanceof InvalidArgumentException) {
          return e.message;
        }
        throw e;
      }
    }
  };
};
