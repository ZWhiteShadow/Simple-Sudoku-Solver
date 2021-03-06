$(document).ready(function () {
    $("input").keydown(function (event) {
        switch (event.originalEvent.key) {
            case ".": case "0":
                event.preventDefault();
        }
    });
});

function limit(element, add, color) {
    var max_chars = 1;
    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
    if (element.value == "") { //Don't accept 0!
        element.value = "";
        return
    }
    var idString = element.id.substr(1)
    change(+idString.charAt(0), +idString.charAt(1), element.value, add, color);
}

var countArray = []
for (i = 0; i < 9; i++) {
    countArray[i] = [];
    for (j = 0; j < 9; j++) {
        countArray[i].push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
}

var pencilMarkArray = []
for (i = 0; i < 9; i++) {
    pencilMarkArray[i] = [];
    for (j = 0; j < 9; j++) {
        pencilMarkArray[i].push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
}

function change(row, col, testNum, add, color) {

    function error() {
        document.getElementById("i" + row + col).value = "";
        var audio;
        audio = new Audio('wrong.wav');
        audio.play();
    }

    if (pencilMarkArray[row][col][testNum] == 0 && add == 1) {
        error()
        return;
    }

    countArray[row][col][0] += (+testNum * add);

    for (x = 0; x < 9; x++) {

        countArray[row][x][testNum] += add

        if (add == 1) {
            pencilMarkArray[row][x][testNum] = 0 //color white
            document.getElementById("b" + row + x + testNum).style.color = color;
        } else if (add == -1 && countArray[row][x][0] == 0) {
            pencilMarkArray[row][x][testNum] = testNum;
            document.getElementById("b" + row + x + testNum).style.color = color;
        }

        countArray[x][col][testNum] += add

        if (add == 1) {
            pencilMarkArray[x][col][testNum] = 0 //color white
            document.getElementById("b" + x + col + testNum).style.color = color;

        } else if (add == -1 && countArray[x][col][0] == 0) {
            pencilMarkArray[x][col][testNum] = testNum; // color back
            document.getElementById("b" + x + col + testNum).style.color = color;
        } 
    }

    var boxRow = 0,
        boxCol = 0;

    if (row > 2) {
        boxRow = 3;
    }
    if (row > 5) {
        boxRow = 6;
    }
    if (col > 2) {
        boxCol = 3;
    }
    if (col > 5) {
        boxCol = 6;
    }
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {

            countArray[x + boxRow][y + boxCol][testNum] += add;

            if (add == 1) {
                pencilMarkArray[x + boxRow][y + boxCol][testNum] = 0
                document.getElementById("b" + (x + boxRow) + (y + boxCol) + testNum).style.color = color;

            } else if (add == -1 && countArray[x + boxRow][y + boxCol][0] == 0) {
                pencilMarkArray[x + boxRow][y + boxCol][testNum] = testNum;
                document.getElementById("b" + (x + boxRow) + (y + boxCol) + testNum).style.color = color;
            }
        }
    }

    for (x = 1; x < 10; x++) {
        if (add == 1) {
            document.getElementById("b" + row + col + x).style.color = color
            pencilMarkArray[row][col][x] = 0
        } else if (add == -1 && countArray[row][col][x] == 0) {
            document.getElementById("b" + row + col + x).style.color = color
            pencilMarkArray[row][col][x] = x;
        }
    }
    if (add != 0) {
        change(row, col, testNum, 0, color)
    }
}

// Create Overall Table
function baseTable(baseId, boxId) {
    var table = document.getElementById(baseId);
    for (var i = 1; i < 4; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            var col = document.createElement("td");
            col.setAttribute("id", "" + i + j + boxId);
            row.appendChild(col);
        }
        table.appendChild(row);
    }
};

// https://code.sololearn.com/Wts7GD6e7wKZ/#html
function fillTable(boxId, type) {

    let colNum = 0,
        rowNum = 0;

    for (var a = 1; a < 4; a++) { //Select which boxes to work on 
        for (var c = 0; c < 3; c++) { //Three rows at at time

            rowNum++;
            for (var b = 0; b < 3; b++) { //Finish individual row
                var table = document.getElementById("" + a + b + boxId);
                table.setAttribute("style", "border: 3px solid black;"); //Change border to black
                var row = document.createElement("tr");
                for (var j = 1; j < 4; j++) { //Create three boxes going accross
                    colNum++;
                    var col = document.createElement("td");
                    if (type == "input") {
                        var x = document.createElement("INPUT");
                        x.setAttribute("type", "number");
                        x.setAttribute("value", "")
                        x.setAttribute("onkeyup", "limit(this, 1, \'white\' )")
                        x.setAttribute("onkeydown", "limit(this, -1, \'black\' )")
                        x.setAttribute("id", "i" + (rowNum - 1) + (colNum - 1));
                        row.appendChild(x);
                    } else if (type == "text") {
                        col.setAttribute("id", "" + (rowNum - 1) + (colNum - 1));
                    }
                    row.appendChild(col);
                }
                table.appendChild(row);
            }
            colNum = 0;
        }
    }
}

// https://www.daniweb.com/programming/web-development/threads/113340/delete-all-rows-from-table-in-javascript
function clearTable(boxId) {
    for (a = 1; a < 4; a++) {
        for (b = 0; b < 3; b++) {
            if (document.getElementById("" + a + b + boxId)) { //clear tables if they exist
                var Parent = document.getElementById("" + a + b + boxId);
                while (Parent.hasChildNodes()) {
                    Parent.removeChild(Parent.firstChild);
                }
            }
        }
    }
}

function pencilMarks() {
    var totalBox = 0;
    for (i = 0; i < 9; i++) { // 9 Down     
        for (j = 0; j < 9; j++) { // 9 Accorss (Does all nine across first
            // Then goes on to the next row

            table = document.getElementById("" + i + j);
            for (var y = 0; y < 3; y++) { // 3 Down
                var row = document.createElement("tr");
                for (var z = 0; z < 3; z++) { // 3 Across
                    totalBox++;
                    var col = document.createElement("td");
                    col.innerHTML = "&nbsp" + totalBox + "&nbsp";
                    col.setAttribute("id", "b" + i + j + totalBox);
                    row.appendChild(col);
                }
                table.appendChild(row);
                table.setAttribute("style", "border: 1px solid black;");
            }
            totalBox = 0;
        }
    }
}

function redrawTables() {
    clearTable(1);
    baseTable("inputTable", 0);
    baseTable("pencilMarks", 1);
    fillTable(1, "text");
    pencilMarks();

}

redrawTables();
fillTable(0, "input")