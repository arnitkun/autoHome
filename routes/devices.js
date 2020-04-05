// mock route for devices
var express = require('express');
var router = express.Router();
var cors = require('cors');

//List of devices in the system
var devices = [];

router.use(cors())

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
    devices.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

//checks the status of /device route
router.get('/', function(req,res, next) {
  res.send({message:"Please specify a task."});
})

//Lists all devices in the system
router.get('/list', function(req,res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(devices);
});


router.post('/add', function(req, res, next) {
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
    res.send({ status: "Failure!", device_removed:  device_to_be_removed});
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
