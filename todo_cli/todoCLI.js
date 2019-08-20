const readline = require('readline');
const fs = require('fs');

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// The Menu

let fileName;
let nextNumber;
let taskList;
if (process.argv[2] === undefined) {
    fileName = 'task_list.txt';
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(error);
        } else {
            let temp = data.toString().split('\n');
            fileRead()
            return nextNumber = parseInt(temp[temp.length - 1][0]) + 1;
        }
    })
} else {
    fileName = process.argv[2];
    fs.readFile(fileName, (err, data) => {
        if (err) {
            fs.writeFile(fileName, "List is empty", (err) => {
                if (err) {
                    console.log("error in creating list file")

                } else {
                    taskList = "List is empty";
                    nextNumber = 0;
                }
            })
        } else {
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    console.log("error reading file");
                } else {
                    let temp = data.toString().split('\n');
                    fileRead()
                    return nextNumber = parseInt(temp[temp.length - 1][0]) + 1;
                }
            })
        }
    })
}
console.log(nextNumber)
const welcome = "Welcome to Todo CLI! \n--------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n"

function menu() {
    interface.question(welcome, (answer) => {
        let num;
        if (answer.includes("c") || answer.includes("d")) {
            answer.length < 2 ? answer = '' : num = answer.slice(1);
        }
        switch (answer.toLowerCase()) {
            case `v`:
                return viewTask();
                break;
            case `n`:
                return addTask(nextNumber);
                break;
            case `c${num}`:
                return completeTask(num);
                break;
            case `d${num}`:
                return deleteTask(num);
                break;
            case `q`:
                console.log("Farewell have a lovey day, don't forget to smile!!");
                process.exit();
                break;
            case `s`:
                return saveList();
                break;
            default:
                console.log("Invaled anwser, Please try again")
                menu()
        }
    })
}

// View

function viewTask() {
    let task = taskList.split("\n");
    console.log(`${task.join('\n')}\n`);
    menu();
};

// Add

function addTask(num) {
    interface.question('What is the new task?  ', (anwser) => {
        let message = `Added task: ${anwser}`
        let list = `\n${num} [ ] ${anwser}`
        if (num !== 0) {
            fs.appendFile(fileName, list, (err) => {
                if (err) {
                    console.log('problem adding new task');
                } else {
                    console.log(`Added task: ${anwser}\n`);
                    nextNumber++;
                    taskList += list;
                    menu();
                }
            })
        } else {
            let list = `${num} [ ] ${anwser}`
            fileWrite(list, message)
            taskList += list;
            return nextNumber++;
        }
    })
}

// Complete

function completeTask(n) {
    let list = taskList.split('\n')
    if (n > list.length) {
        console.log(`Task doesn't exist`);
        menu();
        return;
    }
    let comTask = list[n];
    let task = comTask.slice(0, 3) + "✓" + comTask.slice(4)
    list.splice(n, 1, task)
    list = list.join('\n');
    let message = `completed:${comTask.slice(5)} `;
    fileWrite(list, message);
};

// Delete

function deleteTask(n) {
    let list = taskList.split('\n');
    let result = [];
    let index = 0;
    let deletedTask;
    for (let i = 0; i < list.length; i++) {
        if (i !== parseInt(n)) {
            result.push(`${index}${list[i].slice(1)}`)
            index++;
        } else {
            deletedTask = `${list[i].slice(5)}`;
        }
    }
    nextNumber = index++
    list = result.join('\n');
    let message = `Deleted: ${deletedTask}`;
    fileWrite(list, message)
}

//  Save to new file:

function saveList() {
    interface.question("What is the new file name and type? ", (anwser) => {
        fs.writeFile(anwser, taskList, (err) => {
            if (err) {
                console.log('Error with file')
            } else {
                fileName = anwser;
                menu();
            }
        });
    })
}


// Read task file 

function fileRead() {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(" read error with reading file");
        } else {
            taskList = data.toString();
        }
    })
}

// write task file:

function fileWrite(list, message) {
    fs.writeFile(fileName, list, (err) => {
        if (err) {
            console.log('Error writing file');
        } else {
            console.log(`${message} \n`);
            taskList = list;
            menu();
        }
    })
}


menu();