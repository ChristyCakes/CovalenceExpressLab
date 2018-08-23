const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let app = express();

// app.get('/', (req, res) => {                
//     res.send('Hello from the web server side ...');           
// })

app.use((req, res, next) => {           
    console.log(req.originalUrl);       
    next();                             
}) 

app.use(bodyParser.urlencoded({extended: false}))

app.post('/contact-form', (req, res) => {              
    console.log(req.body.email);                
    console.log(req.body.name);
    res.send("Registration Complete")  
})   

app.use(express.static(path.join(__dirname, '../public')))

app.listen(3000);