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
    res.render('index')
})


const nexmo = new Nexmo({
    apiKey : '2545146d',
    apiSecret: 'LJu5dU3Uohwvs1ub'
}, {debug: true});


app.post('/' , (req,res)=>{

    // Add Value from Post Request To Variable 

    const number = req.body.number; 
    const message = req.body.text;


    nexmo.message.sendSms(
        '12345678901', number, message, {type: 'unicode'},
          (err, responseData) => {
              if(err){
                  console.log(err)
              }else {
                  console.dir("Check Terminal", responseData)
                  // Get Data From Response

                  const data = {
                      id: responseData.messages[0]['message-id'],
                      number: responseData.messages[0]['to'],
                      message
                  }

                  // Emit to the Client
                  io.emit('smsStatus', data)
              }
          }  
        )
})




const port = 3000;

const server = app.listen(port , () => {
  
    console.log("Server is Live on port 3000")
})


const io = socketio(server); 

io.on('connection' , (socket) => {
    console.log('Socket Io Connected');
    io.on('disconnect' , ()=> {
        console.log("Disconnected")
    })
})