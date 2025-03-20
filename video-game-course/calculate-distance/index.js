// TODO 4: Add a parameter for your gaming library in the index.js module:
(function (window, createjs, opspark, Gamington) {
  // OUR MODULE CODE GOES BELOW HERE //

  console.log("index.js initialized!");
  console.log(gamington);

  /*
   * In this project, we'll use our getDistance() method to
   * determine if the mouse is intersecting with a Shape.
   *
   * If the mouse hovers-over the shape, we'll change the color
   * of the Shape from blue to red.  We'll actually draw two
   * circles, one blue and one red. The blue circle will sit on
   * top of the red circle, and when the mouse intersects, we'll
   * simply hide the blue circle by changing its 'alpha' property
   * from 1 to 0. Alpha is the transparency of the Display Object.
   */

  // setup the standard demo
  const engine = opspark.V6().activateResize();
  const canvas = engine.getCanvas();
  const stage = engine.getStage();

  const calculateDistance = gamington.numz.getDistance;

  const radius = 25; // the radius of our two circles
  const shapeUp = new createjs.Shape(); // the up state: the mouse is NOT intersecting
  const shapeOver = new createjs.Shape(); // the over state: the mouse IS intersecting
  const mouseCircle = new createjs.Shape();

  /*
   * Draw two circles, up for when the mouse is not touching it, over
   * for when the mouse is touching it. Note, the createjs API for drawing
   * is somewhat verbouse - it takes a lot of code just to draw a circle.
   */
  shapeUp.graphics.beginFill("blue").drawCircle(0, 0, radius);
  shapeOver.graphics.beginFill("red").drawCircle(0, 0, radius);
  shapeOver.alpha = 0;
  shapeUp.x = shapeOver.x = canvas.width / 2;
  shapeUp.y = shapeOver.y = canvas.height / 2;
  mouseCircle.graphics.beginFill("lightblue").drawCircle(0, 0, radius);

  /*
   * Create a textfield - position it horizontally centered, and
   * vertically just below center by 50px, so it sits below our circle shapes.
   */
  const textfield = new createjs.Text("Distance: ", "20px Arial", "#BBB");
  const textBounds = textfield.getBounds();

  textfield.x = (canvas.width - textBounds.width) / 2;
  textfield.y = canvas.height / 2 + 50;

  stage.addChild(mouseCircle, shapeUp, shapeOver, textfield);
  console.log(mouseCircle.graphics._fill.style);

  // The update() method is called 60 times a second //
  function update(event) {
    /*
     * TODO 5: use getDistance to calculate the distance between shapeUp and
     * the mouse. Store the result in a variable called distance:
     */
    var mouse = {
      x: stage.mouseX,
      y: stage.mouseY,
    };
    var distance = calculateDistance(shapeUp, mouse);
    textfield.text = "Distance: " + Math.ceil(distance) + "px";
    mouseCircle.x = mouse.x;
    mouseCircle.y = mouse.y;

    /*
     * TODO 6: Check if the mouse is within the area of shapeUp, and set the
     * alpha property of shapeUp accordingly:
     */
    if (distance <= 24) {
      shapeUp.alpha = 0;
      shapeOver.alpha = 1;
    } else {
      shapeUp.alpha = 1;
      shapeOver.alpha = 0;
    }

    if (distance <= 49) {
      mouseCircle.graphics._fill.style = "pink";
    } else {
      mouseCircle.graphics._fill.style = "lightblue";
    }

    /*
     * Update the textfield with the current distance between the mouse and
     *the edge of the shapeUp
     */
    //updateText(textfield, `Distance: ${Math.round(distance)}px`);
  }

  // this method updates the text on a textfield, then re-centers the textfield //
  function updateText(textfield, text) {
    textfield.text = text;
    const textBounds = textfield.getBounds();

    // re-center the text each time it changes //
    textfield.x = (canvas.width - textBounds.width) / 2;
    textfield.y = canvas.height / 2 + 50;
  }

  // startup the engine (the tick) //
  engine.addTickHandlers(update).activateTick();

  // OUR MODULE CODE GOES ABOVE HERE //

  // TODO 3: Pass your gaming library into the index.js module:
})(window, window.createjs, window.opspark, window.Gamington);
