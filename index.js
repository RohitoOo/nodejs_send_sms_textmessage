const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const Nexmo = require('nexmo');

const socketio = require('socket.io');
const app = express();

// Template Engine Setup 
app.set('view engine' , 'html')
app.engine('html' , ejs.renderFile)


// Body Parer MiddleWare

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Public Folder Setup
app.use(express.static(__dirname + '/public'))


app.get('/' , (req,res)=> {
    res.render('test')
})


const port = 3000;

const server = app.listen(port , () => {
  
    console.log("Server is Live on port 3000")
})
