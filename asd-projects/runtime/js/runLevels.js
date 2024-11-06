var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
    }

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red", "orange", 2);
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -3;
      enemy.rotationalVelocity = 2;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-20);
        enemy.fadeOut();
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
      };
    }

    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var blueCircle = draw.circle(25, "blue", "lightBlue", 2);
      blueCircle.x = -0;
      blueCircle.y = -0;
      reward.addChild(blueCircle);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -3;
      reward.onPlayerCollision = function () {
        game.changeIntegrity(25);
        game.increaseScore(250);
        reward.fadeOut();
      };
      reward.onProjectileCollision = function () {
        reward.fadeOut();
      };
    }

    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 25);
      var greenSquare = draw.rect(50, 50, "green", "lightGreen", 2);
      greenSquare.x = -25;
      greenSquare.y = -25;
      marker.addChild(greenSquare);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = -3;
      marker.onPlayerCollision = function () {
        startLevel();
        marker.fadeOut();
      };
      marker.onProjectileCollision = function () {
        startLevel();
        marker.fadeOut();
      };
    }

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for (var i = 0; i < levelObjects.length; i++) {
        if (levelObjects[i].type === "sawblade") {
          createSawBlade(levelObjects[i].x, levelObjects[i].y)
        }
        if (levelObjects[i].type === "enemy") {
          createEnemy(levelObjects[i].x, levelObjects[i].y)
        }
        if (levelObjects[i].type === "reward") {
          createReward(levelObjects[i].x, levelObjects[i].y)
        }
        if (levelObjects[i].type === "marker") {
          createMarker(levelObjects[i].x, levelObjects[i].y)
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
