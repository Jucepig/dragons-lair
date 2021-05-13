require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')

const app = express()

app.use(express.json())

const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  console.log('Database Connected')
  app.set('db', db)
  app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT} you better go catch it...`))
})

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)

//LOGIN ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)