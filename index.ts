const express = require('express');
const http = require('http')
const socket = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 3000;

app.get('/', (req:any, res:any) => res.json({hi: "!"}));

io.on('connection', () => { 
    console.log(`cliet connection success!🤝`)
});

// app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
server.listen(port, () => {
    console.log(`Server running on ${port}, http://localhost:${port}`)
})


