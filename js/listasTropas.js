
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
            return _listas_Tropas;
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

    function query(){
        let lista = Lista_Tropas.getLSList_Tropas();

        for (let i= 0; i < lista.length; i++) 
        {
            let tarjeta = document.getElementById("lista" + i);
            tarjeta.addEventListener("click", (e) => {
                imprimir.disabled = true;
        
                let idArray = e.target.id;
                idArray = idArray.slice(-1);
                Idx.setId(idArray);
                Idx.setLS_Id();
                sortearTropa();

            });

            let btnEditar = document.getElementById("btnEditar" + i) ;
            btnEditar.addEventListener("click", (e) => {

                let idArray = e.target.id;
                idArray = idArray.slice(-1);
                Idx.setId(idArray);
                layoutSidenav_content.innerHTML = ventanaEditarTropa();
            })
        }
    }

    function sortearTropa(){

        let listas_tropas = Lista_Tropas.getLSList_Tropas();
        console.log(Idx.getId());
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
    
                
                tropaSorteada.innerHTML = lista[ nroAzar -1].tropa + " - " + lista[ nroAzar -1].lote;
    
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

                card += `<div class="container">`; 
                card += `<div class="row">`; 

                for( j=0 ; j <= listas_tropas[i].length - 1 ; j++){
                    // card += `${listas_tropas[i][j].tropa + "-" + listas_tropas[i][j].lote + " ; "}`;
                    // card += `<div class="col-lg-4">${listas_tropas[i][j].tropa + "-" + listas_tropas[i][j].lote + " ; "}</div>`;
                    card += `<div class="col-lg-6">`; 
                    card += `${listas_tropas[i][j].tropa + "-" + listas_tropas[i][j].lote}`; 
                    card += `</div>`; 
                }
                
                card += `</div>`; 
                card += `</div>`; 
                
                card += `</div>`;
                card += `<div class="row " >`;
                    card += `<div class="col-lg6 d-flex justify-content-around">`;

                    card += `<button id="lista${i}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" > Sortear</button>`;


                        // BOTON EDITAR


                        card += `<a id="btnEditar${i}" href="editTropas.html" onclick="ventanaEditarTropa()" class="btn btn-warning btn-icon-split">`;
                        card += `<span class="icon text-white-50">`;
                        card += `<i class="fas fa-exclamation-triangle"></i>`;
                        card += `</span>`;
                        card += `<span class="text">Editar</span>`;
                        card += `</a>`;

                    // card += `<button id="btnEditar${i}" type="button" class="btn btn-warning" data-bs-toggle="" data-bs-target="#"> Editar</button>`;

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
                    card += ` Para agregar tropas acceda al siguiente boton`;
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

    let lista = Lista_Tropas.getLSList_Tropas();
    let tropas = lista[Idx.getId()];

    let ventanaEditTropa = ``;
    ventanaEditTropa += `<div class="container-fluid">`;

        ventanaEditTropa += `<h1 class="mt-4">Editar Lista `;
        ventanaEditTropa += `<a href="listasTropas.html" class="btn btn-secondary btn-icon-split"`;
        ventanaEditTropa += `<span class="icon text-white-50">`;
            ventanaEditTropa += `<i class="fas fa-arrow-right"></i>`;
        ventanaEditTropa += `</span>`;
        ventanaEditTropa += `<span class="text"> Ver Listas</span>`;
    ventanaEditTropa += `</a></h1>`;

        ventanaEditTropa += `<div class="cuadro">`;
            ventanaEditTropa += `<img src="css/senasaV3.png" alt="">`;  
        ventanaEditTropa += `</div><hr>`;

        ventanaEditTropa += `<div class="card shadow mb-4 col-lg-6">`;

            ventanaEditTropa += `<div class="card-header py-3">`;
            ventanaEditTropa += `<h5 class="m-0 font-weight-bold text-primary">Lista de Tropa - Lote</h5>`;
            ventanaEditTropa += `</div>`;

            ventanaEditTropa += `<div class="card-body col-lg-12">`;

                ventanaEditTropa += `<div class="table-responsive">`;
                    ventanaEditTropa += `<table id="listaTropas" class="table table-bordered" width="100%" cellspacing="0">`;
                        ventanaEditTropa += `<thead>`;
                            ventanaEditTropa += `<tr>`;
                                ventanaEditTropa += `<th>ID</th>`;
                                ventanaEditTropa += `<th>Tropa</th>`;
                                ventanaEditTropa += `<th>Lote</th>`;
                                ventanaEditTropa += `<th>Acciones</th>`;
                            ventanaEditTropa += ` </tr>`;
                        ventanaEditTropa += `</thead>`;
                        ventanaEditTropa += `<tbody>`;

                        for (let i = 0; i < tropas.length; i++) {
                            let btnEliminar = `<a id="${i}"href="#" class="btn btn-danger btn-circle btn-sm"> <i class="fas fa-trash"></i> </a>`;
                            ventanaEditTropa += `<tr ><td>${i}</td><td>${tropas[i].tropa} </td> <td>${tropas[i].lote}</td><td>${btnEliminar}</td></tr>`;
                        }

                        ventanaEditTropa += `</tbody>`;
                    ventanaEditTropa += `</table>`;
                ventanaEditTropa += `</div>`;

            ventanaEditTropa += `</div>`;
        ventanaEditTropa += `</div>`;

    ventanaEditTropa += `</div>`;

    return ventanaEditTropa;
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


});