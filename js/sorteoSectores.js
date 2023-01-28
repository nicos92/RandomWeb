document.addEventListener('DOMContentLoaded', () => {

    let contador = 0;

    sorteo.addEventListener("click", () => {
        iniSorteo();

    })


function iniSorteo(){
    sectorSorteado.style.backgroundColor = "";

    sectorSorteado.innerHTML = '.';

    setTimeout( () => {
        sectorSorteado.innerHTML = '..';
    }, 500);

    setTimeout( () => {
        sectorSorteado.innerHTML = '...';
    }, 1000);


    setTimeout( () => {
        const seleccion = setInterval(() => {
            contador +=1;
            let nroAzar = Math.floor(Math.random() * 11) + 1;
            
            switch (nroAzar) {
                case 1:
                    sectorSorteado.innerHTML = '01 - Playa de faena';
                    
                    break;
                case 2:
                    sectorSorteado.innerHTML = "02 - Cuarteo";
                    
                    break;
                case 3:
                    sectorSorteado.innerHTML = "03 - Despostada";
                    
                    break;
                case 4:
                    sectorSorteado.innerHTML = "04 - Menudencias";
                    
                    break;
                case 5:
                    sectorSorteado.innerHTML = "05 - Triperia";
                    
                    break;
                case 6:
                    sectorSorteado.innerHTML = "06 - Exteriores - Corrales";
                    
                    break;
                case 7:
                    sectorSorteado.innerHTML = "07 - Playa de Emergencias";
                    
                    break;
                case 8:
                    sectorSorteado.innerHTML = "08 - Melter";
                    
                    break;
                case 9:
                    sectorSorteado.innerHTML = "09 - Lavadero de Roldanas";
                    
                    break;
                case 10:
                    sectorSorteado.innerHTML = "10 - Nonatos";
                    
                    break;
                case 11:
                    sectorSorteado.innerHTML = "11 - Saladero";
                    
                    break;
            
                default:
                    break;
            }

            if( contador > 20){
                clearInterval(seleccion);
                contador = 0;
                sectorSorteado.style.fontWeight = "700";
                sectorSorteado.style.backgroundColor = "#AFEEEE";
            }

        }, 100)

    }, 1500)

}


});