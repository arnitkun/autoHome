var fetch = require("node-fetch");

/**
 * Removes specified device from system.
 * @param {String} name name of device to be removed 
 */
function remove(name) {
    const remove_device_url = 'http://localhost:3000/devices/remove';
    console.log("removing " + name);
    let reqOb = {"device": name}
    return fetch(remove_device_url, {method: 'POST', body: JSON.stringify(reqOb), headers: { 'Content-Type': 'application/json' } })
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
    remove
}

// remove("bulb");