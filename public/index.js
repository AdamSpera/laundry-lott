var machine = document.getElementById('machine');
var btnStart = document.getElementById('btnStart');
var btnFinish = document.getElementById('btnFinish');
var btnView = document.getElementById('btnView');
var textDisplay = document.getElementById('textDisplay');

$(document).ready(function ($) {
    setTimeout(function () {
        $('.trans--grow').addClass('grow');
    }, 275);
});

btnStart.addEventListener('click', function () {

    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
        fetch('/start', { method: 'POST', body: machine.value + data.ip })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })
    });

});

btnFinish.addEventListener('click', function () {

    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
        fetch('/finish', { method: 'POST', body: machine.value + data.ip })
            .then(response => response.text())
            .then(text => { textDisplay.innerText = text })
    });

});

btnView.addEventListener('click', function () { location.href = '/view' });
