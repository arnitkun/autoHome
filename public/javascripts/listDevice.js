var fetch = require('node-fetch')

var listDevices = function() {
    const getDeviceUrl = 'http://localhost:3000/devices/list';
    
    return fetch('http://localhost:3000/devices/list')
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