'use_strict';
let clrbtn = document.querySelectorAll(".filter_color")
let workArea = document.querySelector(".maincontainer");
let body = document.body;
let bothbtnArr = document.querySelectorAll(".icon-container");
let plusBtn = bothbtnArr[0];
let closeBtn = bothbtnArr[1];
let deleteState = false; //close btn not clicked
let colorArr = ["pink", "blue", "green", "black"];
let taskArr = [];

// getting + displaying last session saved tasks
if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    for (let i = 0; i < taskArr.length; i++){
        let { id, color, task } = taskArr[i];
        createTask(color,task,false,id); //displaying task
    }
}

// coloring the background
for (let i = 0; i < clrbtn.length; i++){
    clrbtn[i].addEventListener("click", function (e) {
        let color = clrbtn[i].classList[1];  // classList = filter_color pink  -> classList[1] = pink
        workArea.style.backgroundColor = color; // color changed
    })
}

// plus button -> modal pops
plusBtn.addEventListener("click", createModal);
    // create modal => a.modal exists->1.create+2.addfunc  b.not exists->textArea=blank
    function createModal() {
        let modal_container = document.querySelector(".modal_container");

        // if modal container doesnt exists => 1.create a modal + 2.add modal functions(handleModal())
        if (modal_container == null) {
    /*1*/   modal_container = document.createElement("div");
            modal_container.setAttribute("class", "modal_container");
            modal_container.innerHTML =
            `<div class="input_container">
                <textarea class="modal_input" placeholder="Enter Your Text"></textarea>
            </div>
            <div class="modal_filter_container">
                <div class="filter pink"></div>
                <div class="filter blue"></div>
                <div class="filter green"></div>
                <div class="filter black"></div>
            </div>`;
            /* <div class ="btn"><input type="submit" value="Add Note"></div>*/
            body.appendChild(modal_container);

            // handle modal functions
    /*2*/   handleModal(modal_container);
        }
        // modal container exists => textArea = blank
        let textArea = modal_container.querySelector(".modal_input");
        textArea.value = "";
    }
    // modal functions => // a.for setting ticket color => 1.default setting + 2.color selecting
    function handleModal(modal_container) {
        
    // a. for setting ticket color => 1.default setting + 2.color selecting
    /*1*/let ccolor = "black";  // default set black
        let modalFilters = document.querySelectorAll(".modal_filter_container .filter"); // all color options selected
        modalFilters[3].classList.add("border"); // default black pr border(Selected => white border)

    /*2*/ // set border on chosen option + remove border from previous chosen option
        for (let i = 0; i < modalFilters.length; i++) {
            modalFilters[i].addEventListener("click", function (e) {
                modalFilters.forEach((filter) => {
                    filter.classList.remove("border");
                });
                modalFilters[i].classList.add("border");
                ccolor = modalFilters[i].classList[1]; // classList => filter pink
            })
        }

    // b. textArea press Enter => modal vanishes + creates task ticket(createTask())
        let textArea = document.querySelector(".modal_input");
        textArea.addEventListener('keydown', function (e) {
            if ((e.key == "Enter") && (textArea.value != " " ) ){
                modal_container.remove(); 
                createTask(ccolor,textArea.value,true); // true => ui se creating task tickets + no id sent
            }
        })  
        
    }
    // creating task tickets => 1.create task Ticket + 2.add ticket to local storage + 3.adding eventListeners(change color,delete task,edit Task)
    function createTask(clr,text,flag,id){
        let taskContainer = document.createElement("div");
        let uidfn = new ShortUniqueId(); 
        let uid = id || uidfn(); // previous stored id || random generated id

        // 1.creating task ticket => add chosen color to class(css) + id + text 
        taskContainer.setAttribute("class", "task_container");
        taskContainer.innerHTML = `
            <div class = "task_filter ${clr}"></div>
            <div class = "task_desc_container">
                <h3 class = "uid">#${uid}</h3>
                <div class = "task_desc" contenteditable="true">${text}</div>
            </div>`
        workArea.appendChild(taskContainer);
        
        //2.modal se add kia => add to local storage
        if (flag === true) {
            let obj = {
                "id": `${uid}`,
                "color": clr,
                "task": text,
            };
            taskArr.push(obj); // pushed ticket data
            let finalArr = JSON.stringify(taskArr); // stringify
            localStorage.setItem("allTask", finalArr); // add to local storage
        }
        
        //3. adding eventListeners
        taskFilter = taskContainer.querySelector(".task_filter");
        let taskDesc = taskContainer.querySelector(".task_desc");
        taskFilter.addEventListener("click", changeColor); 
        taskContainer.addEventListener("click", deleteTask);
        taskDesc.addEventListener("keypress", editTask);
    }
    //  eventListeners
        // 1.tickets ke color pr click kro to color change
        function changeColor(e) {
            let taskFilter = e.currentTarget; // jispr eventListener lgaya(TaskFilter)
            let cclr = taskFilter.classList[1]; // classList => task_filter pink
            let idx = colorArr.indexOf(cclr); // 0 -> pink
            let newIdx = (idx + 1) % 4; // next clr idx
            taskFilter.classList.remove(cclr); // classList => task_filter
            taskFilter.classList.add(colorArr[newIdx]); // classList => task_filter blue
        }
        // 2.if closebtn pressed => kisi bhi ticket pr click => deletes ticket + handle changes in localStorage
        function deleteTask(e) {
            let taskContainer = e.currentTarget;
            if (deleteState) { // closebtn pressed => delete ticket from 1.display + 2.localStorage
                let uidEle = taskContainer.querySelector(".uid"); // ".uid" => #hedjsk
                let uid = uidEle.innerText.split("#")[1]; // hedjsk
                for (let i = 0; i < taskArr.length; i++){
                    let { id } = taskArr[i];
                    if (id == uid) { 
                        taskArr.splice(i, 1); // remove that task ticket from taskArr
                        let finalArr = JSON.stringify(taskArr);
                        localStorage.setItem("allTask",finalArr); // store updated taskArr
                        taskContainer.remove(); // remove the ticket from display
                        break;
                    }
                }
            }
        }
        // 3.handle changes in localStorage  //editing is handled by <div contenteditable>
        function editTask(e) {
            let taskDesc = e.currentTarget; // ".task_desc"
            let uidEle = taskDesc.parentNode.children[0]; // ".uid" => #hedjsk
            let uid = uidEle.innerText.split("#")[1]; // hedjsk
            for (let i = 0; i < taskArr.length; i++){
                let { id } = taskArr[i]; 
                if (id == uid) { // if id in localStorage
                    taskArr[i].task = taskDesc.value; // change text
                    let finalArr = JSON.stringify(taskArr);
                    localStorage.setItem("allTask",finalArr); // add in local storage
                    break;
                }
            }
        }

// close btn pr click => 1.deleteState active 
closeBtn.addEventListener("click", setDeleteState);
    // 1.setting delete state
    function setDeleteState(e) {
        let closeBtn = e.currentTarget;
        if (deleteState == false) { //if iitially not false -> set active 
            closeBtn.classList.add("active"); // icon-container "active" (css)
        }
        else {
            closeBtn.classList.remove("active"); // icon-container
        }
        deleteState = !deleteState; // change state
    }

