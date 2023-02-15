
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
            }
            return _tropas;
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

    if (localStorage.getItem("ls_tropas")) {
        Tropas.getLS_Tropas();
    }
    tablaTropas();
    agregarTropa.addEventListener("click", () => {
        
        agregarTropas();
        tablaTropas();
        
    });
    
    btnGuardarLista.addEventListener("click", () => {
        
        guardarLista();

    });

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
            Lista_Tropas.set_List_Tropas(Tropas.get_Tropas());
            Lista_Tropas.setLSList_Tropas();
            location.reload();
            localStorage.removeItem("ls_tropas");
            return;
        }
        alert("No hay tropas por guardar");
    }

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

function tablaTropas(){
    numTropa.focus();

    const tropas = cargarLSTropas();
    let tablaTropa = ``;
    
    if (tropas) {
        
        for (let i = 0; i < tropas.length; i++) {
            tablaTropa += `<tr><td>${tropas[i].tropa}</td><td>${tropas[i].lote}</td><td><button id="${i}" onclick="deleteTropa(${i})" type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button></td></tr>`;
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