const express = require('express');
const http = require('http')
const socket = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 3000;

app.get('/', (req:any, res:any) => res.json({hi: "!"}));

app.get('/getUserName/:id', (req:any, res:any) => {
    const id = Number(req.params.id)
    // console.log(`getUserName, id:${id}, Number(req.params.id):${Number(req.params.id)}`)
    if (Number.isNaN(id)) {
        res.status(400)
    } else {
        res.json({userName: getUserName(id)})
    }
})

io.on('connection', () => { 
    console.log(`cliet connection success!🤝`)
});

// app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
server.listen(port, () => {
    console.log(`Server running on ${port}, http://localhost:${port}`)
})

// В реальном приложении эти данные хранились бы в базе данных, а не в памяти.
// Но для этого демо-приложения мы будем хитрить!
// (Мне нужно захостить на vercel, там нет возможности запустить docker и субд)
const db = new Map();

function getUserName(id:number):string {
    if (db.has(id)) {
        return db.get(id).userName 
    } else {
        const x = ['красная', 'синяя', 'зелёная', 'белая', 'чёрная', 'оранжевая', 'золотая', 'голубая', 'жёлтая']
        const y = ['черепаха', 'обезьяна', 'собака', 'акула', 'рыба', 'панда', 'лама', 'змея']
        db.set(id, {userName: `${x[Math.floor(Math.random() * x.length)]} ${y[Math.floor(Math.random() * y.length)]}`})
        return db.get(id).userName
    }
}
