document.addEventListener('DOMContentLoaded', () => {

const closure = (function(){

    const _sectores = ['Playa de faena',  "Cuarteo", "Despostada", "Menudencias", "Triperia", "Exteriores - Corrales", "Playa de Emergencias", "Melter", "Lavadero de Roldanas", "Nonatos", "Saladero"];

    let _sector;

    function setSector(sector){
        _sector = sector;
        return _sector;
    }

    function getSector(){
        return _sector;
    }

    function getSectores(){
        return _sectores
    }

    return {setSector, getSector, getSectores};

})();

    $.getJSON("http://api.ipify.org/?format=json", function(e) {
        
        if (e.ip == "131.255.180.140") {

            sorteo.addEventListener("click", () => {
                iniSorteo();
            });

            imprimir.addEventListener("click", () => {
                document.getElementById("body").innerHTML = ventanaPrint();
                ventanaEditarSectores();
                window.print();
                location.reload();
            });

        }
    });

function ventanaEditarSectores(){

    let sectores = closure.getSectores();
    let ventanaEditSectores = ``;
    for (let i = 0; i < sectores.length; i++) {
        ventanaEditSectores += `<tr ><td>${i+1}</td><td>${sectores[i]}</td></tr>`;
    }
    document.querySelector('#datatablesSimple tbody').innerHTML = ventanaEditSectores;
}

function iniSorteo(){

    let contador = 0;
    imprimir.disabled = true;
    sectorSorteado.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';

    sectorSorteado.style.fontWeight = "400";
    sectorSorteado.style.backgroundColor = "";

    setTimeout( () => {

        const seleccion = setInterval(() => {

            let sectores = closure.getSectores();

            contador +=1;
            const cantidad = sectores.length;
            let nroAzar = Math.floor(Math.random() * cantidad) + 1;
            sectorSorteado.innerHTML = ` ${ nroAzar + " - " + sectores[ nroAzar -1]}`;

            if( contador > 15){
                clearInterval(seleccion);
                contador = 0;
                sectorSorteado.style.fontWeight = "700";
                sectorSorteado.style.backgroundColor = "#AFEEEE";
                imprimir.disabled = false;
                closure.setSector(sectorSorteado.innerText) ;
            }
        }, 50)

    }, 1000)
}

function ventanaPrint(){

    let [dia, hoy, mes, anio] = definirFecha();

    let ventanaPrint = ``;

    ventanaPrint += `<div id="layoutSidenav">`;
    
    ventanaPrint += `<div class="modal-dialog">`;
    ventanaPrint += `<div class="modal-content">`;
    ventanaPrint += `<div class="modal-header">`;
                        
    ventanaPrint += `<h4 class="modal-title" id="exampleModalLabel">Resultado del Sorteo:</h4>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `<div class="modal-body">`;
    ventanaPrint += `<h5 class="modal-title" id="fecha">${dia + ", " +  hoy + " de "+  mes + " de "+  anio}</h5>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `<div class="cuadro">`;
    ventanaPrint += `<img src="css/senasaV3.png" alt="">`;
    ventanaPrint += `</div>`;
    ventanaPrint += `<div class="card mb-4 col-lg-6" >`;
    ventanaPrint += `<div class="card-header">`;
    ventanaPrint += `<i class="fas fa-table me-1"></i>`;
    ventanaPrint += `Lista`;
    ventanaPrint += `</div>`;
    ventanaPrint += `<table id="datatablesSimple">`;
    ventanaPrint += `<thead>`;
    ventanaPrint += `<tr>`;
    ventanaPrint += `<th class="id" >N° Ord</th>`;
    ventanaPrint += `<th class="sector">Sector</th>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `</thead>`;
    ventanaPrint += `<tbody>`;

    ventanaPrint += `</tbody>`;
    ventanaPrint += `</table>`;

    ventanaPrint += `</div>`;

    ventanaPrint += `<div >`;
    ventanaPrint += `<div class="modal-dialog">`;
    ventanaPrint += `<div class="modal-content">`;
    ventanaPrint += `<div class="modal-header">`;
    ventanaPrint += `<h3 class="modal-title" id="sectorSorteado">Sector: "${closure.getSector()}"</h3>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;

    ventanaPrint += `<div class="firmas">`;
    ventanaPrint += `</div>`;
    ventanaPrint += `<div class="firmas">`;
    ventanaPrint += `<div class="firma">Firma</div>`;
    ventanaPrint += `<div class="firma">Firma</div>`;
    ventanaPrint += `</div>`;

    return ventanaPrint;
}

function definirFecha(){

    const fecha = new Date();
    let anio = fecha.getFullYear(); // AÑo 2023
    let mes = fecha.getMonth() + 1; // mes del 0 al 11
    let hoy = fecha.getDate(); // fecha del 1 al 31
    let dia = fecha.getDay(); // dia lunes, martes ...
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const seg = fecha.getSeconds();

    function getDia(dia){
        const dias = [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
        return dias[ dia];
    }
    dia = getDia(dia);

    function getMes(mes){
        const meses = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julios", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        return meses[ mes - 1];
    }
    mes = getMes(mes);

    return [dia, hoy, mes, anio];
}

    ventanaEditarSectores();

});