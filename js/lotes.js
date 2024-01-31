/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
    const FECHA = document.getElementById('txtFecha');
    const ACTA = document.getElementById('actaTxt');

    const _ACTA = (function() {
        let _acta;
        function get_acta() {
            return _acta
        }

        function set_acta(acta) {
            _acta = acta
        }

        return {get_acta,set_acta}
        
    })()


    const _NROAZAR = (function () {
        let _nroAzar;
        function set_nroAzar (nroAzar) {
            _nroAzar =  nroAzar
        }
        function get_nroAzar () {
            return _nroAzar
        }
    
        return { set_nroAzar, get_nroAzar }
    })()

    const _MINyMAX = (function(params) {
        let _MIN;
        let _MAX;
        function get_MIN(){
            return _MIN
        }
        function set_MIN(min) {
            _MIN = min
            
        }
        function get_MAX(){
            return _MAX
        }
        function set_MAX(max) {
            _MAX = max
            
        }

        return { get_MIN,set_MIN,get_MAX,set_MAX}
        
    })()





    sorteo.addEventListener("click", () => {
        selectActa();
        minMaxRamdom();
        iniSorteo();
    });

    imprimir.addEventListener("click", () => {
        document.getElementById("body").innerHTML = ventanaPrint();
        
        window.print();
        location.reload();
    });

    function selectActa() {
        const acta = document.getElementById('actaTxt').value
        if (acta === "") {
            _ACTA.set_acta("08/2023") 
            
        }else _ACTA.set_acta(acta)
        
    }

    function minMaxRamdom() {

        const min = document.getElementById('loteInicial').value
        const max = document.getElementById('loteFinal').value
        if (min == "" || max == "") {
            _MINyMAX.set_MIN(1) 
            _MINyMAX.set_MAX( 5)
        }else{
            _MINyMAX.set_MIN(min) 
            _MINyMAX.set_MAX( max)
        }

    }


function iniSorteo(){

    let contador = 0;
    let [MIN, MAX] = [_MINyMAX.get_MIN(), _MINyMAX.get_MAX()]
    console.log(MIN, MAX);
    imprimir.disabled = true;
    sectorSorteado.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';

    sectorSorteado.style.fontWeight = "400";
    sectorSorteado.style.backgroundColor = "";

    setTimeout( () => {

        const seleccion = setInterval(() => {

            contador ++;
            
            MIN = Math.ceil(MIN);
            MAX = Math.floor(MAX);
            const nroAzar =  Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
            _NROAZAR.set_nroAzar(nroAzar)
            sectorSorteado.innerHTML = ` Lote sorteado: ${ nroAzar }`;

            if( contador > 15){
                clearInterval(seleccion);
                contador = 0;
                sectorSorteado.style.fontWeight = "700";
                sectorSorteado.style.backgroundColor = "#AFEEEE";
                imprimir.disabled = false;
                
            }
        }, 50)

    }, 1000)
}

function ventanaPrint(){

    const [dia, hoy, mes, anio] = getDateHTML();

    let ventanaPrint = ``;

    ventanaPrint += `<div id="layoutSidenav">`;
    
    ventanaPrint += `<div class="row ps-5 align-items-center">`;
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
    ventanaPrint += `<img src="imgs/senasaV3.png" alt="">`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;

    ventanaPrint += `<!-- cuerpo -->`;
    ventanaPrint += `<div class="container-fluid m-5 ">`;
    ventanaPrint += ` <h3>Servicio de Inspección Veterinaria</h3>`;
    ventanaPrint += `  <h3> Estableciemiento Nº Oficial 1352 Santa Giulia S.A.</h3>`;
    ventanaPrint += `  <h5 class="mt-4">Muestreo de Escherichia Coli (STEC) Y Salmonella - Circular 4210 B</h5>`;
    ventanaPrint += `</div>`;

    ventanaPrint += `<hr>`;

    ventanaPrint += `<div class="container-fluid m-5 ">`;
    ventanaPrint += `<form >`;
    ventanaPrint += `  <div class="form-group"> `;
    ventanaPrint += `     <label for="mes" class="control-label">Mes de muestreo</label>`;
    ventanaPrint += `     <input type="text" class="form-control" id="mes" name="mes"  value=${mes}>`;
    ventanaPrint += `    </div>  `;
    ventanaPrint += `  <div class="form-group"> `;
    ventanaPrint += `    <label for="dia" class="control-label">Dia de muestreo</label>`;
    ventanaPrint += `     <input type="text" class="form-control" id="dia" name="dia"  value="${hoy }/${mes}/${anio}">`;
    ventanaPrint += `  </div>  `;

    ventanaPrint += `   <div class="form-group"> `;
    ventanaPrint += `      <label for="loteInicial" class="control-label">Lote Inicial</label>`;
    ventanaPrint += `      <input type="number" class="form-control" id="loteInicial" name="loteInicial" value="${_MINyMAX.get_MIN()}" >`;
    ventanaPrint += `   </div>    `;
    
    ventanaPrint += `   <div class="form-group"> `;
    ventanaPrint += `       <label for="loteFinal" class="control-label">Lote Final</label>`;
    ventanaPrint += `      <input type="number" class="form-control" id="loteFinal" name="loteFinal" value="${_MINyMAX.get_MAX()}">`;
    ventanaPrint += `   </div> `;
    ventanaPrint += `   <div class="form-group"> `;
    ventanaPrint += `       <label for="numLote" class="control-label">Acta Nº1352-BO-STEC-</label>`;
    ventanaPrint += `       <input type="text" class="form-control" id="numLote" name="lote" value="${_ACTA.get_acta()}">`;
    ventanaPrint += `   </div>  `;
    ventanaPrint += `</div>`;
    ventanaPrint += `   <br> `;

    ventanaPrint += `    <hr>`;
        
    ventanaPrint += `</form> `;
    ventanaPrint += `<!-- cuerpo -->`;

  
    ventanaPrint += `<div class="modal-dialog mb-5">`;
    ventanaPrint += `<div class="modal-content">`;

    ventanaPrint += `<div class="modal-header">`;
    ventanaPrint += `<h3 class="modal-title" id="sectorSorteado">Lote Elegido: " ${_NROAZAR.get_nroAzar()} "</h3>`;
    ventanaPrint += `</div>`;

    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;



    ventanaPrint += `<footer class="footer mt-5 py-3 bg-body-tertiary">`;


    ventanaPrint += `<div class="firmas mt-4">`;
    ventanaPrint += `<div class="firma">Firma SIV</div>`;
    ventanaPrint += `<div class="firma">Firma Dep. Calidad</div>`;
    ventanaPrint += `</div>`;




            ventanaPrint += `</footer>`;

    return ventanaPrint;
}

function getDateHTML(){
    let txtFecha = FECHA.value.replace(/-/g, '\/')
    let fecha 
    if (txtFecha != '') {
        fecha = new Date(txtFecha)
    }else{
        fecha = new Date()
    }

    const anio = fecha.getFullYear() // Año 2023
    let mes = fecha.getMonth() + 1 // mes del 0 al 11
    const hoy = fecha.getDate()// fecha del 1 al 31
    let dia = fecha.getDay() // dia lunes, martes ... del 0 al 6

    function getDia (dia) {
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
        return dias[dia]
    }
    dia = getDia(dia)
    function getMes (mes) {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julios', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        return meses[mes - 1]
    }
    mes = getMes(mes)
    return [dia, hoy, mes, anio]
}


});