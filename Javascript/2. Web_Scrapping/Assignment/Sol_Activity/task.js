const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("request"); 

let folder = "ipl_2020";

function makeFolder(name){
    let pathOfFolder = path.join(__dirname,folder,name);
    if(fs.existsSync(name)==false){
        fs.mkdirSync(pathOfFolder);
    }
}

function fileCreator(teamName,playerName){
    let filePath = path.join(__dirname,folder,teamName,playerName + ".json");
    if(fs.existsSync(filePath) == false){ 
        let file = fs.createWriteStream(filePath); 
        file.end();
    }
}

function extractTeamResult(teamResultPageHtml){
    let selectorTool = cheerio.load(teamResultPageHtml);
    let teamName= selectorTool(".header-title.label");   
    let batsmenTable = selectorTool(".table.batsman");

    let des = selectorTool(".match-info.match-info-MATCH .description").text();
    let venue = des.split(",")[1];
    let date = des.split(",")[2];
    let result = selectorTool(".match-info.match-info-MATCH .status-text").text();

    let k=0;
    for(let i = 0;i<batsmenTable.length;i++){
        let row = selectorTool(batsmenTable[i]).find("tbody tr"); 
        let tName = selectorTool(teamName[k]).text();
        tName = tName.split("INNINGS")[0]; 
        tName = tName.trim();
        let opp = selectorTool(teamName[k^1]).text(); //(0^1)=1 || (1^1)=0
        opp = opp.split("INNINGS")[0]; 
        opp = opp.trim();

        for(let j=0;j<row.length;j++){
            let allCol = selectorTool(row[j]).find("td");
            let playerObj = [];
            let playername;
            if(allCol.length == 8){ 
                playername = selectorTool(allCol[0]).text();
                let run = selectorTool(allCol[2]).text(); 
                let ball = selectorTool(allCol[3]).text(); 
                let fours = selectorTool(allCol[5]).text(); 
                let sixes = selectorTool(allCol[6]).text(); 
                let sr = selectorTool(allCol[7]).text(); 

                let obj = {
                    "runs":run,
                    "balls":ball,
                    "fours":fours,
                    "sixes":sixes,
                    "sr":sr,
                    "date":date,
                    "venue":venue,
                    "result":result,
                    "opponentName":opp,
                };

                playerObj.push(obj);

                fileCreator(tName,playername);

                let file_path = path.join(__dirname, folder, tName,playername + ".json");
                // console.log(file_path);

                if (fs.existsSync(file_path) == false){
                    fs.writeFileSync(file_path, JSON.stringify(playerObj));
                }
                else{
                    let data = fs.readFileSync(file_path, "UTF-8");

                    // console.log(data);

                    if(data.length == 0){
                        fs.writeFileSync(file_path, JSON.stringify(playerObj));
                    }
                    else{
                        data = JSON.parse(data);
                        data.push(obj);
                        fs.writeFileSync(file_path, JSON.stringify(data));
                    }
                }

                
            }
        }
        k++;
    }
}

function getTeamResult(teamResultLink){
    request(teamResultLink,cb)
    function cb(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            extractTeamResult(html);
        }
    }
}

function extractAllResult(AllResultHtml){
    let selectorTool = cheerio.load(AllResultHtml);
    let allResultsAnchor = selectorTool(".match-info-link-FIXTURES");
    for(let i=0;i<allResultsAnchor.length;i++){
        let teamResultLink = "https://www.espncricinfo.com" + selectorTool(allResultsAnchor[i]).attr("href");
        getTeamResult(teamResultLink);
    }
}

function extractTeamNames(TablePageHtml){
    let selectorTool = cheerio.load(TablePageHtml);
    let teamNames = selectorTool(".table.table-sm.standings-widget-table.text-center.mb-0.border-bottom h5");
    for(let i=0;i<teamNames.length;i++){
        let name = selectorTool(teamNames[i]).text();
        makeFolder(name);
    }
}

function getTeamNames(tableLink,resultPage){
    request(tableLink,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            extractTeamNames(html);
        }
    }
    
    request(resultPage,call)
    function call(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            extractAllResult(html);
        }
    }
}

function extractTablePage(MainPageHtml){
    let selectorTool = cheerio.load(MainPageHtml);
    let navLinks = selectorTool(".jsx-850418440.nav-item")
    let tableLink = "https://www.espncricinfo.com" + selectorTool(navLinks[2]).find("a").attr("href");
    let resultPage = "https://www.espncricinfo.com" + selectorTool(".widget-items.cta-link a").attr("href");
    getTeamNames(tableLink,resultPage);
}

make_iplfolder();
function make_iplfolder(){
    let pathF = path.join(__dirname,folder)
    fs.mkdirSync(pathF);
}
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        extractTablePage(html);
    }
}