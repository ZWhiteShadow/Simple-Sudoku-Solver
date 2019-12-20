// https://code.sololearn.com/Wts7GD6e7wKZ/#html
function gameTable() {
    var table = document.getElementById("masterTable");
    for( var i = 0; i < 3; i++ ){
        var row = document.createElement("tr");
        for( var j = 0; j < 3; j++ ){
            var col = document.createElement("td");
            col.innerHTML = "<html id=\'" + i + j + "\'></html>";
            row.appendChild(col);
        }
        table.appendChild(row);
    }
};

// https://code.sololearn.com/Wts7GD6e7wKZ/#html
window.onload = function() {
    var table = document.getElementById("myTable2");
    for( var i = 0; i < 10; i++ ){
        var row = document.createElement("tr");
        for( var j = 0; j < 10; j++ ){
            var col = document.createElement("td");

            var x = document.createElement("INPUT");
             x.setAttribute("type", "number"); 
             x.setAttribute("value", "" + i + j);
            row.appendChild(x);

            row.appendChild(col);
        }
        table.appendChild(row);
    }
};



