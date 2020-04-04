var fetch = require('node-fetch');

function addDevice(name) {
    console.log("adding " + name)
    add_device_url = 'http://localhost:3000/devices/add';
    let reqOb = {"device_name": name}
    return fetch(add_device_url, {method: 'POST', body: JSON.stringify(reqOb), headers: { 'Content-Type': 'application/json' } })
    .then(res => res.json())
    .then(body=>{
        console.log(body)
        return body;
    })
    .catch(err => {
        console.log("Error in getting response " + err)
    })
    
    
}

module.exports = {
    addDevice
}
