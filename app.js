require('dotenv').config();
const cookieParser = require('cookie-parser');
var logwrite = require('logwrite');
var express = require('express');
var mysql = require('mysql');
const res = require('express/lib/response');
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

    connection.query("SELECT Date FROM " + process.env.DATABASE + ".sitedata", function (error, result, field) {
        if (!!error) {
            console.log(`Error selecting date`);
        } else {

            let exist = false;
            // for every date result
            for (i = 0; i < result.length; i++) {
                // checks if date already exists
                if (result[i].Date == date) {
                    exist = true; break;
                }
            }

            if (exist) {
                // date already in database
                connection.query("UPDATE `" + process.env.DATABASE + "`.`sitedata` SET `" + type + "` = " + type + " + 1 WHERE Date = '" + date + "'", function (error, result, fields) {
                    if (!!error) {
                        console.log(`Error updating ${type} where date equals ${date}`);
                    } else {
                        console.log(`Successfully updated ${type} where date equals ${date}`);
                    }
                });
            } else {
                // date not in database
                connection.query("INSERT INTO `" + process.env.DATABASE + "`.`sitedata` (`Date`) VALUES ('" + date + "');", function (error, result, field) {
                    if (!!error) {
                        console.log(`Error inserting new date ${date}`);
                    } else {
                        console.log(`Successfully inserted new date ${date}`);
                        updateData(type);
                    }
                });
            }
        }
    });
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
