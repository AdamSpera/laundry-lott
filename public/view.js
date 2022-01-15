var home = document.getElementById('home')
var list = document.getElementById('list');
var drop = document.getElementById('drop');
var footerDivScale = document.getElementById('footerDivScale');
var footerDivBlock = document.getElementById('footerDivBlock');

fetch('/loadView', { method: 'GET' })
    .then(response => response.text())
    .then(text => {

        let allArray = (text.split('|'));
        let machineIdsTemp = allArray[0];
        let machineStatusTemp = allArray[1];
        let machineIds = machineIdsTemp.split(':');
        let machineStatus = machineStatusTemp.split(':');
        let inputText = '';

        $("#drop").on('change', function () {

            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }

            footerDivScale.style.display="block";
            footerDivBlock.style.display="none";

            if ($("#drop").val() == "heinz") {
                for (let i = 0; i < machineIds.length; i++) {
                    if ((machineIds[i])[0] === "H") {
                        if ((machineIds[i])[1] === 'W') {
                            inputText = `Washer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if ((machineIds[i])[1] === 'D') {
                            inputText = `Dryer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if (machineStatus[i] === 'Available') {
                            entry.classList.add('textA');
                        } else if ((machineStatus[i] === 'Out of Order')) {
                            entry.classList.add('textO');
                        }
                        entry.classList.add('textDisplay')
                    }
                }
            } // if heinz

            if ($("#drop").val() == "knight") {
                for (let i = 0; i < machineIds.length; i++) {
                    if ((machineIds[i])[0] === "K") {
                        if ((machineIds[i])[1] === 'W') {
                            inputText = `Washer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if ((machineIds[i])[1] === 'D') {
                            inputText = `Dryer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if (machineStatus[i] === 'Available') {
                            entry.classList.add('textA');
                        } else if ((machineStatus[i] === 'Out of Order')) {
                            entry.classList.add('textO');
                        }
                        entry.classList.add('textDisplay')
                    }
                }
            } // if knight

            if ($("#drop").val() == "thomas") {
                for (let i = 0; i < machineIds.length; i++) {
                    if ((machineIds[i])[0] === "T") {
                        if ((machineIds[i])[1] === 'W') {
                            inputText = `Washer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if ((machineIds[i])[1] === 'D') {
                            inputText = `Dryer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if (machineStatus[i] === 'Available') {
                            entry.classList.add('textA');
                        } else if ((machineStatus[i] === 'Out of Order')) {
                            entry.classList.add('textO');
                        }
                        entry.classList.add('textDisplay')
                    }
                }
            } // if thomas

            if ($("#drop").val() == "kisler") {
                for (let i = 0; i < machineIds.length; i++) {
                    if ((machineIds[i])[0] === "I") {
                        if ((machineIds[i])[1] === 'W') {
                            inputText = `Washer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if ((machineIds[i])[1] === 'D') {
                            inputText = `Dryer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if (machineStatus[i] === 'Available') {
                            entry.classList.add('textA');
                        } else if ((machineStatus[i] === 'Out of Order')) {
                            entry.classList.add('textO');
                        }
                        entry.classList.add('textDisplay')
                    }
                }
            } // if kisler

            if ($("#drop").val() == "dilworth") {
                for (let i = 0; i < machineIds.length; i++) {
                    if ((machineIds[i])[0] === "D") {
                        if ((machineIds[i])[1] === 'W') {
                            inputText = `Washer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if ((machineIds[i])[1] === 'D') {
                            inputText = `Dryer ${(machineIds[i])[2]}: ${machineStatus[i]}`

                            var entry = document.createElement('li');
                            entry.appendChild(document.createTextNode(inputText));
                            list.appendChild(entry);

                        }
                        if (machineStatus[i] === 'Available') {
                            entry.classList.add('textA');
                        } else if ((machineStatus[i] === 'Out of Order')) {
                            entry.classList.add('textO');
                        }
                        entry.classList.add('textDisplay')
                    }
                }
            } // if dilworth

        }); // on drop down change

    })

home.addEventListener('click', function () { location.href = '/' });

// Copyright (C) 2022  Adam T Spera
