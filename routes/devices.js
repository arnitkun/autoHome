// mock route for devices
var express = require('express');
var router = express.Router();
var cors = require('cors');

//dummy list for testing
var devices = [];

function isAdded(device) {
  if(!devices.includes(device)) {
    devices.push(device);
    return true;
  }
  return false;
}

function isRemoved(device) {
  let index = devices.indexOf(device);
  if(index != -1) {
    devices.splice(1, index);
    return true;
  } else {
    return false;
  }
}


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
  if(isAdded(device_name) == true){
    res.header('Content-Type','application/json');
    res.send(
      { status: "Success!",
      device_added:  device_name
    }); 
  } else {
    res.send({ status: "Failure!", device_added:  "None"});
  }
});

router.post('/remove', function(req,res, next) {
  let device_to_be_removed = req.body.device;
  console.log("removing: " + device_to_be_removed);
  if(isRemoved(device_to_be_removed) == true) {
    res.header('Content-Type','application/json');
    res.send({
      status: "Success!",
      device_removed: device_to_be_removed
    });
  } else {
    res.send({ status: "Failure!", device_removed:  "None"});
  }
});

router.put('/task',function(req,res,next) {
  let task = req.body.task;
  let device = req.body.device;
  res.header('Content-Type','application/json');
  let resOb = {
    "device": device,
    "action_performed": task
  }
  res.send(resOb);
});

module.exports = router;
