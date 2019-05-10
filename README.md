# Internet Relay Chat System

**Clone and run for a quick way to see irc via tcp in action.**

This is a minimal Nodejs application based on the TCP module within the Nodejs documentation.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/king-kloy/irc-tcp
# Go into the repository
cd irc-tcp
# To start the server
cd server/ 
node tcp-server.js
# To start the client app
cd client/
node tcp-client.js
# On the same host machine, you can open another terminal 
# Another can join the IRC, by simply
node tcp-client.js
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.