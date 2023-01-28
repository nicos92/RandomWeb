document.addEventListener('DOMContentLoaded', () => {


    sorteo.addEventListener("click", () => {

        let nroAzar = Math.floor(Math.random() * 11) + 1;
        // let sector = "id" + nroAzar;

        // if ( nroAzar == 1){
        //     console.log(sector);
        //     sectorSorteado.innerHTML = "Playa de Faena";
        // }

        
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

    })
    


});