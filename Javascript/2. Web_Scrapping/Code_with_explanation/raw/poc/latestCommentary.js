//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary
// task -> get the latest commentry 

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
let request = require("request");
let cheerio = require("cheerio"); //used to select specific data from html

request(url,cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractHtml(html) //console.log(html);
    }
}

function extractHtml(html){
    let selectorTool = cheerio.load(html); //loading html via cheerio in selectorTool
    let allCommentries = selectorTool(".d-flex.match-comment-padder,align-items-center .match-comment-long-text"); //selecting commentries section from inspect of page 
    //rule -> jab bhi indexing krni ho you have to first wrap in selectorTool and then access text() or html() 
    let lastComment = selectorTool(allCommentries[0]).text(); //latest commentry is pushed on the top of array (a[0])
    console.log(lastComment);
}

