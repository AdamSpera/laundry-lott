var defaultImage = document.getElementById('defaultImage');
var machine = document.getElementById('machine');
var btnStart = document.getElementById('btnStart');
var btnFinish = document.getElementById('btnFinish');
var btnView = document.getElementById('btnView');
var textDisplay = document.getElementById('textDisplay');
var circleText = document.getElementById('circleText');
var footerOne = document.getElementById('footerOne');
var footerTwo = document.getElementById('footerTwo');
var footerText = document.getElementById('footerText');
var addiv = document.getElementById('addiv');
var footerDivScale = document.getElementById('footerDivScale');
var footerDivBlock = document.getElementById('footerDivBlock');

$(document).ready(function ($) {
    setTimeout(function () {
        $('.trans--grow').addClass('grow');
    }, 275);
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const machineId = urlParams.get('id');
document.getElementById('machine').value = machineId;

let randomNum = Math.floor(Math.random() * 2);
switch (randomNum) {
    case 0:
        document.getElementById('footerText').innerText = "Report out of order machines by clicking the logo!"
        break;
}

document.getElementById('btnStart').addEventListener('click', function () {

    fetch('/getId', { method: 'GET' })
        .then(response => response.text())
        .then(text => {

            let machineIds = text.split(':');
            machineIds.pop();

            for (let i = 0; i < machineIds.length; i++) {
                if (machineIds[i] == machine.value.toUpperCase()) {

                    fetch('/start', { method: 'POST', body: machine.value.toUpperCase() })
                        .then(response => response.text())
                        .then(text => {
                            textDisplay.innerText = text
                            btnStart.style.color = '#51A4FB';
                            btnFinish.style.color = '#51A4FB';
                        })

                    break;
                } else if (i == machineIds.length - 1) {
                    textDisplay.innerText = 'Enter a Machine ID above!';
                    btnStart.style.color = 'red';
                }
            }
        })

});

document.getElementById('btnFinish').addEventListener('click', function () {

    fetch('/getId', { method: 'GET' })
        .then(response => response.text())
        .then(text => {

            let machineIds = text.split(':');
            machineIds.pop();

            for (let i = 0; i < machineIds.length; i++) {
                if (machineIds[i] == machine.value.toUpperCase()) {

                    fetch('/finish', { method: 'POST', body: machine.value.toUpperCase() })
                        .then(response => response.text())
                        .then(text => {
                            textDisplay.innerText = text
                            btnStart.style.color = '#51A4FB';
                            btnFinish.style.color = '#51A4FB';
                        })

                    break;
                } else if (i == machineIds.length - 1) {
                    textDisplay.innerText = 'Enter a Machine ID above!';
                    btnFinish.style.color = 'red';
                }
            }
        })

});

footerTwo.addEventListener('click', function () { location.href = '/about' });

defaultImage.addEventListener('click', function () {

    fetch('/getId', { method: 'GET' })
        .then(response => response.text())
        .then(text => {

            let machineIds = text.split(':');
            machineIds.pop();

            for (let i = 0; i < machineIds.length; i++) {
                if (machineIds[i] == machine.value.toUpperCase()) {

                    fetch('/report', { method: 'POST', body: machine.value.toUpperCase() })
                        .then(response => response.text())
                        .then(text => {
                            textDisplay.innerText = text;
                        })

                    break;
                } else if (i == machineIds.length - 1) {
                    textDisplay.innerText = 'Enter a Machine ID above!';
                }
            }
            textDisplay.innerText = 'Enter a Machine ID above to report!';
        })

});

btnView.addEventListener('click', function () { location.href = '/view' });

// Copyright (C) 2022  Adam T Spera
