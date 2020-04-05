

function parseCommand(command) {
    command = command.toUpperCase();
    if(command == "LIST DEVICES") {
        let deviceList = devices.listDevices();
        deviceList.then( dlist => {
            console.log(dlist);
            term.prompt(dlist);
        })
    }
    if(command == "TEST") {
        let status = testDeviceApi.testDeviceApi();
        status.then( message => {
            console.log(message);
            term.prompt(message);
        });
    }
    if(command.startsWith("ADD DEVICE")) {
        let splittedCommand = command.split(" ");
        // console.log("the device is "+splittedCommand[2].toLowerCase());
        let deviceName = splittedCommand[2].toLowerCase();
        let apiResponse = addDeviceApi.addDevice(deviceName);
        apiResponse.then(res => {
                // console.log(message);
                if(res.status == "Success!") {
                let deviceAdded = res.device_added.toLowerCase();
                term.prompt(`Device added: ${deviceAdded}`);
                } 
                
                if(res.status == "Failure!"){
                    term.prompt(`Can not add device: ${deviceName}, either it exists or the API is not running.`);
                }
            })
    }
    if(command.startsWith("TASK")) {
        let splittedCommand = command.split(" ");
        console.log("The device is: " + splittedCommand[1].toLowerCase() + " and the task is: " + splittedCommand[2].toLowerCase);
        let device = splittedCommand[1].toLowerCase();
        let task = splittedCommand[2].toLowerCase();
        let status = taskApi.preformTask(device, task);
        status.then( message => {
            console.log(message);
            term.prompt(message);
        })
    }
    if(command.startsWith("REMOVE")) {
        let splittedCommand = command.split(" ");
        let deviceToRemove = splittedCommand[2].toLowerCase();
        let apiResponse = removeDeviceApi.remove(deviceToRemove);
        apiResponse.then(res => {
            console.log(res)
            if(res.status == "Success!") {
                let deviceRemoved = res.device_removed;
                term.prompt(`device_removed: ${deviceRemoved}`);
            } 
            if(res.status == "Failure!") {
                term.prompt(`Can not remove device: ${deviceToRemove}, either it does not exist or the API is not running.`)
            }
        })

    }
    currPos = entries.length - 1;
    term.prompt();
}

module.exports = {
    parseCommand
}