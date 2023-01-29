// /* set up XMLHttpRequest */

// $(document).ready(function(){

//     const url = "Datos.xlsx";
//     let oReq = new XMLHttpRequest();
//     oReq.open("GET", url, true);
//     oReq.responseType = "arraybuffer";
    
//     oReq.onload = function(e) 
//     {
//         let info = readData();
//         console.log(info);
        
//         function readData()
//         {
//             let arraybuffer = oReq.response;

//             /* convert data to binary string */
//             let data = new Uint8Array(arraybuffer);
//             let arr = new Array();
//             for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//             let bstr = arr.join("");

//             /* Call XLSX */
//             let workbook = XLSX.read(bstr, {type:"binary"});

//             /* DO SOMETHING WITH workbook HERE */
//             let first_sheet_name = workbook.SheetNames[0];

//             /* Get worksheet */
//             let worksheet = workbook.Sheets[first_sheet_name];
//             let info = XLSX.utils.sheet_to_json(worksheet,{raw:true});

//             return info;

//         }
//     }
    
//     oReq.send();

// })