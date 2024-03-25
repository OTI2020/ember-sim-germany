
/////////////
// fill each ignited cell of table with arrival time 
/////////////

// DOM interaction
function fill_table(in_list) {
    for (let i = 0; i < in_list.length; i++) {
        let table_cell = document.getElementById(`x${in_list[i].x}y${in_list[i].y}`); // uses id of needed cell in the table
        let roundedNumber = Math.round(in_list[i].t * 10000) / 10000
        table_cell.textContent = roundedNumber  // in_list[i].id;
        /*
        let test_2 = document.getElementById(`x${in_list[i].x}y${in_list[i].y}`).value
        console.log(test_2);
        */
    }
    set_color_thresholds(in_list)
}






/////////////
// calculate threshold depending on latest arrival times
// and coloring ignited cells
/////////////

function set_color_thresholds(in_list) {
    // thresholds for 5 colors
    const threshold_5 = find_latest_time_in_list_of_ignited_cells(in_list) // function in runner.js

    // thresholds are relative to the latest arrival time 
    const threshold_1 = threshold_5 * 0.2
    const threshold_2 = threshold_5 * 0.4
    const threshold_3 = threshold_5 * 0.6
    const threshold_4 = threshold_5 * 0.8
    const thresholds = [
        { min: 0, max: threshold_1, color: "#FEDB9B" },
        { min: threshold_1, max: threshold_2, color: "#FECA64" },
        { min: threshold_2, max: threshold_3, color: "#FCAC23" },
        { min: threshold_3, max: threshold_4, color: "#E97D01" },
        { min: threshold_4, max: threshold_5 + 1, color: "#B53302" }, // +1 because of rounded values in the table, but not in the list.
    ];
    // console.log(thresholds);


    const table = document.getElementById("result_table");
    // Call the function to color the table
    color_cells(table, thresholds);
}


function color_cells(table, thresholds) {
    // Iterate over all cells in the table
    for (let i = 1; i < table.rows.length; i++) {
        for (let j = 1; j < table.rows[i].cells.length; j++) {
            // Get the value of the cell
            let value = parseFloat(table.rows[i].cells[j].textContent);

            // Find the matching threshold
            let fitting_threshold = thresholds.find(s => value >= s.min && value <= s.max);

            // If a threshold was found, color the cell
            if (fitting_threshold) {
                table.rows[i].cells[j].style.backgroundColor = fitting_threshold.color;
            }
        }
    }
}






/////////////
// download table as csv file
/////////////

// DOM interaction

// 2024-03-07 @autor: https://www.werner-zenk.de/javascript/html-tabelle_als_csv-datei_exportieren.php

document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('result_table');
    const exportBtn = document.getElementById('export');

    const toCsv = function (table) {
        const rows = table.querySelectorAll('tr');

        return [].slice.call(rows)
            .map(function (row) {
                const cells = row.querySelectorAll('th,td');
                return [].slice.call(cells)
                    .map(function (cell) {
                        return cell.textContent;
                    })
                    .join(';');
            })
            .join('\n');
    };

    const download = function (text, fileName) {
        const link = document.createElement('a');
        link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
        link.setAttribute('download', fileName);

        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    exportBtn.addEventListener('click', function () {
        const csv = toCsv(table);

        download(csv, 'result_grid_contains_arrival_times.csv');
    });
});