const readline = require('readline');
const fs = require('fs');

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


// The Menu

let fileName;
let nextNumber;

if (process.argv[2] === undefined) {
    fileName = 'task_list.txt';
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(error);
        } else {
            let temp = data.toString().split('\n');
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

                    nextNumber = 0;
                }
            })
        } else {
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    console.log(error);
                } else {
                    let temp = data.toString().split('\n');
                    return nextNumber = parseInt(temp[temp.length - 1][0]) + 1;
                }
            })
        }
    })
}
console.log(nextNumber)
const welcome = "Welcome to Todo CLI! \n--------------------\n(v) View • (n) Nw • (cX) Complete • (dX) Delete • (q) Quit \n"

function menu() {

    interface.question(welcome, (answer) => {
        let num;
        if (answer.includes("c") || answer.includes("d")) {
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
            case `d${num}`:
                return deleteTask(num);
                break;
            case "q":
                console.log("Farewell have a lovey day, don't forget to smile!!");
                process.exit();
                break;
            default:
                console.log("Invaled anwser, Please try again")
                menu()
        }
        process.exit();
    })
}


// View

function viewTask() {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log("error reading file");
        } else {
            let task = data.toString().split("\n");
            console.log(`${task.join('\n')}\n`);
            menu();
        }
    })

};

// Add

function addTask(num) {
    interface.question('What is the new task?  ', (anwser) => {
        let task = `\n${num} [ ] ${anwser}`
        if (num !== 0) {
            fs.appendFile(fileName, task, (err) => {
                if (err) {
                    console.log('problem adding new task');
                } else {
                    console.log(`Added task: ${anwser}\n`);
                    menu();
                    return num++;
                }
            })
        } else {
            fs.writeFile(fileName, task, (err)=>{
                if (err){
                    console.log("Problem adding new task");
                } else {
                    console.log(`Added task: ${anwser}\n`);
                    menu();
                    return num++;
                }
            })
        }

})
}

// Complete

function completeTask(n) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(" Error reading file")
        } else {
            let list = data.toString().split('\n')
            let comTask = list[n];
            let task = comTask.slice(0, 3) + "✓" + comTask.slice(4)
            list.splice(n, 1, task)
            list = list.join('\n');
            fs.writeFile(fileName, list, (err) => {
                if (err) {
                    console.log('error writing file')
                } else {
                    console.log(`Task ${comTask} completed \n`)
                    menu();
                }
            })
        }
    })
};

// Delete

function deleteTask(n) {
    console.log("delete");
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log("error with reading file")
        } else {
            let list = data.toString().split('\n');
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
            fs.writeFile(fileName, list, (err) => {
                if (err) {
                    console.log('error deleting task');
                } else {
                    console.log(`Deleted: ${deletedTask} /n`);
                    menu();
                }
            })
        }
    })
}


menu();