/* eslint-disable no-undef */
/* eslint-disable camelcase */

document.addEventListener('DOMContentLoaded', () =>{



    const Tropa = (function(){

        let _tropa;
    
        function setTropa(tropa){
            _tropa = tropa;
        }
    
        function getTropa(){
            return _tropa;
        }

        return {setTropa, getTropa};
    
    })();

    const Idx = (function(){

        let _id;

        function setId(id){
            _id = id;
        }

        function getId(){
            return _id;
        }

        function setLS_Id(){
            localStorage.setItem("ls_Id", _id);
        }

        function getLS_Id(){
            if( localStorage.getItem("ls_Id")){
                _id = localStorage.getItem("ls_Id");
            }
            return _id;
        }
    
        return {setId, getId, setLS_Id, getLS_Id};
    
    })();

    const Lista_Tropas = (function(){
        let _listas_Tropas = [];
        
        function set_List_Tropas(lista_tropa){
            _listas_Tropas = [ ..._listas_Tropas, lista_tropa];
        }
        
        function get_List_Tropas(){
            return _listas_Tropas;
        }
        
        function setLSList_Tropas(){
            _listas_Tropas = JSON.stringify(_listas_Tropas);
            localStorage.setItem("ls_List_tropas", _listas_Tropas);
        }
        
        function getLSList_Tropas(){
            if( localStorage.getItem("ls_List_tropas")){
                _listas_Tropas = localStorage.getItem("ls_List_tropas");
                _listas_Tropas = JSON.parse(_listas_Tropas);
            }
            return _listas_Tropas;
        }
        return {set_List_Tropas, get_List_Tropas, setLSList_Tropas, getLSList_Tropas};
        
    })();

    function sortearTropa(){

        const listas_tropas = Lista_Tropas.getLSList_Tropas();

        const lista = listas_tropas[Idx.getLS_Id()];
        let contador = 0;

        const cantidad = lista.length;

        tropaSorteada.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        tropaSorteada.style.fontWeight = "400";
        tropaSorteada.style.backgroundColor = "";

        setTimeout( () => {

            const seleccion = setInterval(() => {

                contador +=1;
                const nroAzar = Math.floor(Math.random() * cantidad) + 1;
    
                
                tropaSorteada.innerHTML = lista[nroAzar -1].tropa + " - " + lista[nroAzar -1].lote;
    
                if( contador > 15){
                    clearInterval(seleccion);
                    contador = 0;
                    tropaSorteada.style.fontWeight = "700";
                    tropaSorteada.style.backgroundColor = "#AFEEEE";
                    imprimir.disabled = false;
                    Tropa.setTropa(tropaSorteada.innerText) ;
                }
            }, 50)
        }, 1000)
    };

function ventanaPrint(){

    const lista = Lista_Tropas.getLSList_Tropas();
    const tropas = lista[Idx.getId()];

    const [dia, hoy, mes, anio] = definirFecha();

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


    ventanaPrint += `<div class="card mb-4 col-lg-4 p-2" >`;
    ventanaPrint += `<div class="card-header">`;
    ventanaPrint += `<i class="fas fa-table me-1"></i>`;
    ventanaPrint += `Lista de " Tropa - Lote "`;
    ventanaPrint += `</div>`;

    ventanaPrint += `<ol id="columnas">`;

    for (let i = 0; i < tropas.length; i++) {
        if (Tropa.getTropa() === (tropas[i].tropa + " - " + tropas[i].lote)) {
            ventanaPrint += `<li class="text-white bg-dark rounded fw-bold"> ${tropas[i].tropa + " - " + tropas[i].lote}</li>`;
        }else{
            ventanaPrint += `<li > ${tropas[i].tropa + " - " + tropas[i].lote}</li>`;
        }
    }

    ventanaPrint += `</ol>`;

    ventanaPrint += `</div>`;

    ventanaPrint += `<div >`;
    ventanaPrint += `<div class="modal-dialog">`;
    ventanaPrint += `<div class="modal-content">`;
    ventanaPrint += `<div class="modal-header">`;
    ventanaPrint += `<h3 class="modal-title" id="sectorSorteado">Tropa Sorteada: " ${Tropa.getTropa()} "</h3>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;

    ventanaPrint += `<div >`;
    ventanaPrint += `<div class="modal-dialog">`;
    ventanaPrint += `<div class="modal-content">`;
    ventanaPrint += `<div class="modal-header">`;
    ventanaPrint += `<h3 class="modal-title" id="sectorSorteado">Garron: </h3>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;
    ventanaPrint += `</div>`;

    ventanaPrint += `<div class="firmas"></div>`;
    ventanaPrint += `<div class="firmas">`;
    ventanaPrint += `<div class="firma">Firma</div>`;
    ventanaPrint += `<div class="firma">Firma</div>`;
    ventanaPrint += `</div>`;

    return ventanaPrint;
};

function definirFecha(){

    const fecha = new Date();
    const anio = fecha.getFullYear(); // Año 2023
    let mes = fecha.getMonth() + 1; // mes del 0 al 11
    const hoy = fecha.getDate(); // fecha del 1 al 31
    let dia = fecha.getDay(); // dia lunes, martes ...

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
};

function agregarTropas(){

    const lista = Lista_Tropas.getLSList_Tropas();
    const tropas = lista[Idx.getId()];
    let _numLote = numLote.value;
    if( _numLote === "") _numLote = "01";

    if (numTropa.value === '') {
        alert("No hay tropa que agregar");
        return;
    }

    const _Tropa = {
        tropa: numTropa.value,
        lote: _numLote
    }

    tropas.push(_Tropa);
    Lista_Tropas.setLSList_Tropas();
    location.reload();
}




    numList.innerText = `Lista "${Number(Idx.getLS_Id()) + 1}"`;
    imprimir.disabled = true;
    ventanaEditarTropa();

    $.getJSON("http://api.ipify.org/?format=json", function(e) {
    
        if (e.ip === "181.46.77.225") {
            agregarTropa.addEventListener("click", () => {

                agregarTropas();
            });

            sorteo.addEventListener("click", () => {
                imprimir.disabled = true;
                sortearTropa();
            });

            imprimir.addEventListener("click", () => {
                document.getElementById("body").innerHTML = ventanaPrint();
                window.print();
                location.reload();

            });

            btnElimList.addEventListener("click", () => {
                if (confirm('¿Seguro desea eliminar esta Lista?')){
                    deleteLista();
                    
                }

            });
        }
    });    


});

