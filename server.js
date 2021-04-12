require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const port = process.env.port || 3300
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const { MongoStore } = require('connect-mongo')
const MongoDbStore = require('connect-mongo')(session)

// Database connection

const url = 'mongodb+srv://Argha08:argha@1997@food.b9qox.mongodb.net/test?authSource=admin&replicaSet=atlas-ie7zmi-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true/food';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});
//Session store

let mongoStore = new MongoDbStore({
                 mongooseConnection: connection,
                collection: 'sessions'
})

//Session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24} //24 hours
    //cookie: { maxAge: 1000*15}
}))

app.use(flash())

// Assets
app.use(express.static('public'))
app.use(express.json())

// Global middleware

app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

// set Template engine

app.use(expressLayout)
app.set('views',path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app)

/*app.get('/', (req,res) => {
    res.render('home')
}) 

app.get('/cart',(req, res) => {
    res.render('customers/cart')
})

app.get('/login',(req, res) => {
    res.render('auth/login')
})

app.get('/register',(req, res) => {
    res.render('auth/register')
}) */
  

app.listen(port , () => {
    console.log(`Listening on port ${port}`)
})
