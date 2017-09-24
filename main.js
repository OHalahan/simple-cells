let mainTable = document.getElementById("mainTable"),
    delColTable = document.getElementById("topTable"),
    delRowTable = document.getElementById("leftTable"),
    appendColTable = document.getElementById("rightTable"),
    appendRowTable = document.getElementById("bottomTable");

let initRows = 3,
    initColumns = 3;

let addSymbol = "+",
    delSymbol = "-";

function singleRowToMain() {
    mainTable.insertRow(0).insertCell(0);
}

function singleRowToDelCol() {
    delColTable.insertRow(0).insertCell(0).innerHTML = delSymbol;
}

function singleColToDelCol(position = 0) {
    delColTable.rows[0].insertCell(position).innerHTML = delSymbol;
}

function singleRowToDelRow() {
    delRowTable.insertRow(0).insertCell(0).innerHTML = delSymbol;
}

function singleRowToAppendCol() {
    let cell = appendColTable.insertRow(0).insertCell(0).innerHTML = addSymbol;
}

function singleRowToAppendRow() {
    appendRowTable.insertRow(0).insertCell(0).innerHTML = addSymbol;
}

function initTables() {
    singleRowToDelCol();
    singleRowToDelRow();
    singleRowToMain();
    singleRowToAppendCol();
    singleRowToAppendRow();

    appendRow(initRows);
    appendCol(initColumns);
}

/**
 * Method for appending rows to the table
 * Appends 1 row by default (to main table)
 */
function appendRow(times = 1) {
    let rows = mainTable.rows,
        rowsNum = mainTable.rows.length,
        colsNum = rowsNum ? rows[0].cells.length : 1; // assume row's length is the same along the table

    for (let i=0; i < times; i++) {
        let row = mainTable.insertRow(rowsNum + i);
        appendCol(colsNum, row);

        singleRowToDelRow();
    }
}

/**
 * Method for appending a column either to the whole table or to the particular row
 * Appends 1 column to the whole (main) table by default
 */
function appendCol(times = 1, row) {
    let colsNum = row ? row.cells.length : mainTable.rows[0].cells.length;
    if (row) {
        for (let i=0; i < times; i++) {
            row.insertCell(colsNum + i);
        }
    } else {
        for (let row of mainTable.rows) {
            for (let i=0; i < times; i++) {
                row.insertCell(colsNum + i);
            }
        }
        for (let i=0; i < times; i++) {
            singleColToDelCol(colsNum + i);
        }
    }
}

initTables();
