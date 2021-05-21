// <a href = "www.google.com" download="file.json"></a>
const json2xls = require("json2xls");

let download = document.querySelector(".download");
download.addEventListener("click", function () {
    // const data = JSON.stringify(worksheetDB);
    // // blob
    // // excel -> npm xlsx hw

    // var jsonData = JSON.parse(body);
    var xls = json2xls(worksheetDB);
    // fs.writeFileSync(path.join(__dirname, "ipl_2020", teamName, batsmenNameWithoutJson + ".xlsx"), xls, 'binary');
    const blob = new Blob([data], { xls: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // converts data to file of this type
    const url = window.URL.createObjectURL(blob); // creates file to url
    // download btn
    let a = document.createElement("a");
    // download
    a.download = "file.json"; // downloads in this file
    a.href = url; // url contains data
    a.click();
})

{/* <input type="file" class="open-file"> */}
// let input = document.querySelector(".open-file");
// input.addEventListener("change", function () {
//     let files = input.files;
//     let reqFileObj = files[0];
//     var fr = new FileReader();
//     fr.readAsText(reqFileObj);
//     fr.addEventListener("load", function () {
//         // data;
//         // excel
//         console.log(fr.result);
//     })
// // Json parse 
// // sheetdB-> current data
// // ui render 
//         })
//         // ui empty ->worksheetDB empty