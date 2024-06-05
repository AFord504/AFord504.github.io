$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    // for (let i = 100; i < canvas.width; i += 100) {
    //   createPlatform(i, canvas.height, -1, -canvas.height);
    // }
    // for (let i = 100; i < canvas.height; i += 100) {
    //   createPlatform(canvas.width, i, -canvas.width, -1);
    // }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    // Floor 1
    createPlatform(50, 200, 1150, 10);
    createPlatform(50, 0, 1300, 10);
    createPlatform(50, 0, 10, 200);
    createPlatform(1350, 0, 10, 200);
    
    createPlatform(50, 100, 150, 10);
    createPlatform(200, 0, 10, 100);

    createPlatform(300, 100, 150, 10);
    createPlatform(300, 0, 10, 100);
    createPlatform(450, 0, 10, 100);

    createPlatform(550, 100, 150, 10);
    createPlatform(550, 0, 10, 100);
    createPlatform(700, 0, 10, 100);

    createPlatform(800, 100, 150, 10);
    createPlatform(800, 0, 10, 100);
    createPlatform(950, 0, 10, 100);

    createPlatform(1050, 100, 150, 10);
    createPlatform(1050, 0, 10, 100);
    createPlatform(1200, 0, 10, 100);

    //Floor 2
    createPlatform(200, 400, 1150, 10);
    createPlatform(1350, 200, 10, 200);
    createPlatform(50, 200, 10, 200);

    createPlatform(1200, 300, 150, 10);
    createPlatform(1200, 300, 10, 100);

    createPlatform(900, 300, 150, 10);
    createPlatform(900, 300, 10, 100);
    createPlatform(1050, 300, 10, 100);

    createPlatform(600, 300, 150, 10);
    createPlatform(600, 300, 10, 100);
    createPlatform(750, 300, 10, 100);

    createPlatform(300, 300, 150, 10);
    createPlatform(300, 300, 10, 100);
    createPlatform(450, 300, 10, 100);

    //Floor 3
    createPlatform(50, 400, 10, 400);
    createPlatform(1350, 400, 10, 400);

    createPlatform(50, 600, 150, 10);
    createPlatform(200, 600, 10, 200);

    createPlatform(1200, 600, 150, 10);
    createPlatform(1200, 600, 10, 200);

    createPlatform(400, 650, 75, 10);

    createPlatform(600, 650, 75, 10);

    createPlatform(800, 650, 75, 10);

    createPlatform(1000, 650, 75, 10);

    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable("max", 1250, 250, 0, 0);
    createCollectable("steve", 100, 550, 0, 0);
    createCollectable("grace", 1250, 550, 0, 0);

    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon("right", 225, 1700);
    createCannon("left", 300, 900);
    createCannon("right", 775, 50);
    createCannon("right", 675, 1500);

    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
