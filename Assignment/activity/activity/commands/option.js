let fs = require("fs");
const helpfnObj = require("./help");
let optionChose = false;

function options(input,filepath) {
//input[0] -s ,input[1] -b ,....input[-1]-filepath
    let data = fs.readFileSync(filepath, 'utf8');
    for(let i=0;i<input.length-1;i++){
        if(input[i]=="-s"){
            data = singBreak(data);
        }
        else if(input[i]=="-n"&&optionChose==false){
            optionChose=true;
            data = numberingAll(data);
        }
        else if(input[i]=="-b"&&optionChose==false){
            optionChose=true;
            data = numberingNonEmpty(data);
        }
        else{
            if(optionChose == false || input[i] != "-s"){
                console.log("Wrong Input ! Please choose any of these options only :\n");
                helpfnObj.helpfn(input);
            }
        }
    }
}

function singBreak(data){
    console.log("=========Converting big line breaks into a singular line break=======");
    data=data.replace(/\n\s*\n/g, '\n\n');
    console.log(data);
    return data;
}

function numberingAll(data){
    let lines = data.split(/\r?\n/);
    let ans = "";
    for(let i=0; i<lines.length; i++){
        console.log(i+1, ". ", lines[i]);
        ans += (i+1 + ". " + lines[i] + "\n");
    }
    return ans;
}

function numberingNonEmpty(data){
    let lines = data.split(/\r?\n/);
    let ans = "";
    let count = 0;
    for(let i=0; i<lines.length; i++){
        if (lines[i] != ""){
            count++;
            console.log(count, ". ", lines[i]);
            ans += (count + ". " + lines[i] + "\n")
        }
        else{
            console.log(lines[i]);
            ans += (lines[i] + "\n");
        }
    }
    return ans;
}

module.exports = {
    optionFn:options,
}
