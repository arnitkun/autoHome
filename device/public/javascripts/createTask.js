var fetch = require('node-fetch');

/**
 * 
 * @param {String} device Name of device on which task is to be performed
 * @param {String} task The task to be performed
 */
function preformTask(device, task) {
    console.log(`Console log: ${device} will ${task}`);
    create_task_url = 'http://192.168.99.100:3000/devices/task';
    let reqOb = {"task": task,
                 "device": device}
    return fetch(create_task_url, {method: 'PUT', body: JSON.stringify(reqOb), headers: { 'Content-Type': 'application/json' } })
    .then(res => res.text())
    .then(body=>{
        console.log(body)
        return body;
    })
    .catch(err => {
        console.log("Error in getting response " + err)
    })    
}

module.exports = {
    preformTask
}

// preformTask("bulb", "turn off");