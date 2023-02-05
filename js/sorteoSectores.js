document.addEventListener('DOMContentLoaded', () => {

const closure = (function(){

    let _sector;

    function setSector(sector){
        _sector = sector;
        return _sector;
    }

    function getSector(){
        return _sector;
    }

    return {setSector, getSector};

})();

    let contador = 0;


    imprimir.addEventListener("click", () => {

        // var sector = sectorSorteado.innerText;
        // console.log(sector);
        document.getElementById("body").innerHTML = ventanaPrint();
        // window.location.href = "./print.html";

        window.print();

        location.reload();

    })

    sorteo.addEventListener("click", () => {
        iniSorteo();

    })

function iniSorteo(){

    imprimir.disabled = true;
    sectorSorteado.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';

    sectorSorteado.style.fontWeight = "400";
    sectorSorteado.style.backgroundColor = "";
    setTimeout( () => {
        const seleccion = setInterval(() => {
            contador +=1;
            let nroAzar = Math.floor(Math.random() * 11) + 1;
            
            switch (nroAzar) {
                case 1:
                    sectorSorteado.innerHTML = '01 - Playa de faena';
                    
                    break;
                case 2:
                    sectorSorteado.innerHTML = "02 - Cuarteo";
                    
                    break;
                case 3:
                    sectorSorteado.innerHTML = "03 - Despostada";
                    
                    break;
                case 4:
                    sectorSorteado.innerHTML = "04 - Menudencias";
                    
                    break;
                case 5:
                    sectorSorteado.innerHTML = "05 - Triperia";
                    
                    break;
                case 6:
                    sectorSorteado.innerHTML = "06 - Exteriores - Corrales";
                    
                    break;
                case 7:
                    sectorSorteado.innerHTML = "07 - Playa de Emergencias";
                    
                    break;
                case 8:
                    sectorSorteado.innerHTML = "08 - Melter";
                    
                    break;
                case 9:
                    sectorSorteado.innerHTML = "09 - Lavadero de Roldanas";
                    
                    break;
                case 10:
                    sectorSorteado.innerHTML = "10 - Nonatos";
                    
                    break;
                case 11:
                    sectorSorteado.innerHTML = "11 - Saladero";
                    
                    break;
                default:
                    break;
            }

            if( contador > 15){
                clearInterval(seleccion);
                contador = 0;
                sectorSorteado.style.fontWeight = "700";
                sectorSorteado.style.backgroundColor = "#AFEEEE";
                imprimir.disabled = false;
                closure.setSector(sectorSorteado.innerText) ;
                console.log(closure.getSector());

            }
        }, 50)
    }, 1000)
}

function ventanaPrint(){

    let [dia, hoy, mes, anio] = definirFecha();

    let ventanaPrint = ``;


    // ventanaPrint += `<page size="A4">`;


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

    ventanaPrint += `<div class="card mb-4">`;
    ventanaPrint += `<div class="card-header">`;
    ventanaPrint += `<i class="fas fa-table me-1"></i>`;
    ventanaPrint += `Lista`;
    ventanaPrint += `</div>`;
    ventanaPrint += `<table id="">`;
    ventanaPrint += `<thead>`;
    ventanaPrint += `<tr>`;
    ventanaPrint += `<th class="id" >N° Ord</th>`;
    ventanaPrint += `<th class="sector">Sector</th>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `</thead>`;
    ventanaPrint += `<tbody>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >01</td>`;
    ventanaPrint += `<td>Playa de faena</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >02</td>`;
    ventanaPrint += `<td >Cuarteo</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >03</td>`;
    ventanaPrint += `<td >Despostada</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >04</td>`;
    ventanaPrint += `<td >Menudencias</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >05</td>`;
    ventanaPrint += `<td >Triperia</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr>`;
    ventanaPrint += `<td >06</td>`;
    ventanaPrint += `<td>Exteriores - Corrales</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >07</td>`;
    ventanaPrint += `<td >Playa Emergencias</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >08</td>`;
    ventanaPrint += `<td >Melter</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >09</td>`;
    ventanaPrint += `<td >Lavadero de Roldanas</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >10</td>`;
    ventanaPrint += `<td >Nonatos</td>`;
    ventanaPrint += `</tr>`;
    ventanaPrint += `<tr >`;
    ventanaPrint += `<td >11</td>`;
    ventanaPrint += `<td >Saladero</td>`;
    ventanaPrint += `</tr>`;
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

        


    // ventanaPrint += `</page>`;


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
    console.log(anio, mes, hoy, dia, hora, minutos, seg); 

    function getDia(dia){
        const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
        return dias[ dia - 1 ];
    }

    dia = getDia(dia);

    function getMes(mes){
        let meses = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julios", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        return meses[ mes - 1];
    }

    mes = getMes(mes);

    return [dia, hoy, mes, anio];

}


});