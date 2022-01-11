var machineId = document.getElementById('machineId');
var btnStart = document.getElementById('btnStart');
var btnFinish = document.getElementById('btnFinish');
var btnView = document.getElementById('btnView');
var changeMe = document.getElementById('changeMe');

btnStart.addEventListener('click', function () {

    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
        fetch('/start', { method: 'POST', body: machineId.value + data.ip })
            .then(response => response.text())
            .then(text => { changeMe.innerText = text })
    });

});

btnFinish.addEventListener('click', function () {

    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
        fetch('/finish', { method: 'POST', body: machineId.value + data.ip })
            .then(response => response.text())
            .then(text => { changeMe.innerText = text })
    });

});

btnView.addEventListener('click', function() { location.href = '/view' });
