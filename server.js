//require modules 
const express = require('express');
const logger = require("morgan");
const { exec } = require('child_process');
fs = require('fs');

//makes an express app  
const app = express();

// open port 3000 for a server 
const server = app.listen(3000, listening);

//print listening when port is opened 
function listening(){
    console.log("listening...");
}

// use Morgan to log requests
app.use(logger("short"));

//routing for label printing 
app.get('/print/:firstName/:lastName/:email/:requestNumber/:cost/:productType/:status', printTest);
function printTest(request, response){
    var data = request.params;
    var firstName = data.firstName;
    var lastName = data.lastName;
    var email = data.email;
    var requestNumber = data.requestNumber;
    var cost = data.cost;
    var productType = data.productType;
    var status = data.status; 
    var reply = firstName + "\n" + lastName + "\n" + email + "\n" + requestNumber + "\n" + cost + "\n" + productType + "\n" + status;
    var replyFull = "First name: \t" + firstName + "\n" + "Last name: \t\t" + lastName + "\n" + "Email: \t\t\t" + email + "\n" + "Request Number: " + requestNumber + "\n" + "Cost: \t\t\t" + cost + "\n" + "Product Type: \t" + productType + "\n" + "Status: \t\t" + status;
    response.send(replyFull);
    //write text file with label info
    fs.writeFile('label.txt', replyFull, function (err) {
        if (err) return console.log(err);
        console.log('Information > label.txt');
      });
    console.log("printing...");
    //
    //run shell command 
    //if connected to printer, use command 
    //"cupsenable DYMO_LabelWriter_450_Turbo && lp label.txt"
    exec("echo successful execution in shell", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    //console.log("success");
}
/*
app.get('/changeFirst/:first', printTest);
function printTest(request, response){
    var data = request.params;
    var first = data.first;
    var cost = data.cost;
    var reply = first+" "+cost
    response.send(reply);
    console.log("printing...");
}*/