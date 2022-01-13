var machine = document.getElementById('machine');
var btnStart = document.getElementById('btnStart');
var btnFinish = document.getElementById('btnFinish');
var btnView = document.getElementById('btnView');
var textDisplay = document.getElementById('textDisplay');
var circleText = document.getElementById('circleText');
var footer = document.getElementById('footer');
var footerText = document.getElementById('footerText');

$(document).ready(function ($) {
    setTimeout(function () {
        $('.trans--grow').addClass('grow');
    }, 275);
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const machineId = urlParams.get('id');
document.getElementById('machine').value = machineId;

fetch('/win', { method: 'GET' })
    .then(response => response.text())
    .then(text => { textDisplay.innerText = text })

let randomNum = Math.floor(Math.random() * 5);
switch (randomNum) {
    case 0:
        document.getElementById('footerText').innerText = 'Report out of order machines by clicking here!'
        break;
    case 1:
        document.getElementById('footerText').innerText = "Check in on Mondays to see if you've won!"
        break;
    case 2:
        document.getElementById('footerText').innerText = "Accounts are cookies, no personal info needed!"
        break;
}

document.getElementById('btnStart').addEventListener('click', function () {

    let id = machine.value.toUpperCase();
    if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
        || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

        btnStart.style.color = 'black';
        circleText.style.color = 'white';

        fetch('/start', { method: 'POST', body: id })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })

    } else { textDisplay.innerText = 'Enter a Machine ID above!'; btnStart.style.color = 'red'; circleText.style.color = 'red'; }

});

document.getElementById('btnFinish').addEventListener('click', function () {

    let id = machine.value.toUpperCase();
    if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
        || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

        btnFinish.style.color = 'black';
        circleText.style.color = 'white';

        fetch('/finish', { method: 'POST', body: id })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })

    } else { textDisplay.innerText = 'Enter a Machine ID above!'; btnFinish.style.color = 'red'; circleText.style.color = 'red'; }

});

footer.addEventListener('click', function () {

    let id = machine.value.toUpperCase();
    if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
        || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

        fetch('/report', { method: 'POST', body: id })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })

    } else { textDisplay.innerText = 'Enter a Machine ID above!'; circleText.style.color = 'red';}

});

document.getElementById('btnView').addEventListener('click', function () { location.href = '/view' });

// Copyright (C) 2022  Adam T Spera
