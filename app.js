require('dotenv').config();
const cookieParser = require('cookie-parser');
var logwrite = require('logwrite');
var express = require('express');
var mysql = require('mysql');
var app = express();

app.use(cookieParser());

app.use(express.static('public'));
var server = app.listen(80, '0.0.0.0', function () {
    logwrite.go('Server is listening on port 80');
})

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MYSQLUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(function (error) {
    if (!!error) {
        logwrite.go(error);
    } else {
        logwrite.go('Database Connected');
    }
})

var updateData = (type) => {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // gets most recent date
    connection.query("SELECT Date FROM " + process.env.DATABASE + ".sitedata", function (err, result, field) {
        if (!!err) {
            logwrite.go('[US]: Error selecting Date');
        } else {
            // logwrite.go('[US]: Success selecting Date');

            if (result[result.length - 1].Date == date) {
                // logwrite.go('[US]: Same date detected updating');

                // updates the current day
                connection.query("UPDATE `" + process.env.DATABASE + "`.`sitedata` SET `" + type + "` = " + type + " + 1 WHERE Date = '" + date + "'", function (err, result, fields) {
                    if (!!err) {
                        logwrite.go('[hV]: Error adding to ' + type + '');
                    } else {
                        // logwrite.go('[hV]: Successfully added '+type+'');
                    }
                });

            } else {
                logwrite.go('[US]: Different day detected setting');

                // sets a new day
                connection.query("INSERT INTO `" + process.env.DATABASE + "`.`sitedata` (`Date`) VALUES ('" + date + "');", function (err, result, field) {
                    if (!!err) {
                        logwrite.go('[hV]: Error setting new Date');
                    } else {
                        // logwrite.go('[hV]: Success setting new Date');

                        // runs function again with new day
                        updateData(type);
                    }
                });
            }
        }
    })
}

app.get('/', function (req, res) {
    logwrite.go(`[0]: Get request received at '/'`);
    updateData('homeVisits');
    res.sendFile('public/home.html', { root: __dirname });
})
app.get('/view', function (req, res) {
    logwrite.go(`[0.3]: Get request received at '/view'`);
    updateData('viewVisits');
    res.sendFile('public/view.html', { root: __dirname });
})
app.get('/about', function (req, res) {
    logwrite.go(`[0.5]: Get request received at '/about'`);
    updateData('aboutVisits');
    res.sendFile('public/about.html', { root: __dirname });
})

app.get('/getId', function (req, res) {
    logwrite.go(`[0.2]: Get request received at '/getId'`);
    connection.query("SELECT ID FROM " + process.env.DATABASE + ".machinestatus", function (err, result, field) {
        let responseString = '';
        for (let i = 0; i < result.length; i++) {
            responseString += result[i].ID + ':';
        }
        res.send(responseString);
    })
})

app.get('/loadView', function (req, res) {
    logwrite.go(`[0.1]: Get request received at '/loadView'`);

    let machineIds = '';
    let machineStatus = '';
    connection.query('SELECT * FROM `' + process.env.DATABASE + '`.`machinestatus`', function (err, result, fields) {
        for (let i = 0; i < result.length; i++) {
            machineIds += result[i].ID + ':';
            machineStatus += result[i].Status + ':';
        }
        res.send(machineIds + '|' + machineStatus)
    })

})

app.post('/start', (req, res) => {
    let body = ''; req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
        logwrite.go(`[1]: Post request received at '/start' (${body})`);
        updateData('startTimes');

        if (body) {

            let machineId = body;

            connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'In Use' WHERE (`ID` = '" + machineId + "');", function (err, result, fields) {
                if (!!err) {
                    logwrite.go('[1.4] [' + body + ']: Error updating machine status');
                } else {
                    logwrite.go('[1.4] [' + body + ']: Successful updating machine status');
                }
            });

            res.send('Start Confirmed!');

        } else {
            // address not acquired
            logwrite.go('[1.2] [' + body + ']: Start fields invalid');
            res.send('Start Update Failed');
        }

    })
})

app.post('/finish', (req, res) => {
    let body = ''; req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
        logwrite.go(`[2]: Post request received at '/start' (${body})`);
        updateData('finishTimes');

        if (body) {
            let machineId = body;

            connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'Available' WHERE (`ID` = '" + machineId + "');", function (err, result, fields) {
                if (!!err) {
                    logwrite.go('[2.5] [' + body + ']: Error updating machine status');
                } else {
                    logwrite.go('[2.5] [' + body + ']: Successful updating machine status');
                }
            });
            
            res.send("Finish Confirmed!");
        } else {
            res.send("Finish Update Failed");
        }

    })
})

app.post('/report', (req, res) => {
    let body = ''; req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
        logwrite.go(`[3]: Post request received at '/report' (${body})`);
        updateData('reportTimes');

        connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'Out of Order' WHERE (`ID` = '" + body + "');", function (err, result, fields) {
            if (!!err) {
                logwrite.go('[3.1]: Error updating machine status');
                res.send('Report Log Failed');
            } else {
                logwrite.go('[3.1]: Successful updating machine status');
                res.send('Report Logged!');
            }
        });

    })
})

// Copyright (C) 2022  Adam T Spera
