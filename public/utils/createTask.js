var fetch = require('node-fetch');

function preformTask(device, task) {
    console.log(`Console log: ${device} will ${task}`);
    create_task_url = 'http://localhost:3000/devices/task';
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