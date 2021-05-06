let addbtn = document.querySelector(".add-sheet_container");
let sheetlist = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let fontBtn = document.querySelector(".font-size");
let i = 2;

// =================================menu========================================

leftBtn.addEventListener("click", function (e) {
    let cell = getCell();
    cell.style.textAlign = "left";
})

rightBtn.addEventListener("click", function (e) {
    let cell = getCell();
    cell.style.textAlign = "right";
})

centerBtn.addEventListener("click", function (e) {
    let cell = getCell();
    cell.style.textAlign = "center";
})

// returns cell denoted in address-box
function getCell() {
    let address = addressBar.value; //A1
    let { rid, cid } = getRidCidFromAddress(address); //00
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    return cell;
}

// return row & col acc to grid
function getRidCidFromAddress(address) {
    let cellColAdr = address.charCodeAt(0); //A=>65
    let cellRowAdr = address.slice(1); //1
    let cid = cellColAdr - 65; //0
    let rid  = Number(cellRowAdr) - 1;//0
    return { rid,cid };//00
}

// changes font-size
fontBtn.addEventListener("change", function () {
    let cell = getCell();
    let fontSize = fontBtn.value;
    cell.style.fontSize = fontSize+"px";
})

// =================================formula=====================================



// =================================grid========================================

// click cell => address box = clicked cell location (A1)
for (let i = 0; i < allCells.length; i++){
    allCells[i].addEventListener("click", function handlecell() {
        let rid = Number(allCells[i].getAttribute("rid")); //0
        let cid = Number(allCells[i].getAttribute("cid")); //0
        let rowAdd = rid + 1; //1 
        let colAdd = String.fromCharCode(cid + 65);//A
        let address = colAdd + rowAdd;//A1
        addressBar.value = address;
    })
}
allCells[0].click();

// =================================sheet========================================

// first sheet already active + default present
firstSheet.addEventListener("click", function (e) {
    let sheetArr = document.querySelectorAll(".sheet");
    sheetArr.forEach((filter) => {
        filter.classList.remove("active");
    })
    firstSheet.classList.add("active");
})

// click + => 1.add new sheet + 2.set eventListener on each sheet(active)
addbtn.addEventListener("click", addSheet);
function addSheet(e) {
/*1*/let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetidx", "i");
    newSheet.innerText = `sheet${i}`
    sheetlist.append(newSheet);
    i = i + 1;
/*2*/newSheet.addEventListener("click", function (e) {
        let sheetArr = document.querySelectorAll(".sheet");
        sheetArr.forEach((filter) => {
            filter.classList.remove("active");
        })
        newSheet.classList.add("active");
    })
}




