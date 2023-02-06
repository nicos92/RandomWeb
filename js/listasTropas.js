
document.addEventListener('DOMContentLoaded', () =>{

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



    windowCards.innerHTML += cards();




function cards(){

    let listas_tropas = Lista_Tropas.getLSList_Tropas();

    console.log(listas_tropas);
    let card = ``;

    for( let i=0 ; i <= listas_tropas.length - 1 ; i++){
        let tropa = 

        card += `<div class="col-lg-6">`;
            card += `<div class="card shadow mb-4">`;
                card += `<div class="card-header py-3">`;
                    card += `<h6 id="titlleCard" class="m-0 font-weight-bold text-primary" >Grupo "${i+1}"</h6>`;
                card += `</div>`;
                card += `<div id="bodyCard" class="card-body fs-5">`;
                    
                for( j=0 ; j <= listas_tropas[i].length - 1 ; j++){
                    card += listas_tropas[i][j].tropa + "-" + listas_tropas[i][j].lote + " ; ";
                }



                    

                card += `</div>`;
                card += `<div class="row " >`;
                    card += `<div class="col-lg6 d-flex justify-content-around">`;
                        card += `<a href="#" class="btn btn-primary btn-icon-split">`;
                            card += `<span class="icon text-white-50">`;
                                card += `<i class="fas fa-flag"></i>`;
                            card += `</span>`;
                            card += `<span class="text"> Sortear</span>`;
                        card += `</a>`;
                        card += `<a href="#" class="btn btn-warning btn-icon-split">`;
                            card += `<span class="icon text-white-50">`;
                                card += `<i class="fas fa-exclamation-triangle"></i>`;
                            card += `</span>`;
                            card += `<span class="text"> Editar</span>`;
                        card += `</a>`;
                    card += `</div>`;
                card += `</div>`;
                card += `<div class="my-2"></div>`;
            card += `</div>`;
        card += `</div>`;

    }
    let t = listas_tropas[0][0];

    console.log(t);


    return card;



}


});