let arr = [];
let input = document.querySelector(".input_box");
let ul = document.querySelector(".tasklist");

if (localStorage.getItem("allTask")) {
    let stringArr = localStorage.getItem("allTask");
    arr = JSON.parse(stringArr);

    for (let i = 0; i < arr.length; i++){
        let li = document.createElement("li");
        
        li.innerText = arr[i];
        li.addEventListener("dblclick", function () {
            li.remove();
        })
        ul.appendChild(li);
        li.setAttribute("class", "task");
    }
}

input.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        let task = input.value;
        
        let li = document.createElement("li");
        
        li.innerText = task;
        arr.push(task);
        let stringArr = JSON.stringify(arr);
        localStorage.setItem("allTask", stringArr);
        li.addEventListener("dblclick", function (e) {
            li.remove( );
        })
        ul.appendChild(li);
        input.value = "";
        li.setAttribute("class", "task");
    }
});