

var devices = require('../utils/listDevice');
var testDeviceApi = require('../utils/test');
var addDeviceApi = require('../utils/addDevice');
var taskApi = require('../utils/createTask');
var removeDeviceApi = require('../utils/removeDevice')

var term = new Terminal({
    cursorBlink: "block"
});

var curr_line = '';
var entries = [];
var currPos = 0;
var pos = 0;



term.open(document.getElementById('terminal'));
term.prompt = (message = "") => {
    term.write('\r' + message + '\n\r\u001b[32mautoHome> \u001b[37m');
};

term.write('Welcome to Home automation!');
term.prompt();

term.on('key', function(key, ev) {
    const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey &&
        !(ev.keyCode === 37 && term.buffer.cursorX < 6);

    if (ev.keyCode === 13) { // Enter key
        if (curr_line.replace(/^\s+|\s+$/g, '').length != 0) { // Check if string is all whitespace
            entries.push(curr_line);
            // console.log(curr_line);
            curr_line_upper = curr_line.toUpperCase();
            if(curr_line_upper == "LIST DEVICES") {
                let deviceList = devices.listDevices();
                deviceList.then( dlist => {
                    console.log(dlist);
                    term.prompt(dlist);
                    
                })
            }
            if(curr_line_upper == "TEST") {
                let status = testDeviceApi.testDeviceApi();
                status.then( message => {
                    console.log(message);
                    term.prompt(message);
                });
            }
            if(curr_line_upper.startsWith("ADD DEVICE")) {
                let splittedCommand = curr_line_upper.split(" ");
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
            if(curr_line_upper.startsWith("TASK")) {
                let splittedCommand = curr_line_upper.split(" ");
                console.log("The device is: " + splittedCommand[1].toLowerCase() + " and the task is: " + splittedCommand[2].toLowerCase);
                let device = splittedCommand[1].toLowerCase();
                let task = splittedCommand[2].toLowerCase();
                let status = taskApi.preformTask(device, task);
                status.then( message => {
                    console.log(message);
                    term.prompt(message);
                })
            }
            if(curr_line_upper.startsWith("REMOVE")) {
                let splittedCommand = curr_line_upper.split(" ");
                let deviceToRemove = splittedCommand[1].toLowerCase();
                let apiResponse = removeDeviceApi.remove(deviceToRemove);
                apiResponse.then(res => {
                    console.log(res)
                    if(res.status == "Success!") {
                        let deviceRemoved = message.device_removed;
                        term.prompt(`device_removed: ${deviceRemoved}`);
                    } 
                    if(res.status == "Failure!") {
                        term.prompt(`Can not remove device: ${deviceToRemove}, either it does not exist or the API is not running.`)
                    }
                })

            }
            currPos = entries.length - 1;
            term.prompt();
        } else {
            term.write('\n\33[2K\r\u001b[32mautohome> \u001b[37m');
        }
        curr_line = '';
    } else if (ev.keyCode === 8) { // Backspace
        if (term.buffer.cursorX > 5) {
            curr_line = curr_line.slice(0, term.buffer.cursorX - 6) + curr_line.slice(term.buffer.cursorX - 5);
            pos = curr_line.length - term.buffer.cursorX + 6;
            term.write('\33[2K\r\u001b[32mautohome> \u001b[37m' + curr_line);
            term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
            if (term.buffer.cursorX == 5 || term.buffer.cursorX == curr_line.length + 6) {
                term.write('\033[1C')
            }
        }
    } else if (ev.keyCode === 38) { // Up arrow
        if (entries.length > 0) {
            if (currPos > 0) {
                currPos -= 1;
            }
            curr_line = entries[currPos];
            term.write('\33[2K\r\u001b[32mautohome> \u001b[37m' + curr_line);
        }
    } else if (ev.keyCode === 40) { // Down arrow
        currPos += 1;
        if (currPos === entries.length || entries.length === 0) {
            currPos -= 1;
            curr_line = '';
            term.write('\33[2K\r\u001b[32mautohome> \u001b[37m');
        } else {
            curr_line = entries[currPos];
            term.write('\33[2K\r\u001b[32mautohome> \u001b[37m' + curr_line);

        }
    } else if (printable && !(ev.keyCode === 39 && term.buffer.cursorX > curr_line.length + 4)) {
        if (ev.keyCode != 37 && ev.keyCode != 39) {
            var input = ev.key;
            if (ev.keyCode == 9) { // Tab
                input = "    ";
            }
            pos = curr_line.length - term.buffer.cursorX + 4;
            curr_line = [curr_line.slice(0, term.buffer.cursorX - 5), input, curr_line.slice(term.buffer.cursorX - 5)].join('');
            term.write('\33[2K\r\u001b[32mautohome> \u001b[37m' + curr_line);
            term.write('\033['.concat(pos.toString()).concat('D')); //term.write('\033[<N>D');
        } else {
            term.write("you typed "+key);
        }
    }
});

term.on('paste', function(data) {
    curr_line += data;
    term.write("you typed "+curr_line);
});