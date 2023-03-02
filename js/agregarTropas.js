
document.addEventListener('DOMContentLoaded', () =>{



    const numTropa=  document.getElementById('numTropa');
    numTropa.addEventListener('input',function(){
        if (this.value.length > 6) 
        this.value = this.value.slice(0,6); 
        });

    const numLote=  document.getElementById('numLote');
    numLote.addEventListener('input',function(){
        if (this.value.length > 2) 
        this.value = this.value.slice(0,2); 
        });

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

    const Tropas = (function(){

        let _tropas = [];
        function set_Tropas(tropa){
            _tropas = [ ..._tropas, tropa];
        }
        function get_Tropas(){
            return _tropas;
        }

        function setLS_Tropas(){
            _tropas = JSON.stringify(_tropas);
            localStorage.setItem("ls_tropas", _tropas);
        }

        function getLS_Tropas(){
            if( localStorage.getItem("ls_tropas")){
                _tropas = localStorage.getItem("ls_tropas");
                _tropas = JSON.parse(_tropas);
                return _tropas;
            }
        }

        return {set_Tropas, get_Tropas, setLS_Tropas, getLS_Tropas};
    })();

    const Tropa = (function(){

        let _tropa = {
            tropa: "",
            lote: ""
        }
        function set_Tropa(tropa){
            _tropa = tropa;
        }
        function get_Tropa(){
            return _tropa;
        }
        return {set_Tropa, get_Tropa};
    })();

    function agregarTropas(){

        let _numLote = numLote.value;
        if( _numLote== "") _numLote = "01";

        if (numTropa.value == '') {
            alert("No hay tropa que agregar");
            return;
        }
        let _Tropa = {
            tropa: numTropa.value,
            lote: _numLote
        }

        Tropa.set_Tropa(_Tropa);
        Tropas.set_Tropas(_Tropa);
        Tropas.setLS_Tropas();
        location.reload();
    }


    function guardarLista(){

        if (Tropas.get_Tropas().length != 0) {
            Lista_Tropas.getLSList_Tropas();

            let lista = Tropas.get_Tropas();
            console.log(lista);

            let hash = {};
            lista = lista.filter(function(item) {
                let go = item.tropa !== undefined ? item.tropa + item.lote : item.tropa;
                let exists = !hash[go] || false;
                hash[go] = true;
                return exists;
            });
            


            Lista_Tropas.set_List_Tropas(lista);
            Lista_Tropas.setLSList_Tropas();
            localStorage.removeItem("ls_tropas");
            location.reload();
            return;
        }
        alert("No hay tropas por guardar");
    }

    function ventanaPrint(){

        const tropas = cargarLSTropas();

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
            if (Tropa.get_Tropa() == (tropas[i].tropa + " - " + tropas[i].lote)) {
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
        ventanaPrint += `<h3 class="modal-title" id="sectorSorteado">Tropa Sorteada: " ${Tropa.get_Tropa()} "</h3>`;
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

    function definirFecha(){
        const fecha = new Date();
        let anio = fecha.getFullYear(); // Año 2023
        let mes = fecha.getMonth() + 1; // mes del 0 al 11
        let hoy = fecha.getDate(); // fecha del 1 al 31
        let dia = fecha.getDay(); // dia lunes, martes ...
        // const hora = fecha.getHours();
        // const minutos = fecha.getMinutes();
        // const seg = fecha.getSeconds();
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

    if (localStorage.getItem("ls_tropas")) {
        Tropas.getLS_Tropas();
    }




    function deleteLista(){
        localStorage.removeItem("ls_tropas");
        location.reload();
    }

    function sortearTropa(){

        const tropas = Tropas.get_Tropas();

        if (tropas != undefined) {
            
            const cantidad = tropas.length;
            let contador = 0;

            tropaSorteada.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
            tropaSorteada.style.fontWeight = "400";
            tropaSorteada.style.backgroundColor = "";
    
            setTimeout( () => {
    
                const seleccion = setInterval(() => {
                    contador +=1;
                    let nroAzar = Math.floor(Math.random() * cantidad) + 1;
                    tropaSorteada.innerHTML = tropas[ nroAzar -1].tropa + " - " + tropas[ nroAzar -1].lote;
        
                    if( contador > 15){
                        clearInterval(seleccion);
                        contador = 0;
                        tropaSorteada.style.fontWeight = "700";
                        tropaSorteada.style.backgroundColor = "#AFEEEE";
                        imprimir.disabled = false;
                        Tropa.set_Tropa(tropaSorteada.innerText) ;
                    }
                }, 50)
            }, 1000)
            
            return;
        }
        
        tropaSorteada.innerHTML = "No hay tropas Para Sortear";
    }
    
    Tropas.getLS_Tropas() ? (
        tablaTropas(Tropas.getLS_Tropas()) 
    ):(   
        sorteo.disabled = true,
        btnGuardarLista.disabled = true,
        btnElimList.disabled = true
    );

    $.getJSON("http://api.ipify.org/?format=json", function(e) {
        console.log(localStorage.getItem("ls_per"));
        console.log(e.ip);
    
        if (e.ip == localStorage.getItem("ls_per")) {
            agregarTropa.addEventListener("click", () => {
                agregarTropas();
                tablaTropas();
            });
            
            btnGuardarLista.addEventListener("click", () => {
                guardarLista();
            });

            imprimir.disabled = true;
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
                    return;
                }
            });
    
        }
    });





    
});

function cargarLSTropas(){
    
    let _Tropas;
    if( localStorage.getItem("ls_tropas")){
        _Tropas = localStorage.getItem("ls_tropas");
        _Tropas = JSON.parse(_Tropas);
        return _Tropas;
    }
    return;
}

function tablaTropas(tropas){

    numTropa.focus();
    let tablaTropa = ``;
    
    if (tropas) {
        
        for (let i = 0; i < tropas.length; i++) {
            tablaTropa += `<tr><td>${i+1}</td><td>${tropas[i].tropa}</td><td>${tropas[i].lote}</td><td><button id="${i}" onclick="deleteTropa(${i})" type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
        }
    }
    document.querySelector('#datatablesSimple tbody').innerHTML = tablaTropa;
};

function deleteTropa(idx) {

    if (!confirm('¿Seguro desea eliminar esta Tropa?')){
        return;
    }
    let tropas = cargarLSTropas();

    tropas.splice(idx, 1);
    tropas = JSON.stringify(tropas);
    localStorage.setItem("ls_tropas", tropas);
    location.reload();
};