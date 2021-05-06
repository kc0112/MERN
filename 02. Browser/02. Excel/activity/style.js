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

addbtn.addEventListener("click", addSheet);
firstSheet.addEventListener("click", function (e) {
    let sheetArr = document.querySelectorAll(".sheet");
    sheetArr.forEach((filter) => {
        filter.classList.remove("active");
    })
    firstSheet.classList.add("active");
})

function addSheet(e) {
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetidc", "i");
    newSheet.innerText = `sheet${i}`
    sheetlist.append(newSheet);
    i = i + 1;
    newSheet.addEventListener("click", function (e) {
        let sheetArr = document.querySelectorAll(".sheet");
        sheetArr.forEach((filter) => {
            filter.classList.remove("active");
        })
        newSheet.classList.add("active");
    })
}

for (let i = 0; i < allCells.length; i++){
    allCells[i].addEventListener("click", function handlecell() {
        let rid = Number(allCells[i].getAttribute("rid"));
        let cid = Number(allCells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        // allCells[i].style.border = "2px solid red"
    })
}
allCells[0].click();

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

function getCell() {
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    return cell;
}

function getRidCidFromAddress(address) {
    let cellColAdr = address.charCodeAt(0);
    let cellRowAdr = address.slice(1);
    let cid = cellColAdr - 65;
    let rid  = Number(cellRowAdr) - 1;
    return { rid,cid };
}

fontBtn.addEventListener("change", function () {
    let cell = getCell();
    let fontSize = fontBtn.value;
    cell.style.fontSize = fontSize+"px";
})