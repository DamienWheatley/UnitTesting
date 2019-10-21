exports.create = function (maxSize, players = []) {
  function swap (playerToRemove, playerToAdd) {
    const playerIndex = players.findIndex(player => player === playerToRemove);
    players.splice(playerIndex, 1, playerToAdd);
  }

  return {
    getPlayers: function () { return players; },
    add: function (player) { players.push(player); },
    isFull: function () { return players.length === maxSize; },
    includes: function (player) { return players.includes(player); },
    swap: swap
  };
};
