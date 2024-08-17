// // console.log("hello from server");
// // console.log("hello again");

// //set timeout is a pre defined function in js

// console.log("1")
// setTimeout(()=>{
//     console.log("2")
// },1000)
// console.log("3")

// setInterval(()=>{
//         console.log(" isha bera")
//     },1000)


// const http=require('http')
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end("ashik")
// }).listen(8080)



const http=require('http')
const path=require('path')
const dotEnv=require('dotenv');
var bodyParser = require('body-parser')



dotEnv.config();
// const PORT=process.env.PORT
const express= require('express');
const arr=[]
let app=express();
app.use(bodyParser.json())
const router = require('./routes/api-route.js');
require('./config/database')();


// app.use(express.static('public'))
app.use(express.static(path.join(__dirname,"Public")))

app.use('/api',router.route);

// app.get('/user',function (req,res){
//     res.send({

//         Data:[
            
//                { name:"Tosif"},
//                 {Sub:"Greadution"}
//         ],

//         Status:"success"
        
//     })
// })



const server=http.createServer(app);

server.listen(process.env.PORT,function (err) {
    if(err) throw err;
    console.log(`server is running on port ${process.env.PORT}`)
})
// server.listen(PORT,console.log(`SERVER running om ${PORT}`))
