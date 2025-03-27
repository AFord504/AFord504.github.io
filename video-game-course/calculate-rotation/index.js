// TODO 4: add a param for your game lib last //
(function (window, opspark, Gamington) {
  console.log("index.js initialized!");

  const assets = opspark.assets,
    engine = opspark.V6().activateResize(),
    canvas = engine.getCanvas(),
    stage = engine.getStage(),
    textfield = assets.makeTextfield("Degrees: ");

  stage.addChild(textfield);

  const calculateRotation = gamington.numz.getAngleDegrees;
  const calculateDistance = gamington.numz.getDistance;

  // try a different hex color if you want //
  const ship1 = assets.makeShip("red");
  const ship2 = assets.makeShip("blue");

  // TODO 5: Center the ship on the stage //
  ship1.x = canvas.width / 2;
  ship1.y = canvas.height / 2;

  var ship1Destination = {
    x: ship1.x,
    y: ship1.y,
  };

  var distance;

  setInterval(function () {
    ship1Destination.x = Math.random() * canvas.width;
    ship1Destination.y = Math.random() * canvas.height;

    distance = calculateDistance(ship1Destination, ship1);
  }, 5000);

  // TODO 6: Add the ship to the stage //
  stage.addChild(ship1, ship2);

  function update(event) {
    /*
     * TODO 7: Use your game lib's getAngleDegrees to get
     * the degrees of the angle between the ship and the
     * mouse position, and assign it to a const called
     * degrees.
     *
     * Remember, the (x, y) location of the mouse is available
     * stage.mouseX and stage.mouseY, BUT, your getAngleDegrees()
     * method takes two points. What do you need to do to translate
     * these values such that they're packed into a point?
     */
    const mouse = {
      x: stage.mouseX,
      y: stage.mouseY,
    };

    ship2.x = mouse.x;
    ship2.y = mouse.y;

    var degrees = calculateRotation(ship2, ship1);

    // TODO 8: Set the ship's rotation property to the degrees //
    ship1.rotation = degrees;
    ship2.rotation = degrees - 180;

    var ship1SpeedX = distance / 60;
    var ship1SpeedY = distance / 60;

    if (ship1.x < ship1Destination.x - 2) {
      ship1.x += ship1SpeedX;
    } else if (ship1.x > ship1Destination.x + 2) {
      ship1.x -= ship1SpeedX;
    } else {
      ship1SpeedX = 0;
    }
    if (ship1.y < ship1Destination.y - 2) {
      ship1.y += ship1SpeedY;
    } else if (ship1.y > ship1Destination.y + 2) {
      ship1.y -= ship1SpeedY;
    } else {
      ship1SpeedY = 0;
    }
    ship1.x = Math.ceil(ship1.x);
    ship1.y = Math.ceil(ship1.y);

    /*
     * TODO 9: Uncomment the line below to update the textfield
     * with the current angle degrees. Degrees will be a value
     * between π and -π, or, 180 and -180.
     */
    assets.updateText(textfield, `Degrees: ${degrees.toFixed(3)}°`, canvas);
  }

  engine.addTickHandlers(update).activateTick();

  // TODO 3: pass your game lib last with, window.my-game-lib //
})(window, window.opspark, window.Gamington);
