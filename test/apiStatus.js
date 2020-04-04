var listDevices = require('../public/utils/test');

async function test() {
    let answer = await listDevices.testDeviceApi();
    console.log(answer);
}

test();
