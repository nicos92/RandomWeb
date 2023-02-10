
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

        let listas_tropas = Lista_Tropas.getLSList_Tropas();

        let lista = listas_tropas[Idx.getId()];
        let contador = 0;

        const cantidad = lista.length;

        tropaSorteada.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        tropaSorteada.style.fontWeight = "400";
        tropaSorteada.style.backgroundColor = "";

        setTimeout( () => {

            const seleccion = setInterval(() => {

                contador +=1;
                let nroAzar = Math.floor(Math.random() * cantidad) + 1;
    
                
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
    }




function ventanaPrint(){

    let lista = Lista_Tropas.getLSList_Tropas();
    let tropas = lista[Idx.getId()];

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


    ventanaPrint += `<div class="card mb-4 col-lg-4 p-2" >`;
    ventanaPrint += `<div class="card-header">`;
    ventanaPrint += `<i class="fas fa-table me-1"></i>`;
    ventanaPrint += `Lista de " Tropa - Lote "`;
    ventanaPrint += `</div>`;

    ventanaPrint += `<ol id="columnas">`;

    for (let i = 0; i < tropas.length; i++) {
        if (Tropa.getTropa() == (tropas[i].tropa + " - " + tropas[i].lote)) {
            ventanaPrint += `<li class="text-white bg-dark rounded"> ${tropas[i].tropa + " - " + tropas[i].lote}</li>`;
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
}

function ventanaEditarTropa(){

    document.querySelector('#datatablesSimple tbody').innerHTML = "";

    let lista = Lista_Tropas.getLSList_Tropas();
    console.log(lista);
    let tropas = lista[Idx.getLS_Id()];
    console.log(tropas);

    let ventanaEditTropa = ``;

    for (let i = 0; i < tropas.length; i++) {
        let btnEliminar = `<a id="${i}"href="#" class="btn btn-danger btn-circle btn-sm"> <i class="fas fa-trash"></i> </a>`;
        ventanaEditTropa += `<tr ><td>${i}</td><td>${tropas[i].tropa} </td> <td>${tropas[i].lote}</td><td>${btnEliminar}</td></tr>`;
    }

    document.querySelector('#datatablesSimple tbody').innerHTML = ventanaEditTropa;
}



function definirFecha(){

    const fecha = new Date();
    let anio = fecha.getFullYear(); // Año 2023
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


    ventanaEditarTropa();

    sorteo.addEventListener("click", () => {

        sortearTropa();
    })

    imprimir.addEventListener("click", () => {

        document.getElementById("body").innerHTML = ventanaPrint();

        window.print();

        location.reload();

    });


});