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
            extractMotm(html); //console.log(html);
        }
    }
}



function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamBlocks = selectorTool(".col-md-8.col-16");
    for(let i=0;i<teamBlocks.length;i++){ //for every team block
        Anchor = selectorTool(teamBlocks[i]).find(".match-cta-container a"); //get anchor tag for ith team
        scorecardAnchor = selectorTool(Anchor[2]).attr("href");  //getting scorecard link for ith team
        let fullLink = "https://www.espncricinfo.com"+scorecardAnchor;//we dont get link with homepage so we should add it else link wont work
        printMotm(fullLink);//sending each team link
    }
    
}