require('dotenv').config();
const cookieParser = require('cookie-parser');
var logwrite = require('logwrite');
var express = require('express');
var mysql = require('mysql');
const { CLIENT_MULTI_RESULTS } = require('mysql/lib/protocol/constants/client');
var app = express();

let winningToken = 'winningcookie';

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

app.get('/', function (req, res) {
    logwrite.go(`[0]: Get request recieved at '/'`);

    var today = new Date();
    var date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
    var time = today.getHours() + "." + today.getMinutes() + "." + today.getSeconds();
    var dateTime = date + '-' + time;

    if (req.cookies.CookieToken) {
        logwrite.go('[/] [' + req.cookies.CookieToken + ']: Cookie Detected');
    } else {
        logwrite.go('[/]: Cookie Not Detected - Generating Cookie');
        res.cookie(`CookieToken`, `${Math.floor(Math.random() * 999)}${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]}-${dateTime}`, {
            expires: new Date('05 25 2022')
        });
    }

    res.sendFile('public/home.html', { root: __dirname });
})
app.get('/view', function (req, res) {
    logwrite.go(`[0.3]: Get request recieved at '/view'`);
    res.sendFile('public/view.html', { root: __dirname });
})

app.get('/getId', function (req, res) {
    logwrite.go(`[0.2]: Get request recieved at '/getId'`);
    connection.query("SELECT ID FROM " + process.env.DATABASE + ".machinestatus", function (err, result, field) {
        let responseString = '';
        for (let i = 0; i < result.length; i++) {
            responseString += result[i].ID + ':';
        }
        res.send(responseString);
    })
})

app.get('/win', function (req, res) {
    if (winningToken === req.cookies.CookieToken) {
        res.send(`Congrats you win! Email LaundryLott@gmail.com with the verification code: "${process.env.WINCODE}" to claim your prize!`)
    } else {
    }
})

app.get('/loadView', function (req, res) {
    logwrite.go(`[0.1]: Get request recieved at '/loadView'`);

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
        logwrite.go(`[1]: Post request recieved at '/start' (${body})`);

        let machineId = body;
        body = JSON.stringify((req.cookies.CookieToken)).replace(/['"]+/g, '');

        if (body) {
            // address acquired

            connection.query("SELECT identifier FROM " + process.env.DATABASE + ".userinfo WHERE identifier = '" + body + "'", function (err, result, field) {
                if (result.length === 0) {
                    // new user
                    logwrite.go('[1.1] [' + body + ']: New user detected');

                    var today = new Date();
                    var time = today.getHours() + ":" + today.getMinutes()

                    // creates account and sets startTime for new user
                    connection.query("INSERT INTO `" + process.env.DATABASE + "`.`userinfo` (`identifier`, `startTime`) VALUES ('" + body + "', '" + time + "');", function (err, result, field) {
                        if (!!err) {
                            logwrite.go('[1.2] [' + body + ']: Error creating account');
                            res.send('Sorry! there was an issue creating your account. Try reloading.');
                        } else {
                            logwrite.go('[1.2] [' + body + ']: Success creating account and setting time.');

                            // updates machine status to in use
                            connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'In Use' WHERE (`ID` = '" + machineId + "');", function (err, result, fields) {
                                if (!!err) {
                                    logwrite.go('[1.4] [' + body + ']: Error updating machine status');
                                } else {
                                    logwrite.go('[1.4] [' + body + ']: Successful updating machine status');
                                }
                            });
                            res.send('Great! Come back in 45-55 minutes to claim your ticket!');
                        }
                    })

                } else {
                    // existing user
                    logwrite.go('[1.1] [' + body + ']: Existing user detected');

                    // check if tickets < 4
                    connection.query("SELECT tickets FROM " + process.env.DATABASE + ".userinfo WHERE identifier = '" + body + "'", function (err, result, field) {
                        if (result[0].tickets === 0 || result[0].tickets === 1 || result[0].tickets === 2 || result[0].tickets === 3) {
                            // Tickets < 4

                            var today = new Date();
                            var time = today.getHours() + ":" + today.getMinutes()

                            // sets startTime for existing user
                            connection.query("UPDATE `" + process.env.DATABASE + "`.`userinfo` SET `startTime` = '" + time + "' WHERE (`identifier` = '" + body + "');", function (err, result, fields) {
                                if (!!err) {
                                    logwrite.go('[1.3] [' + body + ']: Error updating startTime');
                                    res.send('Sorry! There was a problem updating the time. Try restarting.');
                                } else {
                                    logwrite.go('[1.3] [' + body + ']: Successful updating startTime');

                                    // updates machine status to in use
                                    connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'In Use' WHERE (`ID` = '" + machineId + "');", function (err, result, fields) {
                                        if (!!err) {
                                            logwrite.go('[1.4] [' + body + ']: Error updating machine status');
                                        } else {
                                            logwrite.go('[1.4] [' + body + ']: Successful updating machine status');
                                        }
                                    });

                                    res.send('Great! Come back in 45-55 minutes to claim your ticket!');
                                }
                            });

                        } else {
                            //Tickets > 4
                            logwrite.go('[1.3] [' + body + ']: Tickets over 4')
                            res.send('Woah Woah! You already got 4 tickets this week. Come back next week for more!')
                        }
                    })

                }
            })

        } else {
            // address not acquired
            logwrite.go('[1.2] [' + body + ']: Start fields invalid');
            res.send('Sorry, there was a issue identifying you. Try reloading.');
        }

    })
})

