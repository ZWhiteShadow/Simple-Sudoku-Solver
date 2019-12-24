function limit(element) {
    var max_chars = 1;
    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
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
baseTable("inputTable", 0);
baseTable("pencilMarks", 1);

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
                        x.setAttribute("value", 0);
                        x.setAttribute("onkeydown", "limit(this)")
                        x.setAttribute("onkeyup", "limit(this)")
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
fillTable(0, "input");
fillTable(1, "text");

// https://www.daniweb.com/programming/web-development/threads/113340/delete-all-rows-from-table-in-javascript
function clearTable() {
    for (a = 1; a < 4; a++) {
        for (b = 0; b < 3; b++) {
            var Parent = document.getElementById("" + a + b);
            while (Parent.hasChildNodes()) {
                Parent.removeChild(Parent.firstChild);
            }
        }
    }
}

function pencilMarks(type) {
    var totalBox = 0;
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            table = document.getElementById("" + i + j);
            for (var y = 0; y < 3; y++) {
                var row = document.createElement("tr");
                for (var z = 0; z < 3; z++) {
                    totalBox++;
                    var col = document.createElement("td");
                    if(type == "start"){
                    col.innerHTML = "&nbsp" + totalBox + "&nbsp";
                    }
                    else if (type == "refresh"){
                    col.innerHTML = "&nbsp" + 0 + "&nbsp";
                    }
                    row.appendChild(col);
                }
                table.appendChild(row);
                table.setAttribute("style", "border: 1px solid black;");
            }
            totalBox = 0;
        }
    }
}
pencilMarks("start");