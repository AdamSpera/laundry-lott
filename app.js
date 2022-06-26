var express = require('express');

app.use(express.static('public'));
app.listen(80, '0.0.0.0', function () {
    console.log('Server is listening on port 80');
})

app.get('/', function (req, res) {
    console.log(`[0]: Get request received at '/'`);
    res.sendFile('public/home.html', { root: __dirname });
})

// Copyright (C) 2022  Adam T Spera
