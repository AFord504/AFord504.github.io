/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT2: 65,
    UP2: 87,
    RIGHT2: 68,
    DOWN2: 83,
    SHIFT: 16,
  };
  var board = {
    width: $("#board").width() - 50,
    height: $("#board").height() - 50,
  };
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    it: false,
  };
  var wonderer = {
    x: board.width,
    y: board.height,
    speedX: 0,
    speedY: 0,
    it: true,
  };
  var homingSwitch = false;

  // Game Item Objects

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
    homingState();
    playerCollision();
  }

  /* 
  Called in response to events.
  */

  //Moves player on directional key press
  function handleKeyDown(event) {
    //Walker's movement
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }

    //Wonderer's movement
    if (event.which === KEY.LEFT2) {
      wonderer.speedX = -5;
    }
    if (event.which === KEY.UP2) {
      wonderer.speedY = -5;
    }
    if (event.which === KEY.RIGHT2) {
      wonderer.speedX = 5;
    }
    if (event.which === KEY.DOWN2) {
      wonderer.speedY = 5;
    }

    //Homing toggle
    if (event.which === 16) {
      homingToggle();
    }
  }

  //Makes wonderer home in on walker
  function homing() {
    wonderer.x > walker.x ? (wonderer.speedX = -2) : null;
    wonderer.x < walker.x ? (wonderer.speedX = 2) : null;
    wonderer.y > walker.y ? (wonderer.speedY = -2) : null;
    wonderer.y < walker.y ? (wonderer.speedY = 2) : null;
  }
  $("#bot").on("click", homingToggle);

  function playerCollision() {
    if (
      walker.x - wonderer.x < 50 &&
      walker.x - wonderer.x > -50 &&
      walker.y - wonderer.y < 50 &&
      walker.y - wonderer.y > -50
    ) {
      walker.x = 0;
      walker.y = 0;
      wonderer.x = board.width;
      wonderer.y = board.height;
      itSwap();
    }
  }

  //Stops player's movement on directional key lift
  function handleKeyUp(event) {
    //Stops walker
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker.speedY = 0;
    }

    //Stops wonderer
    if (event.which === KEY.LEFT2 || event.which === KEY.RIGHT2) {
      wonderer.speedX = 0;
    }
    if (event.which === KEY.UP2 || event.which === KEY.DOWN2) {
      wonderer.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //Changes plsyer's position in relation to speed
  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
    wonderer.x += wonderer.speedX;
    wonderer.y += wonderer.speedY;
  }

  //Changes player's image to its position
  function redrawGameItem() {
    $("#walker").css("left", walker.x);
    $("#walker").css("top", walker.y);
    $("#wonderer").css("left", wonderer.x);
    $("#wonderer").css("top", wonderer.y);
  }

  //Stops player from leaving the board
  function wallCollision() {
    //Stops walker
    if (walker.x < 0 || walker.x > board.width) {
      walker.x -= walker.speedX;
    }
    if (walker.y < 0 || walker.y > board.height) {
      walker.y -= walker.speedY;
    }

    //Stops wonderer
    if (wonderer.x < 0 || wonderer.x > board.width) {
      wonderer.x -= wonderer.speedX;
    }
    if (wonderer.y < 0 || wonderer.y > board.height) {
      wonderer.y -= wonderer.speedY;
    }
  }

  //Checks if homing is enabled then activates it if so
  function homingState() {
    if (homingSwitch === true) {
      homing();
    }
  }

  function homingToggle() {
    if (homingSwitch === false) {
      homingSwitch = true;
      $("#bot").text("wonderer: bot");
    } else {
      homingSwitch = false;
      wonderer.speedX = 0;
      wonderer.speedY = 0;
      $("#bot").text("wonderer: player");
    }
  }

  function itSwap() {
    if (wonderer.it === true) {
      wonderer.it = false;
      walker.it = true;
      $("#walker").css("background-color", "red");
      $("#wonderer").css("background-color", "darkorange");
    } else {
      walker.it = false;
      wonderer.it = true;
      $("#walker").css("background-color", "teal");
      $("#wonderer").css("background-color", "red");
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
