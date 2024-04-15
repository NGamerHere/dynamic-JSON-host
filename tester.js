const os = require('os');
const net = require('net');

// Get the network interfaces
const networkInterfaces = os.networkInterfaces();

// Find the IPv4 address
const addresses = [];
for (const key in networkInterfaces) {
    for (const interface of networkInterfaces[key]) {
        if (interface.family === 'IPv4' && !interface.internal) {
            addresses.push(interface.address);
        }
    }
}

// Print the IP address
console.log('IP Address:', addresses[0]); // Assuming you want the first IPv4 address
