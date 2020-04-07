var fetch = require('node-fetch')

/**
 * Returns the list of all devices currently in the system
 */
var listDevices = function() {
    const getDeviceUrl = 'http://localhost:3000/devices/list';
    
    return fetch(getDeviceUrl)
        .then(res => res.text())
        .then(body=>{
            return body;
        })
}

module.exports = {
    listDevices
}

// async function print() {
//     let resp = await listDevices();
//     console.log(resp);
// }

// print();