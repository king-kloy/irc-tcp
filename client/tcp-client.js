/**
 * @author king-kloy
 * @description a simple TCP client just like IRC
 * Date: 04/30/2019 
 */

// importing node modules
const net = require('net');

/**
 * create a tcp connection to the server
 */
const client = net.connect(3000, '127.0.0.1', () => {
    console.log(
        '\n > Welcome to \033[92mok.ai-irc\033[39m!' +
        '\n > Created by \033[90mking kloy\033[39m!'
    );
});

client.on('data', (data) => {
    console.log(data.toString());
});

// set encoding to utf-8 for user input
process.stdin.setEncoding('utf8');

// event emitter on user input
// taking user name from the console
process.stdin.on('data', (input) => {
    client.write(input.replace('\r\n', ''));
});

client.setEncoding('utf-8');

client.on('close', function () {
    console.log('\033[90m > ' + nickname + 'left the room\033[39m\n');
});