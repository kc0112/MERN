
// ============================= top row => A B C =====================================
let topRow = document.querySelector(".top-row");
let str = "";
for (let i = 0; i < 26; i++) {
    str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`; 
}
topRow.innerHTML = str;

// ============================= left col => 1 2 3 =====================================
let leftCol = document.querySelector(".left-col");
str = ""
for (let i = 0; i < 100; i++) {
    str += `<div class='left-col_box'>${i + 1}</div>`
}
leftCol.innerHTML = str;

// ============================= grid 2d array =====================================
let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="row">`
    for (let j = 0; j < 26; j++) {
        str += `<div class='col' rid=${i} cid=${j} contenteditable="true"></div>`
    }
    str += "</div>";
}
grid.innerHTML = str;

// making database -> worksheet [sheetDB1[][],sheetDB2[][]------] 
worksheetDB = [];
function initCurrentSheetDb() {
    let sheetDB = [];
    for (let i = 0; i < 100; i++){
        let row = [];
        for (let j = 0; j < 26; j++){
            let cell = {
                bold : false,
                italic: false,
                underline: false,
                fontFamily:"Arial",
                fontSize: "10",
                halign: "left",
                value: "",
            }
            row.push(cell);
        }
        sheetDB.push(row);
    }
    worksheetDB.push(sheetDB);
}
initCurrentSheetDb();

