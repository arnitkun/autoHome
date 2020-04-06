var fetch = require('node-fetch');

/**
 * checks the status of the automated device API
 */
function testDeviceApi() {
    return fetch('http://192.168.99.100:3000/devices')
        .then(res => res.text())
        .then(body=>{
            // console.log(typeof body);
            return body;
        })
}

module.exports = {
    testDeviceApi
}
