require('dotenv').config()
const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const passportSetup = require('./passport')

app.use(cookieSession({
	name: "session",
	keys: ["pro"],
	maxAge: 24 * 60 * 60 * 100
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
	origin: "http://localhost:3000",
	methods: "GET,POST,PUT,DELETE",
	credentials: true
}))

app.use('/auth', require('./router/auth'))

app.listen(process.env.PORT || 5000, ()=>{
	console.log('app conneced')
})