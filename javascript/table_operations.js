
/////////////
// fill each ignited cell of table with arrival time 
/////////////

// DOM interaction
function fill_table(in_list) {
    let debug_counter = 0
    for (let i = 0; i < in_list.length; i++) {

        try {
            // Code, der den Fehler auslösen kann
            let table_cell = document.getElementById(`x${in_list[i].x}y${in_list[i].y}`); // uses id of needed cell in the table
            let roundedNumber = Math.round(in_list[i].t * 100) / 100
            table_cell.textContent = roundedNumber  // in_list[i].id;
        } catch (error) {
            console.error(`Error in Iteration ${debug_counter}: ${error.message}`);
        }
        debug_counter++
    }
    set_color_thresholds(in_list)
}






/////////////
// calculate threshold depending on latest arrival times
// and coloring ignited cells
/////////////

function set_color_thresholds(in_list) {
    // thresholds for 5 colors
    const threshold_5 = find_latest_time_in_list_of_ignited_cells(in_list) // function in runner.js file

    // thresholds are relative to the latest arrival time 
    // using golden ratio:
    // φ = (1 + √5) / 2 ≈ 1.618
    const PHI = (1 + Math.sqrt(5)) / 2;
    const threshold_4 = threshold_5 - (threshold_5 / PHI);
    const threshold_3 = threshold_4 - (threshold_4 / PHI);
    const threshold_2 = threshold_3 - (threshold_3 / PHI);
    const threshold_1 = threshold_2 - (threshold_2 / PHI);

    const thresholds = [
        { min: 0, max: 0, color: "#FF0033" }, // this line is to highlight ignition points
        { min: 0, max: threshold_1, color: "#B53302" },
        { min: threshold_1, max: threshold_2, color: "#E97D01" },
        { min: threshold_2, max: threshold_3, color: "#FCAC23" },
        { min: threshold_3, max: threshold_4, color: "#FECA64" },
        { min: threshold_4, max: threshold_5 + 1, color: "#FEDB9B" }, // +1 because of rounded values in the table, but not in the list.
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