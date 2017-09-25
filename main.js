let mainTable = document.getElementById("mainTable"),
    delColTable = document.getElementById("topTable"),
    delRowTable = document.getElementById("leftTable"),
    appendColTable = document.getElementById("rightTable"),
    appendRowTable = document.getElementById("bottomTable");

let initRows = 3,
    initColumns = 3;

let addSymbol = "+",
    delSymbol = "-";

function singleRowToMain(id = 0) {
    let row = mainTable.insertRow(id);
    row.onmouseover = () => showDelRow(row);
    row.onmouseout = () => hideDelRow(row);

    return row;
}

function cellToMain(id, row) {
    if ((!id && id !== 0) || !row) {
        return;
    }
    let cell = row.insertCell(id);
    cell.onmouseover = () => showDelCol(cell);
    cell.onmouseout = () => hideDelCol(cell);
}

function singleRowToDelCol() {
    delColTable.insertRow(0);
    singleColToDelCol();
}

function singleColToDelCol(id = 0) {
    let cell = delColTable.rows[0].insertCell(id);
    cell.innerHTML = delSymbol;
    cell.onclick = () => deleteCols(cell);
    cell.onmouseover = () => showDelCol(cell);
    cell.onmouseout = () => hideDelCol(cell);
}

function singleRowToDelRow(id = 0) {
    let row = delRowTable.insertRow(id),
        cell = row.insertCell(0);
    cell.innerHTML = delSymbol;

    cell.onclick = () => deleteRows(row);
    cell.onmouseover = () => showDelRow(row);
    cell.onmouseout = () => hideDelRow(row);
}

function singleRowToAppendCol() {
    let cell = appendColTable.insertRow(0).insertCell(0);
    cell.innerHTML = addSymbol;
    cell.onclick = () => appendCol();
}

function singleRowToAppendRow() {
    let cell = appendRowTable.insertRow(0).insertCell(0);
    cell.innerHTML = addSymbol;
    cell.onclick = () => appendRow();
}

function initTables() {
    singleRowToDelCol();
    singleRowToDelRow();

    let mainRow = singleRowToMain();
    cellToMain(0, mainRow);

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
        let row = singleRowToMain(rowsNum + i);
        appendCol(colsNum, row);

        singleRowToDelRow(rowsNum + i);
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
            cellToMain((colsNum + i), row);
        }
    } else {
        for (let tabRow of mainTable.rows) {
            for (let i=0; i < times; i++) {
                cellToMain((colsNum + i), tabRow);
            }
        }
        for (let i=0; i < times; i++) {
            singleColToDelCol(colsNum + i);
        }
    }
}

/**
 * Method for deleting row by id
 */
function deleteRows(row) {
    if (!row) {
        return;
    }
    let index = row.rowIndex;
    mainTable.deleteRow(index);
    delRowTable.deleteRow(index);
}

/**
 * Method for deleting column by id
 */
function deleteCols(cell) {
    if (!cell) {
        return;
    }
    let index = cell.cellIndex;
    colsNum = mainTable.rows[0].cells.length;
    for (let row of mainTable.rows) {
        row.deleteCell(index);
    }
    delColTable.rows[0].deleteCell(index);
}

/**
 * Method for making 'delete row' button visible
 */
function showDelRow(row) {
    if (!row) {
        return;
    }
    let id = row.rowIndex;
    if (delRowTable.rows.length === 1) {
        changeStyleProp(delRowTable, id, "hidden");
        return;
    }
    changeStyleProp(delRowTable, id, "visible");
}

/**
 * Method for hiding 'delete row' when mouse leaves row
 */
function hideDelRow(row) {
    if (!row) {
        return;
    }

    changeStyleProp(delRowTable, row.rowIndex, "hidden");
}

/**
 * Method for making 'delete column' button visible
 */
function showDelCol(cell) {
    if (!cell) {
        return;
    }
    let id = cell.cellIndex;
    if (delColTable.rows[0].cells.length === 1) {
        changeStyleProp(id, "hidden");
        return;
    }
    changeStyleProp(delColTable, id, "visible");
}

/**
 * Method for hiding 'delete column' button when mouse leaves column
 */
function hideDelCol(cell) {
    if (!cell) {
        return;
    }
    changeStyleProp(delColTable, cell.cellIndex, "hidden");
}

/**
 * Method for making element visible/hidden
 */
function changeStyleProp(table, index, action) {
    if (!table || (!index && index !== 0) || !action) {
        return;
    }
    let elem;
    if (table.id === "topTable") {
        elem = delColTable.rows[0].cells[index];
    } else {
        elem = delRowTable.rows[index].cells[0];
    }
    if (elem) {
        elem.style.visibility = action;
    }
}

initTables();
