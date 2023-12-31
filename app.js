const express = require('express')
const app = express()
const session = require('express-session');
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
const clientrouter = require('./routes/clientRoutes')
const adminrouter = require('./routes/adminRoutes')

app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
}));


 

mongoose.connect("mongodb://0.0.0.0/Mini-project")
.then(()=>{
    console.log('Database Connected');
})
.catch(()=>{
    console.log('Failed to connect');
})


app.use('/',clientrouter)
app.use('/',adminrouter)


app.listen(4000,()=>{
    console.log('Server is at port 4000');
})