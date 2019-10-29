

const fs = require('fs');
const args = process.argv.slice(2);

const horz = "─"
const ver = "│"
const cornerRightTop = "┐"
const cornerLeftTop = "┌"
const cornerLeftBottom = "└"
const cornerRightBottom = "┘"

function drawLine(n) {
    return (parseInt(n) > 0) ? horz.repeat(n) : "";
}

function drawTopBorder(n) {
    return cornerLeftTop + drawLine(n) + cornerRightTop;
}

function drawMiddleBorder(n) {
    return ver + drawLine(n) + ver;
}

function drawBottomBorder(n) {
    return cornerLeftBottom + drawLine(n) + cornerRightBottom;
}

function drawBarsAround(str, n) {
    let strLength = n - str.length;
    return (strLength > 0) ? `${ver}${str}${" ".repeat(strLength)}${ver}` : `${ver}${str}${ver}`;
}
function drawBarsBetween(str, str2, n, n2) {
    let strLength = n - str.length;
    let strLength2 = n2 - str2.length;
    let col0;
    let col1;
    (strLength > 0) ? col0 = `${ver}${str}${" ".repeat(strLength)}${ver}` : col0 = `${ver}${str}${ver}`;
    (strLength2 > 0) ? col1 = `${str2}${" ".repeat(strLength2)}${ver}` : col1 = `${str2}${ver}`;
    return col0 + col1;

}


function boxIt(arr) {

    let length = 0;
    arr.forEach(element => {
        (element.length > length) ? length = element.length : length = length;
    });
    let result = drawTopBorder(length) + "\n";
    if (arr.length === 0) {
        result += drawBottomBorder(length);
    }
    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            result += drawBarsAround(arr[i], length) + "\n" + drawBottomBorder(length) + "\n";
        } else {
            result += drawBarsAround(arr[i], length) + "\n" + drawMiddleBorder(length) + "\n";
        }
    }
    return result;
}

function fileRead() {
    fs.readFile("character.csv", (err, data) => {
        if (err) {
            console.log("error reading file")
        } else {
            let arrCSV = data.toString().split("\n");
            let col0 = 0;
            let col1 = 0;
            for (let i = 0; i < arrCSV.length; i++) {
                let col = arrCSV[i].split(',');

                (col[0].length > col0) ? col0 = col[0].length : col0 = col0;
                (col[1].length > col1) ? col1 = col[1].length : col1 = col1;
            }
            let result = drawTopBorder(col0 + col1 + 1) + "\n";
            for (let i = 0; i < arrCSV.length; i++) {

                let col = arrCSV[i].split(',');
                if (i === arrCSV.length - 1) {
                    result += `${drawBarsBetween(col[0], col[1], col0, col1)}\n${drawBottomBorder(col0 + col1 + 1)}\n`;
                } else {
                    result += `${drawBarsBetween(col[0], col[1], col0, col1)}\n${drawMiddleBorder(col0 + col1 + 1)}\n`;
                }
            };
            return console.log(result);
        }
    })
}

console.log(boxIt(["Aurora", "hudson smith", "nermal", "woodstock Smith"]));
console.log(boxIt([]));
console.log(boxIt(args));
fileRead()