function cargarListaLS(){

    let _listas_Tropas;
    if( localStorage.getItem("ls_List_tropas")){
        _listas_Tropas = localStorage.getItem("ls_List_tropas");
        _listas_Tropas = JSON.parse(_listas_Tropas);
    }

    return _listas_Tropas;
}

function cargarIdLS(){
    
    const _id = localStorage.getItem("ls_Id");
    return _id;
}

function ventanaEditarTropa(){

    const lista = cargarListaLS();
    const tropas = lista[cargarIdLS()];


    let ventanaEditTropa = ``;
    for (let i = 0; i < tropas.length; i++) {
        element = tropas[i];
        ventanaEditTropa += `<tr ><td>${i + 1 }</td><td>${element.tropa} </td> <td>${element.lote}</td><td><button id="${i}" onclick="deleteTropa(${i})" type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
    }
    document.querySelector('#datatablesSimple tbody').innerHTML = ventanaEditTropa;
};

// eslint-disable-next-line no-unused-vars
function deleteTropa(idx) {

    if (!confirm('¿Seguro desea eliminar esta Tropa?')){
        return;
    }

    let lista = cargarListaLS();
    const tropas = lista[cargarIdLS()];

    tropas.splice(idx, 1);

    lista = JSON.stringify(lista);
    localStorage.setItem("ls_List_tropas", lista);

    if (tropas.length === 0) {
        console.log(tropas.length);
        deleteLista();
        return;
    }
    location.reload();

};

function deleteLista(){

    let lista = cargarListaLS();
    lista.splice(cargarIdLS(), 1);
    lista = JSON.stringify(lista);
    localStorage.setItem("ls_List_tropas", lista);
    location.href = "listasTropas.html";
}




