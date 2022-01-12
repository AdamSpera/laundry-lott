var machine = document.getElementById('machine');
var btnStart = document.getElementById('btnStart');
var btnFinish = document.getElementById('btnFinish');
var btnView = document.getElementById('btnView');
var textDisplay = document.getElementById('textDisplay');
var footer = document.getElementById('footer');

$(document).ready(function ($) {
    setTimeout(function () {
        $('.trans--grow').addClass('grow');
    }, 275);
});

if ((Math.floor(Math.random() * 100) + 1) < 15) {
    textDisplay.innerText = 'Remember to report broken machines by clicking on the footer!';
}

document.getElementById('btnStart').addEventListener('click', function () {

    let id = machine.value.toUpperCase();
    if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
        || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

        fetch('/start', { method: 'POST', body: id })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })

    } else { textDisplay.innerText = 'Enter a Machine ID above!'; textDisplay.style.color="red" }

});

document.getElementById('btnFinish').addEventListener('click', function () {

    let id = machine.value.toUpperCase();
    if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
        || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

        fetch('/finish', { method: 'POST', body: id })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })

    } else { textDisplay.innerText = 'Enter a Machine ID above!' }

});

footer.addEventListener('click', function () {

    let id = machine.value.toUpperCase();
    if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
        || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

        fetch('/report', { method: 'POST', body: id })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })

    } else { textDisplay.innerText = 'Enter a Machine ID above!' }

});

document.getElementById('btnView').addEventListener('click', function () { location.href = '/view' });