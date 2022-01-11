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

        let id = machine.value.toUpperCase();
        if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
            || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

            fetch('/start', { method: 'POST', body: id + data.ip })
                .then(response => response.text())
                .then(text => { textDisplay.innerText = text })

        } else { textDisplay.innerText = 'Enter a Machine Id above!' }

    });

});

btnFinish.addEventListener('click', function () {

    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {

        let id = machine.value.toUpperCase();
        if (id.length === 1 && (id === 'A' || id === 'B' || id === 'C' || id === 'D' || id === 'E'
            || id === 'F' || id === 'G' || id === 'H' || id === 'I' || id === 'J')) {

            fetch('/finish', { method: 'POST', body: id + data.ip })
                .then(response => response.text())
                .then(text => { textDisplay.innerText = text })

        } else { textDisplay.innerText = 'Enter a Machine Id above!' }

    });

});

btnView.addEventListener('click', function () { location.href = '/view' });
