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

// use express,json()
app.use(express.json());
app.post('/', function(request, response){
    var data = request.body;
    var first_name = data.first_name;
    var last_name = data.last_name;
    var email = data.email;
    var papercut_num = data.papercut_num;
    var cost = data.cost;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    //var productType = data.productType;
    //var status = data.status; 
    var replyFull = first_name + "\n" + last_name + "\n" + email + "\n" + papercut_num + "\n" + cost + "\n" + today;
    console.log("\nJSON received\n");
    console.log(data);
    console.log("\n");
    response.send("\nPOST printing label...");
    fs.writeFile('label.txt', replyFull, function (err) {
        if (err) return console.log(err);
        console.log('POST Writing information to label.txt');
        console.log(replyFull);
        
    });
    //
    //run shell command 
    //if connected to printer, use the following command 
    //"cupsenable DYMO_LabelWriter_450_Turbo && lp label.txt"
    exec("lp label.txt", (error, stdout, stderr) => {
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
});

// Get request for pinging the Raspberry Pi 
app.get('/ping', valid);
function valid(request, response){
    response.send("My IP");
}


//routing for label printing 
app.get('/print/:first_name/:last_name/:email/:papercut_num/:cost/:productType/:status', printTest);
function printTest(request, response){
    var data = request.params;
    var first_name = data.first_name;
    var last_name = data.last_name;
    var email = data.email;
    var papercut_num = data.papercut_num;
    var cost = data.cost;
    var productType = data.productType;
    var status = data.status; 
    var reply = first_name + "\n" + last_name + "\n" + email + "\n" + papercut_num + "\n" + cost + "\n" + productType + "\n" + status;
    console.log(data);
    var replyFull = "First name: \t" + first_name + "\n" + "Last name: \t\t" + last_name + "\n" + "Email: \t\t\t" + email + "\n" + "Request Number: " + papercut_num + "\n" + "Cost: \t\t\t" + cost + "\n" + "Product Type: \t" + productType + "\n" + "Status: \t\t" + status;
    
    response.send(replyFull);
    //write text file with label info
    fs.writeFile('label.txt', replyFull, function (err) {
        if (err) return console.log(err);
        console.log('GET Writing information to label.txt');
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
