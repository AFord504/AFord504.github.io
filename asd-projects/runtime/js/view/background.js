var background = function (window) {
  "use strict";

  window.opspark = window.opspark || {};
  var draw = window.opspark.draw;
  var createjs = window.createjs;

  /*
   * Create a background view for our game application
   */
  window.opspark.makeBackground = function (app, ground) {
    /* Error Checking - DO NOT DELETE */
    if (!app) {
      throw new Error("Invalid app argument");
    }
    if (!ground || typeof ground.y == "undefined") {
      throw new Error("Invalid ground argument");
    }

    // useful variables
    var canvasWidth = app.canvas.width;
    var canvasHeight = app.canvas.height;
    var groundY = ground.y;

    // container which will be returned
    var background;

    //////////////////////////////////////////////////////////////////
    // ANIMATION VARIABLES HERE //////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    // TODO (several):
    var tree;
    var buildings = [];

    // called at the start of game and whenever the page is resized
    // add objects for display in background. draws each image added to the background once
    function render() {
      background.removeAllChildren();

      // TODO 1:
      // this currently fills the background with an obnoxious yellow;
      // you should modify both the height and color to suit your game
      var backgroundFill = draw.rect(canvasWidth, groundY, "black");
      background.addChild(backgroundFill);

      var backGroundGrass = draw.rect(canvasWidth, groundY, "green");
      backGroundGrass.y = groundY;
      background.addChild(backGroundGrass);

      // TODO 2: - Add a moon and starfield
      for (var i = 0; i <= 100; i++) {
        var circle = draw.circle(5, "white", "LightGray", 2);
        circle.x = canvasWidth * Math.random();
        circle.y = groundY * Math.random();
        background.addChild(circle);
      }

      var moon = draw.bitmap("img/readme/moon.png");
      moon.x = 700;
      moon.y = 50;
      moon.scaleX = 1.0;
      moon.scaleY = 1.0;
      background.addChild(moon);

      // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
      for (var i = 0; i <= 4; ++i) {
        var buildingHeight = 250 - Math.random() * 100;
        var buildingColor = Math.ceil(Math.random() * 4);

        if (buildingColor === 1) {
          buildingColor = "Silver";
        } else if (buildingColor === 2) {
          buildingColor = "Grey";
        } else if (buildingColor === 3) {
          buildingColor = "Lightgray";
        } else {
          buildingColor = "Darkgray";
        }

        var building = draw.rect(75, buildingHeight, buildingColor, "Black", 1);
        building.x = 200 * i;
        building.y = groundY - buildingHeight;
        background.addChild(building);
        buildings.push(building);
      }

      // TODO 3: Part 1 - Add a tree
      tree = draw.bitmap("img/tree.png");
      tree.x = 200;
      tree.y = 30;
      background.addChild(tree);
    } // end of render function - DO NOT DELETE

    // Perform background animation
    // called on each timer "tick" - 60 times per second
    function update() {
      // useful variables
      var canvasWidth = app.canvas.width;
      var canvasHeight = app.canvas.height;
      var groundY = ground.y;

      // TODO 3: Part 2 - Move the tree!
      tree.x = tree.x - 1;

      if (tree.x < -200) {
        tree.x = canvasWidth;
      }

      // TODO 4: Part 2 - Parallax
      for (var i = 0; i < buildings.length; i++) {
        var building = buildings[i];
        building.x = building.x - 0.125;

        if (building.x < -75) {
          building.x = canvasWidth;
        }
      }
    } // end of update function - DO NOT DELETE

    /* Make a createjs Container for the background and let it know about the render and upate functions*/
    background = new createjs.Container();
    background.resize = render;
    background.update = update;

    /* make the background able to respond to resizing and timer updates*/
    app.addResizeable(background);
    app.addUpdateable(background);

    /* render and return the background */
    render();
    return background;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = background;
}
