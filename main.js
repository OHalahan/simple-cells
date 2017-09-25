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
    let row = mainTable.insertRow(id),
        searchId = `row-${id}`;
    row.onmouseover = () => showDelRow(searchId);
    row.onmouseout = () => hideDelRow(searchId);

    return row;
}

function cellToMain(id, row) {
    if ((!id && id !== 0) || !row) {
        return;
    }
    let cell = row.insertCell(id),
        searchId = `col-${id}`;
    cell.onmouseover = () => showDelCol(searchId);
    cell.onmouseout = () => hideDelCol(searchId);

    return cell;
}

function singleRowToDelCol() {
    delColTable.insertRow(0);
    singleColToDelCol();
}

function singleColToDelCol(id = 0) {
    let cell = delColTable.rows[0].insertCell(id),
        searchId = `col-${id}`;
    cell.innerHTML = delSymbol;
    cell.id = searchId;
    cell.onclick = () => deleteCol(searchId);
    cell.onmouseover = () => showDelCol(searchId);
    cell.onmouseout = () => hideDelCol(searchId);
}

function singleRowToDelRow(id = 0) {
    let cell = delRowTable.insertRow(id).insertCell(0),
        searchId = `row-${id}`;
    cell.innerHTML = delSymbol;
    cell.id = searchId;
    cell.onclick = () => deleteRow(searchId);
    cell.onmouseover = () => showDelRow(searchId);
    cell.onmouseout = () => hideDelRow(searchId);
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
function deleteRow(id) {
    if (!id && id !== 0) {
        return;
    }
    let index = document.getElementById(id).rowIndex;
    mainTable.deleteRow(index);
    delRowTable.deleteRow(index);
}

/**
 * Method for deleting column by id
 */
function deleteCol(id) {
    if (!id && id !== 0) {
        return;
    }
    let index = document.getElementById(id).cellIndex;
    colsNum = mainTable.rows[0].cells.length;
    for (let row of mainTable.rows) {
        for (let i=0; i < colsNum; i++) {
            if (i === index) {
                row.deleteCell(index);
            }
        }
    }
    delColTable.rows[0].deleteCell(index);
}

/**
 * Method for making 'delete row' button visible
 */
function showDelRow(id) {
    if (!id && id !== 0) {
        return;
    } else if (delRowTable.rows.length === 1) {
        document.getElementById(id).style.visibility = "hidden";
        return;
    }
    document.getElementById(id).style.visibility = "visible";
}

/**
 * Method for hiding 'delete row' when mouse leaves row
 */
function hideDelRow(id) {
    if (!id && id !== 0) {
        return;
    }
    document.getElementById(id).style.visibility = "hidden";
}

/**
 * Method for making 'delete column' button visible
 */
function showDelCol(id) {
    if (!id && id !== 0) {
        return;
    } else if (delColTable.rows[0].cells.length === 1) {
        document.getElementById(id).style.visibility = "hidden";
        return;
    }
    document.getElementById(id).style.visibility = "visible";
}

/**
 * Method for hiding 'delete column' when mouse leaves row
 */
function hideDelCol(id) {
    if (!id && id !== 0) {
        return;
    }
    document.getElementById(id).style.visibility = "hidden";
}


initTables();
