const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// write form submissions in this file
let filePath = path.join(__dirname, './formsubmissions.json');

let app = express();

// responde with simple text on root
// app.get('/', (req, res) => {                
//     res.send('Hello from the web server side ...');           
// })


// log url of each root request
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})

// use body-parser for form
app.use(bodyParser.urlencoded({ extended: false }));

// write form submissions to json file when posted; responde with simple text
app.post('/contact-form', (req, res, next) => {
    fs.appendFileSync(filePath, `{"name": "${req.body.name}", "email": "${req.body.email}"}\n`);
    res.send("Registration Complete");
    next();
})

// send contents of form submissions json file
app.get('/formsubmissions', (req, res, next) => {
    res.sendFile(filePath, err => console.log(err))
    next();
})

// serve up html & css files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);