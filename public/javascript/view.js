var defaultImage = document.getElementById('defaultImage');
var home = document.getElementById('home');
var list = document.getElementById('list');
var drop = document.getElementById('drop');
var keyDiv = document.getElementById('keyDiv');
var heinzDiv = document.getElementById('heinzDiv');
var knightDiv = document.getElementById('knightDiv');
var footerOne = document.getElementById('footerOne');
var footerTwo = document.getElementById('footerTwo');
var HWA = document.getElementById('HWA');
var HWB = document.getElementById('HWB');
var HWC = document.getElementById('HWC');
var HWD = document.getElementById('HWD');
var HWE = document.getElementById('HWE');
var HWF = document.getElementById('HWF');
var HDA = document.getElementById('HDA');
var HDB = document.getElementById('HDB');
var HDC = document.getElementById('HDC');
var HDD = document.getElementById('HDD');
var HDE = document.getElementById('HDE');
var HDF = document.getElementById('HDF');
var KWA = document.getElementById('KWA');
var KWB = document.getElementById('KWB');
var KWC = document.getElementById('KWC');
var KWD = document.getElementById('KWD');
var KWE = document.getElementById('KWE');
var KWF = document.getElementById('KWF');
var KDA = document.getElementById('KDA');
var KDB = document.getElementById('KDB');
var KDC = document.getElementById('KDC');
var KDD = document.getElementById('KDD');
var KDE = document.getElementById('KDE');
var KDF = document.getElementById('KDF');

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

            keyDiv.style.display = 'block';
            footerOne.style.display = 'none';
            footerTwo.style.display = 'block';

            if ($("#drop").val() == "heinz") {
                heinzDiv.style.display = 'block';
                knightDiv.style.display = 'none';

                // HDA
                if (machineStatus[0] == 'Available') {
                    HDA.style.backgroundColor = 'rgb(0, 156, 0)';
                    HDA.style.color = 'white';
                } else if (machineStatus[0] == 'In Use') {
                    HDA.style.backgroundColor = 'rgb(230, 176, 2)';
                    HDA.style.color = 'white';
                } else {
                    HDA.style.backgroundColor = 'rgb(107, 107, 107)';
                    HDA.style.color = 'white';
                }

                // HDB
                if (machineStatus[1] == 'Available') {
                    HDB.style.backgroundColor = 'rgb(0, 156, 0)';
                    HDB.style.color = 'white';
                } else if (machineStatus[1] == 'In Use') {
                    HDB.style.backgroundColor = 'rgb(230, 176, 2)';
                    HDB.style.color = 'white';
                } else {
                    HDB.style.backgroundColor = 'rgb(107, 107, 107)';
                    HDB.style.color = 'white';
                }

                // HDC
                if (machineStatus[2] == 'Available') {
                    HDC.style.backgroundColor = 'rgb(0, 156, 0)';
                    HDC.style.color = 'white';
                } else if (machineStatus[2] == 'In Use') {
                    HDC.style.backgroundColor = 'rgb(230, 176, 2)';
                    HDC.style.color = 'white';
                } else {
                    HDC.style.backgroundColor = 'rgb(107, 107, 107)';
                    HDC.style.color = 'white';
                }

                // HDD
                if (machineStatus[3] == 'Available') {
                    HDD.style.backgroundColor = 'rgb(0, 156, 0)';
                    HDD.style.color = 'white';
                } else if (machineStatus[3] == 'In Use') {
                    HDD.style.backgroundColor = 'rgb(230, 176, 2)';
                    HDD.style.color = 'white';
                } else {
                    HDD.style.backgroundColor = 'rgb(107, 107, 107)';
                    HDD.style.color = 'white';
                }

                // HDE
                if (machineStatus[4] == 'Available') {
                    HDE.style.backgroundColor = 'rgb(0, 156, 0)';
                    HDE.style.color = 'white';
                } else if (machineStatus[4] == 'In Use') {
                    HDE.style.backgroundColor = 'rgb(230, 176, 2)';
                    HDE.style.color = 'white';
                } else {
                    HDE.style.backgroundColor = 'rgb(107, 107, 107)';
                    HDE.style.color = 'white';
                }

                // HDF
                if (machineStatus[5] == 'Available') {
                    HDF.style.backgroundColor = 'rgb(0, 156, 0)';
                    HDF.style.color = 'white';
                } else if (machineStatus[5] == 'In Use') {
                    HDF.style.backgroundColor = 'rgb(230, 176, 2)';
                    HDF.style.color = 'white';
                } else {
                    HDF.style.backgroundColor = 'rgb(107, 107, 107)';
                    HDF.style.color = 'white';
                }

                // HWA
                if (machineStatus[6] == 'Available') {
                    HWA.style.backgroundColor = 'rgb(0, 156, 0)';
                    HWA.style.color = 'white';
                } else if (machineStatus[6] == 'In Use') {
                    HWA.style.backgroundColor = 'rgb(230, 176, 2)';
                    HWA.style.color = 'white';
                } else {
                    HWA.style.backgroundColor = 'rgb(107, 107, 107)';
                    HWA.style.color = 'white';
                }

                // HWB
                if (machineStatus[7] == 'Available') {
                    HWB.style.backgroundColor = 'rgb(0, 156, 0)';
                    HWB.style.color = 'white';
                } else if (machineStatus[7] == 'In Use') {
                    HWB.style.backgroundColor = 'rgb(230, 176, 2)';
                    HWB.style.color = 'white';
                } else {
                    HWB.style.backgroundColor = 'rgb(107, 107, 107)';
                    HWB.style.color = 'white';
                }

                // HWC
                if (machineStatus[8] == 'Available') {
                    HWC.style.backgroundColor = 'rgb(0, 156, 0)';
                    HWC.style.color = 'white';
                } else if (machineStatus[8] == 'In Use') {
                    HWC.style.backgroundColor = 'rgb(230, 176, 2)';
                    HWC.style.color = 'white';
                } else {
                    HWC.style.backgroundColor = 'rgb(107, 107, 107)';
                    HWC.style.color = 'white';
                }

                // HWD
                if (machineStatus[9] == 'Available') {
                    HWD.style.backgroundColor = 'rgb(0, 156, 0)';
                    HWD.style.color = 'white';
                } else if (machineStatus[9] == 'In Use') {
                    HWD.style.backgroundColor = 'rgb(230, 176, 2)';
                    HWD.style.color = 'white';
                } else {
                    HWD.style.backgroundColor = 'rgb(107, 107, 107)';
                    HWD.style.color = 'white';
                }

                // HWE
                if (machineStatus[10] == 'Available') {
                    HWE.style.backgroundColor = 'rgb(0, 156, 0)';
                    HWE.style.color = 'white';
                } else if (machineStatus[10] == 'In Use') {
                    HWE.style.backgroundColor = 'rgb(230, 176, 2)';
                    HWE.style.color = 'white';
                } else {
                    HWE.style.backgroundColor = 'rgb(107, 107, 107)';
                    HWE.style.color = 'white';
                }

                // HWF
                if (machineStatus[11] == 'Available') {
                    HWF.style.backgroundColor = 'rgb(0, 156, 0)';
                    HWF.style.color = 'white';
                } else if (machineStatus[11] == 'In Use') {
                    HWF.style.backgroundColor = 'rgb(230, 176, 2)';
                    HWF.style.color = 'white';
                } else {
                    HWF.style.backgroundColor = 'rgb(107, 107, 107)';
                    HWF.style.color = 'white';
                }

            } // end of heinz dropdown

            if ($("#drop").val() == "knight") {
                heinzDiv.style.display = 'none';
                knightDiv.style.display = 'block';

                // KDA
                if (machineStatus[12] == 'Available') {
                    KDA.style.backgroundColor = 'rgb(0, 156, 0)';
                    KDA.style.color = 'white';
                } else if (machineStatus[12] == 'In Use') {
                    KDA.style.backgroundColor = 'rgb(230, 176, 2)';
                    KDA.style.color = 'white';
                } else {
                    KDA.style.backgroundColor = 'rgb(107, 107, 107)';
                    KDA.style.color = 'white';
                }

                // KDB
                if (machineStatus[13] == 'Available') {
                    KDB.style.backgroundColor = 'rgb(0, 156, 0)';
                    KDB.style.color = 'white';
                } else if (machineStatus[13] == 'In Use') {
                    KDB.style.backgroundColor = 'rgb(230, 176, 2)';
                    KDB.style.color = 'white';
                } else {
                    KDB.style.backgroundColor = 'rgb(107, 107, 107)';
                    KDB.style.color = 'white';
                }

                // KDC
                if (machineStatus[14] == 'Available') {
                    KDC.style.backgroundColor = 'rgb(0, 156, 0)';
                    KDC.style.color = 'white';
                } else if (machineStatus[14] == 'In Use') {
                    KDC.style.backgroundColor = 'rgb(230, 176, 2)';
                    KDC.style.color = 'white';
                } else {
                    KDC.style.backgroundColor = 'rgb(107, 107, 107)';
                    KDC.style.color = 'white';
                }

                // KDD
                if (machineStatus[15] == 'Available') {
                    KDD.style.backgroundColor = 'rgb(0, 156, 0)';
                    KDD.style.color = 'white';
                } else if (machineStatus[15] == 'In Use') {
                    KDD.style.backgroundColor = 'rgb(230, 176, 2)';
                    KDD.style.color = 'white';
                } else {
                    KDD.style.backgroundColor = 'rgb(107, 107, 107)';
                    KDD.style.color = 'white';
                }

                // KDE
                if (machineStatus[16] == 'Available') {
                    KDE.style.backgroundColor = 'rgb(0, 156, 0)';
                    KDE.style.color = 'white';
                } else if (machineStatus[16] == 'In Use') {
                    KDE.style.backgroundColor = 'rgb(230, 176, 2)';
                    KDE.style.color = 'white';
                } else {
                    KDE.style.backgroundColor = 'rgb(107, 107, 107)';
                    KDE.style.color = 'white';
                }

                // KDF
                if (machineStatus[17] == 'Available') {
                    KDF.style.backgroundColor = 'rgb(0, 156, 0)';
                    KDF.style.color = 'white';
                } else if (machineStatus[17] == 'In Use') {
                    KDF.style.backgroundColor = 'rgb(230, 176, 2)';
                    KDF.style.color = 'white';
                } else {
                    KDF.style.backgroundColor = 'rgb(107, 107, 107)';
                    KDF.style.color = 'white';
                }

                // KWA
                if (machineStatus[18] == 'Available') {
                    KWA.style.backgroundColor = 'rgb(0, 156, 0)';
                    KWA.style.color = 'white';
                } else if (machineStatus[18] == 'In Use') {
                    KWA.style.backgroundColor = 'rgb(230, 176, 2)';
                    KWA.style.color = 'white';
                } else {
                    KWA.style.backgroundColor = 'rgb(107, 107, 107)';
                    KWA.style.color = 'white';
                }

                // KWB
                if (machineStatus[19] == 'Available') {
                    KWB.style.backgroundColor = 'rgb(0, 156, 0)';
                    KWB.style.color = 'white';
                } else if (machineStatus[19] == 'In Use') {
                    KWB.style.backgroundColor = 'rgb(230, 176, 2)';
                    KWB.style.color = 'white';
                } else {
                    KWB.style.backgroundColor = 'rgb(107, 107, 107)';
                    KWB.style.color = 'white';
                }

                // KWC
                if (machineStatus[20] == 'Available') {
                    KWC.style.backgroundColor = 'rgb(0, 156, 0)';
                    KWC.style.color = 'white';
                } else if (machineStatus[20] == 'In Use') {
                    KWC.style.backgroundColor = 'rgb(230, 176, 2)';
                    KWC.style.color = 'white';
                } else {
                    KWC.style.backgroundColor = 'rgb(107, 107, 107)';
                    KWC.style.color = 'white';
                }

                // KWD
                if (machineStatus[21] == 'Available') {
                    KWD.style.backgroundColor = 'rgb(0, 156, 0)';
                    KWD.style.color = 'white';
                } else if (machineStatus[21] == 'In Use') {
                    KWD.style.backgroundColor = 'rgb(230, 176, 2)';
                    KWD.style.color = 'white';
                } else {
                    KWD.style.backgroundColor = 'rgb(107, 107, 107)';
                    KWD.style.color = 'white';
                }

                // KWE
                if (machineStatus[22] == 'Available') {
                    KWE.style.backgroundColor = 'rgb(0, 156, 0)';
                    KWE.style.color = 'white';
                } else if (machineStatus[22] == 'In Use') {
                    KWE.style.backgroundColor = 'rgb(230, 176, 2)';
                    KWE.style.color = 'white';
                } else {
                    KWE.style.backgroundColor = 'rgb(107, 107, 107)';
                    KWE.style.color = 'white';
                }

                // KWF
                if (machineStatus[23] == 'Available') {
                    KWF.style.backgroundColor = 'rgb(0, 156, 0)';
                    KWF.style.color = 'white';
                } else if (machineStatus[23] == 'In Use') {
                    KWF.style.backgroundColor = 'rgb(230, 176, 2)';
                    KWF.style.color = 'white';
                } else {
                    KWF.style.backgroundColor = 'rgb(107, 107, 107)';
                    KWF.style.color = 'white';
                }

            }

        }); // on drop down change

    })

home.addEventListener('click', function () { location.href = '/' });
defaultImage.addEventListener('click', function () { location.href = '/' });
footerOne.addEventListener('click', function () { location.href = '/about' });
footerTwo.addEventListener('click', function () { location.href = '/about' });

// Copyright (C) 2022  Adam T Spera
