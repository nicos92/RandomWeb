
document.addEventListener('DOMContentLoaded', () =>{

    const closure = (function(){

        let _sector;
    
        function setTropa(sector){
            _sector = sector;
            return _sector;
        }
    
        function getTropa(){
            return _sector;
        }
    
        return {setTropa, getTropa};
    
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
    
    
    if( Lista_Tropas.getLSList_Tropas().length == 0) windowCards.innerHTML += cardSinTropas();
    

    windowCards.innerHTML += cards();


    function query(){

        function queryId(e){

        }


        
    }

    function sortearTropa(select){

        let listas_tropas = Lista_Tropas.getLSList_Tropas();

        let lista = listas_tropas[select];
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
    query();




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

                    card += `<button id="${i}" type="button" class="btn btn-primary "  data-bs-toggle="modal" data-bs-target="#exampleModal" >Sortear</button>`;

                        // card += `<a id="${i}" href="#" class="btn btn-primary btn-icon-split">`;
                        //     card += `<span class="icon text-white-50">`;
                        //         card += `<i class="fas fa-flag"></i>`;
                        //     card += `</span>`;
                        //     card += `<span class="text"> Sortear</span>`;
                        // card += `</a>`;

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


});