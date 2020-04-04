// mock route for devices
var express = require('express');
var router = express.Router();
var cors = require('cors');
//dummy list for testing
var devices = [0,1,1,1];
router.use(cors())
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req,res, next) {
  res.send({message:"Please specify a task."});
})

router.get('/list', function(req,res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(devices);
});

router.post('/add', function(req, res, next) {
  //should display name of new device
  let device_name = req.body.device_name;
  res.header('Content-Type','application/json');
  res.send({device_added:  device_name});
});

router.post('/remove', function(req,res, next) {
  let device_to_be_removed = req.body.device;
  res.send('Removing device: ' + device_to_be_removed);
});

router.put('/task',function(req,res,next) {
  let task = req.body.task;
  let device = req.body.device;
  res.header('Content-Type','text/html');
  res.send(`${device} will ${task}`);
});

module.exports = router;
