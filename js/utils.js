document.addEventListener('DOMContentLoaded', () =>{

    $.getJSON("http://api.ipify.org/?format=json", function(e) {
        const per = JSON.stringify(e.ip);
        localStorage.setItem("ls_per", per); 
    });



});