let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request = require("request");
let cheerio = require("cheerio");

request(url,cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) 
    }
}

function extractMotm(html){
    let selectorTool = cheerio.load(html);
    let Playername = selectorTool(".best-player-name").text();
    let teamName = selectorTool(".best-player-team-name").text()
    console.log(Playername,":",teamName);
}

function printMotm(linkArr,i){
    if(i==linkArr.length){
        return;           
    }
    request(linkArr[i],cb); 
    function cb(error,response,html){
        if(error){
            console.log(error);
        }else{
            extractMotm(html); 
            printMotm(linkArr,i+1); 
        }
    }
}



function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamBlocks = selectorTool(".col-md-8.col-16");

    let fullLink = [];
    for(let i=0;i<teamBlocks.length;i++){
        let Anchor = selectorTool(teamBlocks[i]).find(".match-cta-container a");  
        let scorecardAnchor = selectorTool(Anchor[2]).attr("href");  
        fullLink.push("https://www.espncricinfo.com"+scorecardAnchor);  
    }
    printMotm(fullLink,0);
}