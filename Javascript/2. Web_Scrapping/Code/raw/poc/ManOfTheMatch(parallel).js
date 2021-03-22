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

function printMotm(link){
    request(link,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }else{
            extractMotm(html); 
        }
    }
}



function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamBlocks = selectorTool(".col-md-8.col-16");
    for(let i=0;i<teamBlocks.length;i++){ //for every team block
        Anchor = selectorTool(teamBlocks[i]).find(".match-cta-container a"); 
        scorecardAnchor = selectorTool(Anchor[2]).attr("href");  
        let fullLink = "https://www.espncricinfo.com"+scorecardAnchor;
        printMotm(fullLink);
    }
    
}