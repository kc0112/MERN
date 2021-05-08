let addbtn = document.querySelector(".add-sheet_container");
let sheetlist = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let fontFamily = document.querySelector(".font-family");
let fontBtn = document.querySelector(".font-size");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".Italic");
let underlineElem = document.querySelector(".underline");
let allAlignBtns = document.querySelectorAll(".alignment-container>*");
let allBUIBtns = document.querySelectorAll(".BUI_container>*");
let sheetDB = worksheetDB[0]; // initally ek db rhega prog start hte hi
let i = 2;
initUI(); // initially assign styles to sheet1

//*******************************menu***************************************


// =================================alignment===================================

leftBtn.addEventListener("click", function (e) {
    let address = addressBar.value; //A1
    let { rid, cid } = getRidCidFromAddress(address); //00
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    // 1. align left
    cell.style.textAlign = "left";

    // 2. remove active state from all btns and add active state to selected btn
    for (let i = 0; i < allAlignBtns.length; i++){
        allAlignBtns[i].classList.remove(".active-btn");
    }
    leftBtn.classList.add(".active-btn");
    
    // 3. add to db 
    let cellObj = sheetDB[rid][cid];
    cellObj.halign = "left";
})

rightBtn.addEventListener("click", function (e) {
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    // db update 
    let cellObj = sheetDB[rid][cid];
    cellObj.halign = "right";
})

centerBtn.addEventListener("click", function (e) {
    let address = addressBar.value;
    let { rid, cid } = getRidCidFromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    // db update 
    let cellObj = sheetDB[rid][cid];
    cellObj.halign = "center";
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

//=============================formatting================

// change font style
fontFamily.addEventListener("change", function () {
    let address = addressBar.value; //A1
    let { rid, cid } = getRidCidFromAddress(address); //00
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];

    // set font_family + add to db
    let cfont = fontFamily.value;;
    cell.style.fontFamily = cfont
    
    cellObj.fontFamily = `${cfont}`;
})

// changes font-size
fontBtn.addEventListener("change", function () {
    let address = addressBar.value; //A1
    let { rid, cid } = getRidCidFromAddress(address); //00
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    // set fontSize + add to db
    let fontSize = fontBtn.value;
    cell.style.fontSize = fontSize + "px";
    cellObj.fontSize = `${fontSize}`;
})

// bold 
boldElem.addEventListener("click", function () {
    let address = addressBar.value; //A1
    let { rid, cid } = getRidCidFromAddress(address); //00
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let isActive = boldElem.classList.contains("active-btn");
    let cellObj = sheetDB[rid][cid];

    // if btn not active -> active state + bold krdo + add in db
    if (isActive == false) {
        boldElem.classList.add("active-btn");
        cell.style.fontWeight = "bold";
        cellObj.bold = true;
    }
    // if btn active -> active state + bold krdo + add in db
    else {
        boldElem.classList.remove("active-btn");
        cell.style.fontWeight = "normal";
        cellObj.bold = false;
    }
})

//italic
italicElem.addEventListener("click", function () {
    let isActive = italicElem.classList.contains("active-btn");
    let address = addressBar.value; //A1
    let { rid, cid } = getRidCidFromAddress(address); //00
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];

    // if btn not active -> active state + italic krdo + add in db
    if (isActive == false) {
        italicElem.classList.add("active-btn");
        cell.style.fontStyle = "italic";
        cellObj.italic = true;
    }
    // if btn active -> active state + italic krdo + add in db
    else {
        cell.style.fontStyle = "normal";
        italicElem.classList.remove("active-btn");
        cellObj.italic = false;
    }
})

//underline
underlineElem.addEventListener("click", function () {
    let isActive = underlineElem.classList.contains("active-btn");
    let address = addressBar.value; //A1
    let { rid, cid } = getRidCidFromAddress(address); //00
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];

    // if btn active -> active state + underline krdo + add in db
    if (isActive == false) {
        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active-btn");
        cellObj.underline = true;
    }
    // if btn active -> active state + underline krdo + add in db
    else {
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active-btn");
        cellObj.underline = false;
    }
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
        
        let cellObj = sheetDB[rid][cid];

        // BUI -> inactive krdo sare btns + db k acc jo active the unko active krdo
        for (let i = 0; i < allBUIBtns.length; i++) {
            allBUIBtns[i].classList.remove("active-btn");
        }
        if (cellObj.bold == true) {
            boldElem.classList.add("active-btn");
        }
        if (cellObj.italic == true) {
            italicElem.classList.add("active-btn");
        }
        if (cellObj.underline == true) {
            underlineElem.classList.add("active-btn");
        }

        // alignment -> inactive krdo sare btns + db k acc jo active the unko active krdo
        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active-btn");
        }
        if (cellObj.halign == "left") {
            leftBtn.classList.add("active-btn")
        } else if (cellObj.halign == "right") {
            rightBtn.classList.add("active-btn")
        } else if (cellObj.halign == "center") {
            centerBtn.classList.add("active-btn")
        }

        // fontSize -> set to cell's previous set value
        fontBtn.value = cellObj.fontSize;

        // fontFamilty -> set to cell's previous set value
        fontFamily.value = cellObj.fontFamily;
    })
}
allCells[0].click();

// save text to db (blur event -> detects when element is out of focus)
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value; //A1
        let { rid, cid } = getRidCidFromAddress(address); //00
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        let cellObj = sheetDB[rid][cid];
        cellObj.value = cell.innerText;
    });
}

// =================================sheet========================================

// first sheet already active + default present
firstSheet.addEventListener("click", function (e) {
    let sheetArr = document.querySelectorAll(".sheet");
    sheetArr.forEach((filter) => {
        filter.classList.remove("active");
    })
    firstSheet.classList.add("active");

    // set sheetDb to current active sheet + restore data on UI acc to db
    sheetDB = worksheetDB[0];
    setUI(sheetDB);
})

// click + => 1.a.add new sheet + b.create a new db for this sheet+display empty sheet | 2. a.set eventListener on each sheet(active)+display empty sheet + b.set sheetDb to current active sheet+restore data on UI
addbtn.addEventListener("click", addSheet);
function addSheet(e) {
/*1a*/let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetidx",i);
    newSheet.innerText = `sheet${i}`
    sheetlist.append(newSheet);
    i = i + 1;

// b.create a new db for this sheet 
    initCurrentSheetDb(); // create a new sheetDB pushed into worksheetDB

/*2a*/newSheet.addEventListener("click", function (e) {
        let sheetArr = document.querySelectorAll(".sheet");
        sheetArr.forEach((filter) => {
            filter.classList.remove("active");
        })
        newSheet.classList.add("active");
        initUI(); // display empty sheet on UI
// b.set sheetDb to current active sheet + restore data on UI
        let sheetIdx = newSheet.getAttribute("sheetidx");
        
        sheetDB = worksheetDB[sheetIdx - 1]; // selects current sheet db
        setUI(sheetDB); // display on UI acc to sheetDB
        })
}

// restores data+styles of current active sheet on UI
function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.style.fontStyle = italic == true ? "italic" : "normal";
            cell.style.textDecoration = underline == true ? "underline" : "none";
            cell.style.fontFamily = fontFamily
            cell.style.fontSize = fontSize + "px";
            cell.style.textAlign = halign
            cell.innerText = value; 
        }
    }
}

// sets initial styles on empty page
function initUI() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "10px";
        allCells[i].style.textAlign = "left";
        allCells[i].innerText = "";
    }
}




