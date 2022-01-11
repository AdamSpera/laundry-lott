var home = document.getElementById('home')
var machines = [
    document.getElementById('machineA'), 
    document.getElementById('machineB'),
    document.getElementById('machineC'),
    document.getElementById('machineD'),
    document.getElementById('machineE'),
    document.getElementById('machineF'),
    document.getElementById('machineG'),
    document.getElementById('machineH'),
    document.getElementById('machineI'),
    document.getElementById('machineJ')
];

fetch('/loadView', { method: 'GET' })
.then(response => response.text())
.then(text => { 

    let viewData = [];
    let IDs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '0') {
            viewData.push('Available');
        } else if (text[i] === '1') {
            viewData.push('In Use');
        } else if (text[i] === '2') {
            viewData.push('Out of Order');
        }
        machines[i].innerText = `${IDs[i]}: ${viewData[i]}`;

        if (machines[i].innerText === `${IDs[i]}: Available`) {
            machines[i].style.fontWeight = "800";
        } else if (machines[i].innerText === `${IDs[i]}: Out of Order`) {
            machines[i].style.color = "#dac777";
        } else if (machines[i].innerText === `${IDs[i]}: In Use`) {
            machines[i].style.fontWeight = "500";
        }

    }


})

home.addEventListener('click', function () { location.href = '/' });
