
var fromA = require('./test/a')
var term = new Terminal({
    cursorBlink: "block"
});

var curr_line = '';
var entries = [];
var currPos = 0;
var pos = 0;

term.open(document.getElementById('terminal'));
term.prompt = () => {
    term.write('\n\r' + curr_line + '\r\n\u001b[32mautoHome> \u001b[37m');
};
term.write('Welcome to Home automation!');
term.prompt();

term.on('key', function(key, ev) {
    const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey &&
        !(ev.keyCode === 37 && term.buffer.cursorX < 6);

    if (ev.keyCode === 13) { // Enter key
        if (curr_line.replace(/^\s+|\s+$/g, '').length != 0) { // Check if string is all whitespace
            entries.push(curr_line);
            console.log(curr_line);
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