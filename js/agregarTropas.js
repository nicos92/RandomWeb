
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
        return {set_Tropas, get_Tropas};
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

    // const contadorId = (function(){

    //     let _id = 0;

    //     function sum_Id(){
    //         _id++;
    //     }
    //     function get_Id(){
    //         return _id;
    //     }
    //     function set_LS_Id(){
    //         let _id = JSON.stringify(_id);
    //         localStorage.setItem("ls_Id", _id);
    //     }
    //     function getLS_Id(){
    //         let datos = localStorage.getItem("ls_Id");
    //         _id = JSON.parse(datos);
    //     }
    //     return {sum_Id, get_Id,set_LS_Id,getLS_Id};

    // })();

    agregarTropa.addEventListener("click", () => {

        let _numLote = numLote.value;
        if( _numLote== "") _numLote = "01";

        let _Tropa = {
            tropa: numTropa.value,
            lote: _numLote
        }

        Tropa.set_Tropa(_Tropa);
        Tropas.set_Tropas(_Tropa);
        // document.querySelector('#datatablesSimple tbody').innerHTML = ventanaEditTropa;
        document.querySelector('#datatablesSimple tbody').innerHTML += `<tr><td>${Tropa.get_Tropa().tropa}</td><td>${Tropa.get_Tropa().lote}</td></tr>`;
        numTropa.focus();
        
    });
    
    btnGuardarLista.addEventListener("click", () => {
        
        if (Tropas.get_Tropas().length != 0) {
            Lista_Tropas.getLSList_Tropas();
            Lista_Tropas.set_List_Tropas(Tropas.get_Tropas());
            Lista_Tropas.setLSList_Tropas();
            location.reload();
            return;
        }
        alert("No hay tropas por guardar")
    });

});