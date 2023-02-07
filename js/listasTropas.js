
document.addEventListener('DOMContentLoaded', () =>{

    const closure = (function(){

        let _sector;
        let _id;
    
        function setTropa(sector){
            _sector = sector;
        }
    
        function getTropa(){
            return _sector;
        }

        function setId(id){
            _id = id;
        }

        function getId(){
            return _id;
        }
    
        return {setTropa, getTropa, setId, getId};
    
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

    function query(){
        let lista = Lista_Tropas.getLSList_Tropas();
        for (let i= 0; i <= lista.length -1; i++) 
        {
            let tarjeta = document.getElementById(i);
            tarjeta.addEventListener("click", sorteo)
        }
    }

    function sorteo(e){
        imprimir.disabled = true;
        
        closure.setId(e.target.id);
        sortearTropa();
    }

    function sortearTropa(){

        let listas_tropas = Lista_Tropas.getLSList_Tropas();

        let lista = listas_tropas[closure.getId()];
        let contador = 0;

        const cantidad = lista.length;

        tropaSorteada.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        tropaSorteada.style.fontWeight = "400";
        tropaSorteada.style.backgroundColor = "";

        setTimeout( () => {

            const seleccion = setInterval(() => {

                contador +=1;
                let nroAzar = Math.floor(Math.random() * cantidad) + 1;
    
                
                tropaSorteada.innerHTML = lista[ nroAzar -1].tropa + "-" + lista[ nroAzar -1].lote;
    
                if( contador > 15){
                    clearInterval(seleccion);
                    contador = 0;
                    tropaSorteada.style.fontWeight = "700";
                    tropaSorteada.style.backgroundColor = "#AFEEEE";
                    imprimir.disabled = false;
                    closure.setTropa(tropaSorteada.innerText) ;
                }
            }, 50)
    
        }, 1000)


    }

    if( Lista_Tropas.getLSList_Tropas().length == 0) windowCards.innerHTML += cardSinTropas();

    windowCards.innerHTML += cards();

    query();

    imprimir.addEventListener("click", () => {

        document.getElementById("body").innerHTML = ventanaPrint();

        window.print();

        location.reload();

    });


function cards(){

    let listas_tropas = Lista_Tropas.getLSList_Tropas();
    let card = ``;

    for( let i=0 ; i <= listas_tropas.length - 1 ; i++){
        card += `<div class="col-lg-4">`;
            card += `<div class="card shadow mb-4">`;
                card += `<div class="card-header py-3">`;
                    card += `<h6 id="titlleCard" class="m-0 font-weight-bold text-primary" >Lista " ${i+1} "</h6>`;
                card += `</div>`;
                card += `<div id="bodyCard" class="card-body fs-5">`; 
                for( j=0 ; j <= listas_tropas[i].length - 1 ; j++){
                    card += listas_tropas[i][j].tropa + "-" + listas_tropas[i][j].lote + " ; ";
                }
                card += `</div>`;
                card += `<div class="row " >`;
                    card += `<div class="col-lg6 d-flex justify-content-around">`;

                    card += `<button id="${i}" type="button" class="btn btn-primary "  data-bs-toggle="modal" data-bs-target="#exampleModal" > Sortear</button>`;


                        // BOTON EDITAR

                        card += `<button id="" type="button" class="btn btn-warning "  data-bs-toggle="modal" data-bs-target="#exampleModal" > Editar</button>`;

                    card += `</div>`;
                card += `</div>`;
                card += `<div class="my-2"></div>`;
            card += `</div>`;
        card += `</div>`;
    }
    return card;
}

function cardSinTropas(){

    let card = ``;
        card += `<div class="col-lg-4">`;
            card += `<div class="card shadow mb-4">`;
                card += `<div class="card-header py-3">`;
                    card += `<h6 id="titlleCard" class="m-0 font-weight-bold text-primary" >" No hay Listas de tropas "</h6>`;
                card += `</div>`;
                card += `<div id="bodyCard" class="card-body fs-5">`;
                    card += " Para agregar tropas acceda al siguiente boton";
                card += `</div>`;
                card += `<div class="row " >`;
                    card += `<div class="col-lg6 d-flex justify-content-around">`;
                        card += `<a id="btnAgregarTropas" href="agregarTropas.html" class="btn btn-primary btn-icon-split">`;
                            card += `<span class="icon text-white-50">`;
                                card += `<i class="fas fa-arrow-right"></i>`;
                            card += `</span>`;
                            card += `<span class="text"> Agregar Lista</span>`;
                        card += `</a>`;
                    card += `</div>`;
                card += `</div>`;
                card += `<div class="my-2"></div>`;
            card += `</div>`;
        card += `</div>`;
    return card;
}

function ventanaPrint(){

    let lista = Lista_Tropas.getLSList_Tropas();
    let tropas = lista[closure.getId()];

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
    ventanaPrint += `Lista de Tropas/Lote`;
    ventanaPrint += `</div>`;
    // ventanaPrint += `<table id="datat">`;
    // ventanaPrint += `<thead>`;
    // ventanaPrint += `<tr>`;
    // ventanaPrint += `<th class="id" >Nº Ord</th>`;
    // ventanaPrint += `<th class="id" >Tropa</th>`;
    // ventanaPrint += `<th class="sector">Lote</th>`;
    // ventanaPrint += `</tr>`;
    // ventanaPrint += `</thead>`;
    // ventanaPrint += `<tbody>`;
    ventanaPrint += `<ol id="columnas">`;


    for (let i = 0; i < tropas.length; i++) {
        
        ventanaPrint += `<li> ${tropas[i].tropa + " - " + tropas[i].lote}</li>`;
        
        // ventanaPrint += `<tr >`;
        // ventanaPrint += `<td >0${i+1}</td>`;
        // ventanaPrint += `<td >${tropas[i].tropa}</td>`;
        // ventanaPrint += `<td >${tropas[i].lote}</td>`;
        // ventanaPrint += `</tr>`;
    }
    ventanaPrint += `</ol>`;

    // ventanaPrint += `<tr >`;

    // ventanaPrint += `</tr>`;
    // ventanaPrint += `</tbody>`;
    // ventanaPrint += `</table>`;

    ventanaPrint += `</div>`;

    ventanaPrint += `<div >`;
    ventanaPrint += `<div class="modal-dialog">`;
    ventanaPrint += `<div class="modal-content">`;
    ventanaPrint += `<div class="modal-header">`;
    ventanaPrint += `<h3 class="modal-title" id="sectorSorteado">Tropa: " ${closure.getTropa()} "</h3>`;
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


});