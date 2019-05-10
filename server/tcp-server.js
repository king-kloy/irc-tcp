/**
 * @author king-kloy
 * @description a simple TCP server
 * Date: 03/30/2019 
 */

 // import node modules
const net = require('net');

/**
 * keeps track of the connections
 */
let count = 0;

/**
 * keep track of users
 */
let users = {};

/**
 * Create server
 */
const server = net.createServer(function (connection) {
    connection.write(
        '\n > Welcome to \033[92mok.ai-server\033[39m!' +
        '\n > Created by \033[90mking kloy\033[39m!' +
        '\n > ' + count + ' other people are connected at this time.' +
        '\n > Please write your name and press Enter: '
    );
    count++;

    /**
     * @function broadcast  helps to send message to others online
     * @param {*} msg message to send
     * @param {*} exceptMyself the current user
     */
    function broadcast(msg, exceptMyself) {
        for (let i in users) {
            if (!exceptMyself || i != nickname) /** check if message is not send to yourself */ {
                users[i].write(msg);
            }
        }
    }
    
    // the nickname of the current connected user
    let nickname, currentUser;

    // log user input to the terminal 
    connection.on('data', function(data) {
        // remove 'enter' character
        data.replace('\r\n', '');
        // console.log(data);

        // if user has no nickname, then validate it
        // if user nickname is not in use, then relay it to others online
        if (!nickname) {
            if (users[data]) {
                connection.write('\033[93m > ' + data + ' is already in use. try again:\033[39m');
                return;
            } else {
                nickname = data;

                // if not currentUser, then currentUser = nickname
                //  else otherwise
                if (!currentUser) {
                    currentUser = nickname.toString();
                }

                users[nickname] = connection;
                // debug logs
                console.log(nickname.toString());
                console.log(Object.keys(users));

                broadcast('\033[90m > ' + data.toString() + ' joined the room\033[39m');
                //  for(let i in users) {
                //      broadcast('\033[90m > ' + i + 'joined the room\033[39m');
                //  }
            }
        } else {
            // consider it as a text message
            // for (let i in users) {
            //     if (i != nickname) /** check if message is not send to yourself */ {
            //         broadcast('\033[96m > [' + nickname + '@ok.ai-chat]:\033[39m ' + data , true);
            //     } 
            // }

            if (users.nickname != data) /** check if message is not send to yourself */ {
                broadcast('\033[96m > [\033[39m\033[95m' + currentUser + '\033[39\033[96m@ok.ai-chat]:\033[39m ' + data, true);
            }
        }
    });

    connection.setEncoding('utf-8');

    // if user close connection then reduce the number of users connected and delete user nickname
    connection.on('close', function() {
        count--;
        delete users[nickname];

        broadcast('\033[90m > ' + nickname + 'left the room\033[39m\n');
    });
});

/**
 * Bind server to port 3000 and listen
 */
server.listen(3000, function() {
    console.log('\033[96mServer is listening on *:3000\033[39m');
});

