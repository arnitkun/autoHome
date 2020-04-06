var fetch = require('node-fetch');

/**
 * 
 * @param {string} name 
 * Name of the device to be added, duplicate device won't be added 
 */
function addDevice(name) {
    console.log("adding " + name)
    add_device_url = 'http://192.168.99.100:3000/devices/add';
    let reqOb = {"device_name": name}
    return fetch(add_device_url, {method: 'POST', body: JSON.stringify(reqOb), headers: { 'Content-Type': 'application/json' } })
    .then(res => res.json())
    .then(body=>{
        // console.log(body)
        return body;
    })
    .catch(err => {
        console.log("Error in getting response " + err)
    })
    
    
}

module.exports = {
    addDevice
}