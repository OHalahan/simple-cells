let table = document.getElementById("mainTable");

let initRows = 3,
    initColumns = 3;

function initTable() {
    table.insertRow(0).insertCell(0);
    appendRow(initRows);
    appendCol(initColumns);
}

/**
 * Method for appending rows to the table
 * Appends 1 row by default
 */
function appendRow(times = 1) {
    let rows = table.rows,
        rowsNum = table.rows.length,
        colsNum = rowsNum ? rows[0].cells.length : 1; // assume row's length is the same along the table

    for (let i=0; i < times; i++) {
        let row = table.insertRow(rowsNum + i); //make it appending
        appendCol(colsNum, row);
    }
}

/**
 * Method for appending a column either to the whole table or to the particular row
 * Appends 1 column to the whole table by default
 */
function appendCol(times = 1, row) {
    if (row) {
        for (let i=0; i < times; i++) {
            row.insertCell(0); //make it appending
        }
    } else {
        for (let row of table.rows) {
            let colsNum = row.cells.length;
            for (let i=0; i < times; i++) {
                row.insertCell(colsNum + i);
            }
        }
    }
}

initTable();
