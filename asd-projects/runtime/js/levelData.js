var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 500, y: 300 },
          { type: "sawblade", x: 1000, y: 175 },
          { type: "sawblade", x: 1500, y: 300 },
          { type: "sawblade", x: 2000, y: 300 },
          { type: "enemy", x: 1000, y: groundY - 50 },
          { type: "enemy", x: 2000, y: groundY - 50 },
          { type: "enemy", x: 3000, y: groundY - 50 },
          { type: "reward", x: 3750, y: groundY - 50 },
          { type: "marker", x: 4750, y: groundY - 50 },
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 500, y: 175 },
          { type: "sawblade", x: 800, y: 300 },
          { type: "sawblade", x: 1100, y: 175 },
          { type: "sawblade", x: 1400, y: 300 },
          { type: "enemy", x: 750, y: groundY - 50 },
          { type: "enemy", x: 1200, y: groundY - 50 },
          { type: "enemy", x: 1650, y: groundY - 50 },
          { type: "enemy", x: 2100, y: groundY - 50 },
          { type: "reward", x: 3000, y: groundY - 50 },
          { type: "marker", x: 4000, y: groundY - 50 },
        ],
      },
      {
        name: "Robot Rodeo",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 500, y: 175 },
          { type: "sawblade", x: 700, y: 300 },
          { type: "sawblade", x: 900, y: 175 },
          { type: "sawblade", x: 1100, y: 300 },
          { type: "sawblade", x: 1300, y: 175 },
          { type: "sawblade", x: 1500, y: 300 },
          { type: "enemy", x: 1050, y: groundY - 50 },
          { type: "enemy", x: 1650, y: groundY - 50 },
          { type: "enemy", x: 2250, y: groundY - 50 },
          { type: "reward", x: 3000, y: groundY - 50 },
          { type: "marker", x: 4000, y: groundY - 50 },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
