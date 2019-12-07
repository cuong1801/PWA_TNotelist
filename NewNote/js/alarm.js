function poston(a) {
    // var a = '20/10/2019 20:53';

    
    var b = moment(a, 'DD/MM/YYYY hh:mm').startOf('hour').fromNow();
    // document.getElementById("timenow2").innerHTML = b;
    // alert(b);
    document.getElementById("timeyourpost").innerHTML = b;
}