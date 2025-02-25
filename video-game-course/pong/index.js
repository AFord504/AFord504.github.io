(function (window, createjs, opspark, _) {
  // Variable declarations for libraries and the game engine
  const draw = opspark.draw; // library for drawing using createJS
  const physikz = opspark.racket.physikz; // library for defining physics properties like velocity
  const engine = opspark.V6().activateResize(); // game engine for actively rendering + running the game's mechanics
  const canvas = engine.getCanvas(); // object for referencing the height / width of the window
  const stage = engine.getStage(); // object to hold all visual components

  // load some sounds for the demo - play sounds using: createjs.Sound.play("wall");
  createjs.Sound.on("fileload", handleLoadComplete);
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.registerSounds(
    [
      { src: "hit.ogg", id: "hit" },
      { src: "wall.ogg", id: "wall" },
    ],
    "assets/sounds/"
  );

  function handleLoadComplete(event) {
    console.log("sounds loaded");
  }

  engine
    .addTickHandlers(update) // establish the update function as the callback for every timer tick
    .activateTick();

  // Variable declarations for the paddles and the ball which are drawn using createJS (see bower_components/opspark-draw/draw.js)
  const paddlePlayer = createPaddle();
  const paddleCPU = createPaddle({
    x: canvas.width - 20,
    y: canvas.height - 100,
  });
  const ball = draw.circle(20, "#CCC");

  // set initial properties for the paddles
  paddlePlayer.yVelocity = 0;
  paddleCPU.yVelocity = 4.3;

  // set initial properties for the ball
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xVelocity = 5;
  ball.yVelocity = 5;
  ball.radius = 20;
  ball.accelerate = 0;

  // add the paddles and the ball to the view
  stage.addChild(paddlePlayer, paddleCPU, ball);

  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("keydown", onKeyDown);

  // when an Arrow key is pressed down, set the paddle in motion
  function onKeyDown(event) {
    if (event.key === "ArrowUp") {
      paddlePlayer.yVelocity = -5;
    } else if (event.key === "ArrowDown") {
      paddlePlayer.yVelocity = 5;
    }
  }

  // when either the Arrow Up or Arrow Down key are released, stop the paddle from moving
  function onKeyUp(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      paddlePlayer.yVelocity = 0;
    }
  }

  function update(event) {
    const boundsCPU = paddleCPU.getBounds();
    const widthCPU = boundsCPU.width;
    const heightCPU = boundsCPU.height;
    const midCPU = heightCPU / 2;
    const boundsPlayer = paddlePlayer.getBounds();
    const widthPlayer = paddlePlayer.width;
    const heightPlayer = paddlePlayer.height;

    // Ball movement: the xVelocity and yVelocity is the distance the ball moves per update
    ball.x = ball.x + ball.xVelocity;
    ball.y = ball.y + ball.yVelocity;

    // Player movement //
    paddlePlayer.y += paddlePlayer.yVelocity;
    if (paddlePlayer.y < 0) {
      paddlePlayer.y = 0;
    }
    if (paddlePlayer.y > canvas.height - paddlePlayer.height) {
      paddlePlayer.y = canvas.height - heightPlayer;
    }

    // AI movement: CPU follows ball //
    if (paddleCPU.y + midCPU < ball.y - 16) {
      paddleCPU.y += paddleCPU.yVelocity;
    } else if (paddleCPU.y + midCPU > ball.y + 16) {
      paddleCPU.y -= paddleCPU.yVelocity;
    }

    // TODO 1: bounce the ball off the top
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
      ball.yVelocity = ball.yVelocity * -1;
      createjs.Sound.play("wall");
    }

    // TODO 2: bounce the ball off the bottom

    // TODO 3: bounce the ball off each of the paddles
    if (
      ball.x - ball.radius < paddleCPU.x + widthCPU &&
      ball.x + ball.radius > paddleCPU.x &&
      ball.y - ball.radius < paddleCPU.y + heightCPU &&
      ball.y + ball.radius > paddleCPU.y
    ) {
      ball.accelerate = ball.accelerate + 0.1;
      ball.xVelocity = ball.xVelocity * -1 - ball.accelerate;
      createjs.Sound.play("hit");
    }
    if (
      ball.x - ball.radius < paddlePlayer.x + widthPlayer &&
      ball.x + ball.radius > paddlePlayer.x &&
      ball.y - ball.radius < paddlePlayer.y + heightPlayer &&
      ball.y + ball.radius > paddlePlayer.y
    ) {
      ball.accelerate = ball.accelerate + 0.1;
      ball.xVelocity = ball.xVelocity * -1 + ball.accelerate;
      createjs.Sound.play("hit");
    }

    if (ball.x + ball.radius >= canvas.width) {
      ballReset();
      ballLaunch("left");
    }
    if (ball.x - ball.radius <= 0) {
      ballReset();
      ballLaunch("right");
    }
  }

  // helper function that wraps the draw.rect function for easy paddle making
  function createPaddle({
    width = 20,
    height = 100,
    x = 0,
    y = 0,
    color = "#CCC",
  } = {}) {
    const paddle = draw.rect(width, height, color);
    paddle.x = x;
    paddle.y = y;
    return paddle;
  }

  function ballReset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xVelocity = 0;
    ball.yVelocity = 0;
    ball.accelerate = 0;
  }

  function ballLaunch(side) {
    if (side === "right") {
      ball.xVelocity = 5 + ball.accelerate;
    } else {
      ball.xVelocity = -5 - ball.accelerate;
    }
    if (Math.ceil(Math.random() * 2 === 1)) {
      ball.yVelocity = 5;
    } else {
      ball.yVelocity = -5;
    }
  }
})(window, window.createjs, window.opspark, window._);
