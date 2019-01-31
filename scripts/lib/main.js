//------------------- DOM Elements----------------
var dge_span = document.getElementById("dge_span");
var hidd_dge = document.getElementById("hidd_day");
var php_time = document.getElementById("hidd_time");
var tavdapirveli_dro = document.getElementById("tavdapirveli_dro");
var shesacvleli_dro = document.getElementById("shecvlili_dro");
var shesacvleli_paneli = document.getElementById("shesacvleli_paneli");
var input_hours = document.getElementById("input_hours");
var input_minutes = document.getElementById("input_minutes");
var input_seconds = document.getElementById("input_seconds");



if (window.XMLHttpRequest) {
    var ajax = new XMLHttpRequest();
} else {
    var ajax = new ActiveXObject("Microsoft.XMLHTTP");
}



$("canvas").hover(function () {
    window.onclick = pick_auditories;

}, function () {
    window.onclick = null;

})