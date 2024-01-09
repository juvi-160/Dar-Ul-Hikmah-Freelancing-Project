const express = require('express');
const mongoose = require('mongoose');


const app = express()

const recourcesRoutes = require('./routes/resources')
const coursesRoutes = require('./routes/courses')
const publicationsRoutes = require('./routes/publications')

mongoose.connect('mongodb://127.0.0.1:27017/test');

const db= mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs'); 

app.use('/resources', recourcesRoutes)
app.use('/courses', coursesRoutes)
app.use('/publications', publicationsRoutes)

app.get('/',(req,res) => {
    res.render('home')
})


app.listen(3000,() => {
    console.log("Server is running on port 3000")
})