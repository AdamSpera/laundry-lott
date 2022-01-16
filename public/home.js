var machine = document.getElementById('machine');
var question = document.getElementById('question');
var btnStart = document.getElementById('btnStart');
var btnFinish = document.getElementById('btnFinish');
var btnView = document.getElementById('btnView');
var textDisplay = document.getElementById('textDisplay');
var circleText = document.getElementById('circleText');
var footerOne = document.getElementById('footerOne');
var footerTwo = document.getElementById('footerTwo');
var footerText = document.getElementById('footerText');
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
                            btnStart.style.color = 'black';
                            circleText.style.color = 'white';
                            footerDivScale.style.display = "block";
                            footerDivBlock.style.display = "none";
                        })

                    break;
                } else if (i == machineIds.length - 1) {
                    textDisplay.innerText = 'Enter a Machine ID above!';
                    btnStart.style.color = 'red';
                    circleText.style.color = 'red';
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
                            btnFinish.style.color = 'black';
                            circleText.style.color = 'white';
                            footerDivScale.style.display = "block";
                            footerDivBlock.style.display = "none";
                        })

                    break;
                } else if (i == machineIds.length - 1) {
                    textDisplay.innerText = 'Enter a Machine ID above!';
                    btnFinish.style.color = 'red';
                    circleText.style.color = 'red';
                }
            }
        })

});

footerOne.addEventListener('click', function () {

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
                            circleText.style.color = 'white';
                        })

                    break;
                } else if (i == machineIds.length - 1) {
                    textDisplay.innerText = 'Enter a Machine ID above!'; circleText.style.color = 'red';
                }
            }
            textDisplay.innerText = 'Enter a Machine ID above!';
            circleText.style.color = 'red';
        })

});

footerTwo.addEventListener('click', function () {

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
                            circleText.style.color = 'white';
                        })

                    break;
                } else if (i == machineIds.length - 1) {
                    textDisplay.innerText = 'Enter a Machine ID above!'; circleText.style.color = 'red';
                }
            }
            textDisplay.innerText = 'Enter a Machine ID above to report!';
            circleText.style.color = 'red';
        })

});

question.addEventListener('click', function () {
    location.replace('https://laundrylott.com/maps');
});

document.getElementById('btnView').addEventListener('click', function () { location.href = '/view' });

// Copyright (C) 2022  Adam T Spera
