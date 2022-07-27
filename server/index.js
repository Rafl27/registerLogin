const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const { response } = require('express')
const app = express()

app.use(express.json())
app.use(cors())

const dataBase = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '1234',
    database: 'registerlogin'
})

app.post('/register', (request, response) => {

    const username = request.body.username
    const password = request.body.password

    dataBase.query('INSERT INTO registerlogin.users (username, password) VALUES (?, ?)', [username, password], (error, result) => {
        console.log(error)
    })
})

app.post('/login', (request, response) => {
    const username = request.body.username
    const password = request.body.password

    dataBase.query("SELECT * FROM registerlogin.users WHERE username = ? AND password = ?", [username, password], (error, result) => {
        if (error) {
            response.send({ error: error })
        }

        if (result.length > 0) {
            response.send(result) //result returns an array with whatever is found in the dataBase
        } else {
            response.send({ message: "Wrong username & Or password" })
        }
    })
})

app.get('/getallusers', (request, response) => {
    dataBase.query('SELECT * FROM registerlogin.users', (error, result) => {
        if(error) {
            response.send({error: error})
        }else {
            response.send(result)
        }
    })
})

app.delete('/deleteuser/:id', (request, response) => { //working

    const id = request.params.id;
    const sql = 'DELETE FROM registerlogin.users WHERE id = ?'

    dataBase.query(sql, [id], (error, result) => {
        if(error) {
            response.send({error : error})
        }else{
            response.send(result)
        }
    })

})

// app.post('/fixed', (request, response) => {
//     dataBase.query('INSERTO INTO users (username, password) VALUES ("Rafael", "123")', (error, result) => {
//         if(error) {
//             console.log(error)
//         }
//         response.send(result)
//     })
// })


app.get('/', (request, response) => {
    response.send('Hello my dude')
})

app.listen(3001, () => console.log('server running on port 3001'))