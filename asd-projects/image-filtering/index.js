// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applySmudge();
  //applyFilterNoBackground(reddify);
  //applyFilterNoBackground(decreaseBlue);
  //applyFilterNoBackground(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var r = 0; r < image.length; r++) {
    var row = image[r];
    for (var c = 0; c < row.length; c++) {
      var rgbString = row[c];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      row[c] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  var background = image[0][0];
  for (var r = 0; r < image.length; r++) {
    var row = image[r];
    for (var c = 0; c < row.length; c++) {
      var rgbString = row[c];
      if (rgbString !== background) {
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        row[c] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(num) {
  return Math.max(Math.min(num, 255), 0);
}

// TODO 3: Create reddify function
function reddify(arr) {
  arr[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(arr) {
  arr[BLUE] = keepInBounds((arr[BLUE] -= 50));
}

function increaseGreenByBlue(arr) {
  arr[GREEN] = keepInBounds(arr[GREEN] + arr[BLUE]);
}

// CHALLENGE code goes below here
function applySmudge() {
  for (var r = 0; r < image.length; r++) {
    var row = image[r];
    for (var c = 1; c < row.length - 1; c++) {
      var rgbString1 = row[c + 1];
      var rgbString2 = row[c];
      var rgbNumbers1 = rgbStringToArray(rgbString1);
      var rgbNumbers2 = rgbStringToArray(rgbString2);
      mix(rgbNumbers1, rgbNumbers2);
      rgbString1 = rgbArrayToString(rgbNumbers1);
      rgbString2 = rgbArrayToString(rgbNumbers2);
      row[c + 1] = rgbString1;

      var rgbString1 = row[c - 1];
      var rgbString2 = row[c];
      var rgbNumbers1 = rgbStringToArray(rgbString1);
      var rgbNumbers2 = rgbStringToArray(rgbString2);
      mix(rgbNumbers1, rgbNumbers2);
      rgbString1 = rgbArrayToString(rgbNumbers1);
      rgbString2 = rgbArrayToString(rgbNumbers2);
      row[c - 1] = rgbString1;
    }
  }
}

function mix(mixed, mixer) {
  mixed[BLUE] = (mixed[BLUE] + mixer[BLUE]) / 2;
  mixed[RED] = (mixed[RED] + mixer[RED]) / 2;
  mixed[GREEN] = (mixed[GREEN] + mixer[GREEN]) / 2;
}