app.post('/finish', (req, res) => {
    let body = ''; req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
        logwrite.go(`[2]: Post request recieved at '/start' (${body})`);

        let machineId = body;
        body = JSON.stringify((req.cookies.CookieToken)).replace(/['"]+/g, '');

        if (body) {
            // address acquired
            logwrite.go('[2] [' + body + ']: Cookie acquired')

            // user have account ?
            connection.query("SELECT identifier FROM " + process.env.DATABASE + ".userinfo WHERE identifier = '" + body + "'", function (err, result, field) {
                if (result.length === 0) {
                    // user not found
                    logwrite.go('[2.2] [' + body + ']: User not found in db');
                    res.send('Sorry! No user found! Try starting a load first!');
                } else {
                    // user found
                    logwrite.go('[2.2] [' + body + ']: User found in db');

                    // user have startTime ?
                    connection.query("SELECT startTime FROM " + process.env.DATABASE + ".userinfo WHERE identifier = '" + body + "'", function (err, result, field) {
                        if (result[0].startTime === null || result[0].startTime === '') {
                            // startTime not detected
                            logwrite.go('[2.3] [' + body + ']: startTime not found in db');
                            res.send('No start time found, try starting a load first!');
                        } else {
                            // startTime found
                            logwrite.go('[2.3] [' + body + ']: startTime found in db');

                            //verify if time is back in time
                            let finalMinutes;
                            var today = new Date();
                            var time = today.getHours() + ":" + today.getMinutes()

                            let timeArray1 = (result[0].startTime.toString()).split(":");
                            let timeArray2 = (time.toString()).split(":");

                            let startMinutes = (parseInt(timeArray1[0]) * 60) + (parseInt(timeArray1[1]));
                            let endMinutes = (parseInt(timeArray2[0]) * 60) + (parseInt(timeArray2[1]));

                            if (timeArray1 > timeArray2) {
                                finalMinutes = (1440 - startMinutes) + endMinutes
                            } else if (timeArray1 < timeArray2) {
                                finalMinutes = endMinutes - startMinutes
                            } else { finalMinutes = startMinutes - endMinutes }

                            if (finalMinutes >= 45 && finalMinutes <= 55) {
                                logwrite.go('[2.6] [' + body + ']: User checked in on time');
                                //made it on time
                                connection.query("UPDATE `" + process.env.DATABASE + "`.`userinfo` SET `tickets` = tickets + 1 WHERE (`identifier` = '" + body + "');", function (err, result, fields) {
                                    if (!!err) {
                                        logwrite.go('[2.4] [' + body + ']: Error adding to tickets');
                                    } else {
                                        logwrite.go('[2.4] [' + body + ']: Successful added ticket');
                                        // removing startTime
                                        connection.query("UPDATE `" + process.env.DATABASE + "`.`userinfo` SET `startTime` = '' WHERE (`identifier` = '" + body + "');", function (err, result, fields) {
                                            if (!!err) {
                                                logwrite.go('[2.4] [' + body + ']: Error removing startTime');
                                            } else {
                                                logwrite.go('[2.4] [' + body + ']: Successful remove startTime');
                                                // updates machine status to in use
                                                connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'Available' WHERE (`ID` = '" + machineId + "');", function (err, result, fields) {
                                                    if (!!err) {
                                                        logwrite.go('[2.5] [' + body + ']: Error updating machine status');
                                                    } else {
                                                        logwrite.go('[2.5] [' + body + ']: Successful updating machine status');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                                res.send("Amazing! Right on time! You've earned a ticket! Lets earn some more now");
                            } else if (finalMinutes > 55) {
                                // user is too late

                                // updates machine status to in use
                                connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'Available' WHERE (`ID` = '" + machineId + "');", function (err, result, fields) {
                                    if (!!err) {
                                        logwrite.go('[2.6] [' + body + ']: Error updating machine status');
                                    } else {
                                        logwrite.go('[2.6] [' + body + ']: Successful updating machine status');
                                    }
                                });
                                logwrite.go('[2.6] [' + body + ']: User checked in too late');
                                res.send('Sorry! Your too late! Come back for another load!');
                            } else if (finalMinutes < 45) {
                                // too early
                                logwrite.go('[2.6] [' + body + ']: User checked in too late');
                                res.send('Sorry! Your too early! Come back soon!');
                            }

                        }
                    })
                }
            })

        } else {
            // address not acquired
            logwrite.go('[2.1] [' + body + ']: Start fields invalid');
            res.send('Sorry, there was a issue identifying you. Try reloading.');
        }

    })
})

app.post('/report', (req, res) => {
    let body = ''; req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
        logwrite.go(`[3]: Post request recieved at '/report' (${body})`);

        connection.query("UPDATE `" + process.env.DATABASE + "`.`machinestatus` SET `Status` = 'Out of Order' WHERE (`ID` = '" + body + "');", function (err, result, fields) {
            if (!!err) {
                logwrite.go('[3.1]: Error updating machine status');
            } else {
                logwrite.go('[3.1]: Successful updating machine status');
                res.send('Thanks for reporting!');
            }
        });

    })
})

// Copyright (C) 2022  Adam T Spera
