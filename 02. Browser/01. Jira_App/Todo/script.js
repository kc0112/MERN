let input = document.querySelector(".input_box");
let ul = document.querySelector(".tasklist");
input.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
   
        let task = input.value;
        input.value = "";
        let li = document.createElement("li");
        li.setAttribute("class", "task");
        li.innerText = task;
        li.addEventListener("dblclick", function () {
            li.remove();
        })
        ul.appendChild(li);
    }
});