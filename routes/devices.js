// for lights
var express = require('express');
var router = express.Router();

//dummy list for testing
var devices = [0,1,1,1];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req,res, next) {
  let number_of_devices = devices.length;
  res.send('the number of lights:' + number_of_devices)
})

router.post('/add', function(req, res, next) {
  //should display name of new device
  let device_name = req.body;
  res.send('New Device Added: ' + device_name);
})

router.post('/remove', function(req,res, next) {
  let device_to_be_removed = req.body.device;
  res.send('Removing device: ' + device_to_be_removed);
});

module.exports = router;
