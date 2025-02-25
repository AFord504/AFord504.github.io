/*
 * TODO 4: Create a modularized index.js,
 * pass in window and createjs
 */
(function (window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  // TODO 6: Set the framerate of the Ticker
  createjs.Ticker.framerate = 60;

  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */

  // INIT CREATEJS //
  const container = new createjs.Container();

  // CREATE A BACKGROUND //
  const background = new createjs.Shape();
  background.graphics
    .beginFill("yellow")
    .drawRect(0, 0, canvas.width, canvas.height);

  // CREATE A CIRCLE //
  const circle = new createjs.Shape();

  circle.graphics.beginFill("black").drawCircle(canvas.width / 4 - 35, 100, 40);
  circle.graphics
    .beginFill("black")
    .drawCircle((canvas.width * 3) / 4 - 35, 100, 40);
  circle.graphics.beginFill("black").drawCircle(canvas.width / 2 - 35, 300, 40);

  const rect = new createjs.Shape();

  rect.graphics.beginFill("yellow").drawRect(0, 50, canvas.width, 50);
  rect.graphics.beginFill("yellow").drawRect(0, 240, canvas.width, 50);
  //rect.graphics.beginFill("yellow").drawRect(0, 310, canvas.width, 50);

  // ADD DISPLAY OBJECTS TO STAGE //
  container.addChild(circle, rect);
  stage.addChild(background, container);

  stage.update();

  // TODO 8: Listen to the 'tick' event  //
  let tickHandler = createjs.Ticker.on("tick", onTick);

  // TODO 9: Handle the 'tick' event //
  function onTick(event) {
    update(event);
  }

  /*
   * TODO 10: Implement an update Function, after making
   * changes to assets, it must call stage.update();
   */

  var maxScale = 1.3;
  var minScale = 0.7;

  function update(event) {
    if (circle.scale < maxScale) {
      circle.scale += 0.004;
      circle.x -= 0.6;
      circle.y -= 0.5;
    }
    if (rect.scaleY > minScale) {
      rect.scaleY -= 0.004;
      rect.y -= 0.4;
    }
    stage.update();
  }
})(window, window.createjs);
