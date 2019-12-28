function limit(element) {
    var max_chars = 1;
    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
    if (element.value == 0) { //Don't accept 0!
        element.value = "";
    }
    changeInputArray(element.id.substr(1), element.value)
}

function changeInputArray(id, value) {
    var countRow = [],
        countCol = [],
        countBox = [];
    for (i = 0; i < 10; i++) {
        countRow[i] = 0;
        countCol[i] = 0;
        countBox[i] = 0;
    }
    inputArray[id.charAt(0)][id.charAt(1)] = value;

    //Count how many numbers are in each:
    for (var testValue = 1; testValue < 10; testValue++) {
        for (i = 0; i < 9; i++) {
            //Row
            if (document.getElementById("i" + id.charAt(0) + i).value == testValue) {
                countRow[testValue]++;
            }
            //Col
            if (document.getElementById("i" + i + id.charAt(1)).value == testValue) {
                countCol[testValue]++;
            }
        }
    }
    for (i = 0; i < 9; i++) {
        //Change all numbers in row to red if there is more than 1
        var rowId = "i" + id.charAt(0) + i;
        if (countRow[document.getElementById(rowId).value] > 1) {
            document.getElementById(rowId).style.color = "red";
        } else {
            document.getElementById(rowId).style.color = "black";
        }
        //Change all numbers in col to red if there is more than 1
        var colId = "i" + i + id.charAt(1);
        if (countCol[document.getElementById(colId).value] > 1) {
            document.getElementById(colId).style.color = "red";
        } else {
            document.getElementById(colId).style.color = "black";
        }
        if (document.getElementById("i" + id.charAt(0) + i).value == testValue) {
            countRow[testValue]++;
        }

    }

   //Cycle thru all the boxes and change all mutliple values to red
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
    
        for (i = 0; i < 10; i++) {
            countBox[i] = 0;
        }

            var down = 0;
            var across = 0;
            if (row > 2) {
                down = down + 3;
            }
            if (row > 5) {
                down = down + 3;
            }

            if (col > 2) {
                across = across + 3;
            }
            if (col > 5) {
                across = across + 3;
            }

            //Count number of each value in the boxes
            for (var testValue = 1; testValue < 10; testValue++) {
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (document.getElementById("i" + (i + down) + (j + across)).value == testValue) {
                            countBox[testValue]++;

                        }
                    }
                }
            }

            //Change multiple values to red
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    var boxId = "i" + (i + down) + (j + across);
                    if (countBox[document.getElementById(boxId).value] > 1) {
                        document.getElementById(boxId).style.color = "red";
                    } else {
                        document.getElementById(boxId).style.color = "black";
                    }
                }
            }
        }
    }
}

var inputArray = [];
for (i = 0; i < 9; i++) {
    inputArray.push(["0"]);
    for (j = 0; j < 9; j++) {
        inputArray[i].push("")
    }
}

var pencilMarkArray = []
for (i = 0; i < 10; i++) {
    pencilMarkArray.push([0]);
    for (j = 0; j < 10; j++) {
        pencilMarkArray[i].push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
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
                        x.setAttribute("value", "")
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
    clearTable(0);
    clearTable(1);
    baseTable("inputTable", 0);
    baseTable("pencilMarks", 1);
    fillTable(1, "text");
    pencilMarks();
}

redrawTables();
fillTable(0, "input")