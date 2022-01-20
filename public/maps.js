var defaultImage = document.getElementById('defaultImage');
var home = document.getElementById('home');
var drop = document.getElementById('drop');
var footerDivScale = document.getElementById('footerDivScale');
var footerDivBlock = document.getElementById('footerDivBlock');

$("#drop").on('change', function () {

    if ($("#drop").val() == "heinz") {
        document.getElementById("img").src="heinz.png"
        document.getElementById("img").style.border="2px solid #555"
    } // if heinz

    if ($("#drop").val() == "knight") {
        document.getElementById("img").src="knight.png"
        document.getElementById("img").style.border="2px solid #555"
    } // if knight

    if ($("#drop").val() == "thomas") {
        
    } // if thomas

    if ($("#drop").val() == "kisler") {
        
    } // if kisler

    if ($("#drop").val() == "dilworth") {
        
    } // if dilworth

});

home.addEventListener('click', function () { location.href = '/' });
defaultImage.addEventListener('click', function () { location.href = '/' });

// Copyright (C) 2022  Adam T Spera