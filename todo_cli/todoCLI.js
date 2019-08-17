// const fs = reqiure('fs');
const readline = require('readline');
const fs = require('fs');
// const fs = require('fs');


const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// const interface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// The Menu
// When the todoCLI.js is first executed, a menu as shown below should be displayed. These are all the options the user should be able to perform.

// $ node todoCLI.js

// Welcome to Todo CLI!
// --------------------
// (v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
// >



const welcome = "Welcome to Todo CLI! \n--------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n"

function menu() {
    let nextNumber;
    fs.readFile('task_list.txt', (err, data) => {
        if (err) {
            console.log(error);
        } else {
            let temp = data.toString().split('\n');
           return nextNumber = parseInt( temp[temp.length-1][0]) + 1;            
        }
    })
    interface.question(welcome, (answer) => {
        let num;
        if (answer.includes("c")){
            num = answer.slice(1);
        }
        switch (answer) {
            case "v":
                return viewTask();
            break;
            case "n":
                return addTask(nextNumber);
                break;
            case `c${num}`:
                return completeTask(num);
                break;
            case "dX":
                console.log("Delete Task");
                break;
            case "q":
                console.log("Quit");
                process.exit();
                break;
            default:
                console.log("Invaled anwser")
        }
        // console.log("finish")
        process.exit();
    })
}


// View


function viewTask() {
    fs.readFile('task_list.txt', (err, data) => {
        if (err) {
            console.log("error reading file");
        } else {
            let task = data.toString().split("\n");
            console.log(`${task.join('\n')}\n`)
            menu()
        }
    })

};

// Add

function addTask(num) {
    interface.question('What is the new task?', (anwser) => {
        let task = `\n${num} [ ] ${anwser}`
        fs.appendFile('task_list.txt', task, (err) => {
            if (err) {
                console.log('problem adding new task')
            } else {
                console.log("new Task added")
                menu();
                return num++
            }
        })

    })
}


// Complete
// From the Todo Menu pressing cX where X refers to the index of a Todo item then Enter should mark that item as complete. Tell the user which item was marked. Then, re-display the Todo Menu.

// $ node todoCLI.js

// Welcome to Todo CLI!
// --------------------
// (v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
// > c2

// Completed "Buy Snickerdoodles"

// (v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
// >
// When displaying the list, completed items should have a checkmark (i.e. ✓) besides their title. For example:

// 0 [✓] Take out the trash

// function completeTask (){
//     fs.readFile()
// }
function completeTask(n){
    fs.readFile('task_list.txt', (err, data) =>{
        if(err){
            console.log(" Error reading file")
        } else {
           let comTask =data.toString().split('\n')[n];
           let task = comTask.slice(0,3) + "✓" + comTask.slice(4)
           console.log(task)
        //    need to replace Task in file
           menu();
        }
    })
};










menu();