const resources = require("./../../resources/model");
const Gpio = require("onoff").Gpio;

let sensor;
const device = resources.pi.sensors.pir;

function connectHardware() {
  sensor = new Gpio(device.gpio, "in", "both");
  sensor.watch((err, val) => {
    !err ? (device.value = !!device.value) : console.log(err);
  });
}

function start() {
  connectHardware();
}

function stop() {
  sensor.unexport();
}

exports.start = start;
exports.stop = stop;
