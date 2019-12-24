// https://code.sololearn.com/Wts7GD6e7wKZ/#html



function createTable() {

    let colNum = 0,
        rowNum = 0;

    for (var a = 1; a < 4; a++) {  //Select which boxes to work on 
        for (var c = 0; c < 3; c++) { //Three rows at at time
            
            rowNum++;
            for (var b = 0; b < 3; b++) {  //Finish individual row
                var table = document.getElementById("" + a + b);
                document.getElementById("" + a + b).setAttribute("style", "border: 3px solid black;"); //Change border to black
                var row = document.createElement("tr");
                for (var j = 1; j < 4; j++) {  //Create three boxes going accross
                    colNum++;
                    var col = document.createElement("td");

                    var x = document.createElement("INPUT");
                    x.setAttribute("type", "number"); 
                    x.setAttribute("value", 0);
                   row.appendChild(x);

                    // col.innerHTML = "" + (rowNum - 1) + (colNum - 1);

                    row.appendChild(col);
                }
                table.appendChild(row);
            }
            colNum = 0;
        }
    }
}
createTable();

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