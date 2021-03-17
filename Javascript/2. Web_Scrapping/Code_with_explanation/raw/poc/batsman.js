//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard
//task -> get Bowlers name and wickets

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");//used to select specific data from html

request(url,cb); //request url from server
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

//===========================================================METHOD-1=================================================================================
function extractHtml(html){

    let selectorTool = cheerio.load(html); //loading html
    let teamName= selectorTool(".header-title.label");   //got teamname
    let batsmenTable = selectorTool(".table.batsman")   //got table

    let k=0;
    for(let i = 0;i<batsmenTable.length;i++){
        let singleInning = selectorTool(batsmenTable[i]).find("tbody tr"); // gets 1st Innings batsmen table's rows
        let tName = selectorTool(teamName[k]).text(); //got Delhi Capitals INNINGS (20 overs maximum)
        tName = tName.split("INNINGS")[0]; //got Delhi Capitals only
        tName.trim(); //removed extra spaces
        for(let j=0;j<singleInning.length;j++){
            let allCol = selectorTool(singleInning[j]).find("td"); // get columns of each row
            if(allCol.length == 8){ // focat rows hata di (apnne dekha ki->jin rows me 8 cols the vo shi t)
                let name = selectorTool(allCol[0]).text(); //name was in 1st column
                console.log(name+" of "+tName);
            }
        }
        console.log("``````````````````````````````````````````````````````"); // This line indicates Inning 1 is Over!
        k++;
    }
}

/*
===========================================================METHOD-2=================================================================================
function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamNameElemArr = selectorTool(".Collapsible h5");
    let teamNameArr = [];
    for(let i=0;i<teamNameElemArr;i++){
        let teamName = selectorTool(teamNameElemArr[i]).text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        teamNameArr.push(teamName);
    }

    let batsmantableArr = selectorTool("table.batsman");

    for(let i=0;i<batsmantableArr.length;i++){
        let batsmanName = selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell");

        for(let j=0;j<batsmanName.length;j++){
            let name = selectorTool(batsmanName[j]).text();
            console.log(name+" of "+teamNameArr[i]);
        }
        console.log("````````````````````````````````````````````````");
    }
}
*/

