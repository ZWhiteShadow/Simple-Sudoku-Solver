function limit(element) {
    var max_chars = 1;
    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
    if (element.value == 0) { //Don't accept 0!
        //element.value = "";
    }
    change();
}

function change() {

    var countArray = []
    for (i = 0; i < 9; i++) {
        countArray[i] = [];
        for (j = 0; j < 9; j++) {
            countArray[i].push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }

    //save inputed numbers into an array
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            countArray[i][j][0] = document.getElementById("i" + i + j).value;
        }
    }

    for (testNum = 1; testNum < 10; testNum++) {
        for (row = 0; row < 9; row++) {
            for (col = 0; col < 9; col++) {

                if (countArray[row][col][0] == testNum) {
                    for (x = 0; x < 9; x++) {
                        countArray[row][x][testNum] += 1
                    }
                }

                if (countArray[row][col][0] == testNum) {
                    for (x = 0; x < 9; x++) {
                        countArray[x][col][testNum] += 1
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
                if (countArray[row][col][0] == testNum) {
                    for (x = 0; x < 3; x++) {
                        for (y = 0; y < 3; y++) {
                            countArray[x + boxRow][y + boxCol][testNum] += 1;
                        }
                    }

                }
            }
        }
        for (row = 0; row < 9; row++) {
            for (col = 0; col < 9; col++) {
                if (countArray[row][col][countArray[row][col][0]] > 3) {
                    document.getElementById("i" + row + col).style.color = "red";
                } else {
                    document.getElementById("i" + row + col).style.color = "black";
                }

            }
        }

        console.log(countArray)
        redrawTables();
        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                for (k = 1; k < 10; k++) {
                    pencilMarkArray[i + 1][j + 1][k] = countArray[i][j][k]
                }
            }

        }
    }
}

var pencilMarkArray = []
for (i = 0; i < 10; i++) {
    pencilMarkArray.push([0]);
    for (j = 0; j < 9; j++) {
        pencilMarkArray[i].push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
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
        rowNum = 0,
        pencilMarkNum = 0;

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
                        x.setAttribute("value","")
                        x.setAttribute("onkeydown", "limit(this)")
                        x.setAttribute("onkeyup", "limit(this)")
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
                    col.innerHTML = "&nbsp" + pencilMarkArray[j + 1][i + 1][totalBox] + "&nbsp";
                    col.setAttribute("id", "b" + i + j + pencilMarkArray[j + 1][i + 1][totalBox]);
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
