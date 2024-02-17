function start_calculation() {
    console.log("start calculation");
    const arrivaltime_test = 0.5; // TODO: #11 add function in own file to calculate arrivaltime with the propagation model
    const inital_ignition = [{ id: 0, x: 5, y: 2, t: 0 }]; // TODO: #10 in future the data (x,y,arrivaltime) will come from the input form submission by the user
    const steps = 5; // TODO: #10 in future the data will come from the input form submission by the user
    // time_steps(steps, arrivaltime_test, inital_ignition)
    let final_list_of_burning_cells
    final_list_of_burning_cells = cellular_automaton(arrivaltime_test, inital_ignition)
    // console.log(final_list_of_burning_cells);
    // console.log(JSON.stringify(final_list_of_burning_cells, null, 0));

    fill_table(final_list_of_burning_cells) // testing result visual in a table

    // const modelRunner = initModelRunner();
}

/*
// helper function to calculate spread for every time step
function time_steps(in_steps, in_arrivaltime_test, in_inital_ignition) {
    let ignition_list = in_inital_ignition
    for (let i = 0; i < in_steps-1; i++) {
        cellularAutomaton(in_arrivaltime_test, ignition_list)
        console.log("step " + i);
    }
}*/



function add_neighbours_to_list(in_list_of_cells) {
    const length_at_this_time = in_list_of_cells.length // the length of the array changes in these loops, so we need this static value for the length at the beginning
    let counter = length_at_this_time - 1 // value for id of the last cell in the list
    for (let i = 0; i < length_at_this_time; i++) {
        for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
                let new_cell = { id: null, x: null, y: null, t: null }
                new_cell.x = in_list_of_cells[i].x + j
                new_cell.y = in_list_of_cells[i].y + k
                new_cell.t = in_list_of_cells[i].t + 0.5 // TODO: #11

                // check if the cell is out of border or coordinates are already in the list
                let cellExists = in_list_of_cells.some(cell => cell.x === new_cell.x && cell.y === new_cell.y);
                if (!cellExists && new_cell.x >= 0 && new_cell.x <= 9) {
                    if (new_cell.y >= 0 && new_cell.y <= 9) {
                        counter++ // Only new id/cell generated if condition fulfilled 
                        new_cell.id = counter
                        // console.log("new cell: " + JSON.stringify(new_cell, null, 1));
                        in_list_of_cells.push(new_cell)
                    }
                }
            }
        }
    }
    return in_list_of_cells;
}

// 
function cellular_automaton(in_arrivaltime_test, in_inital_ignition) {
    let list_of_ignited_cells = in_inital_ignition; // in past: called "grid" and not list, but technically it was a list

    // breake recursion if simulation runs out of time
    let time_last_cell
    last_cell_index = list_of_ignited_cells.length - 1
    time_last_cell = list_of_ignited_cells[last_cell_index].t
    if (time_last_cell >= 1.9) {
        console.log("TIME IS OVER");
        // console.log("list_of_ignited_cells: " + JSON.stringify(list_of_ignited_cells, null, 0));
        return list_of_ignited_cells // return breaks recursion
    }


    list_of_ignited_cells = add_neighbours_to_list(list_of_ignited_cells)
    cellular_automaton(in_arrivaltime_test, list_of_ignited_cells) // Recursion takes place right here
    /*
    console.log("x of ignided cell "+ 0 + ": " + list_of_ignited_cells[0].x);
    console.log("y of ignided cell "+ 0 + ": " + list_of_ignited_cells[0].y);
    console.log("t of ignided cell "+ 0 + ": " + list_of_ignited_cells[0].t);
    */
    // console.log("list_of_ignited_cells: " + JSON.stringify(list_of_ignited_cells, null, 0));
    // console.log("next recursion step");

    return list_of_ignited_cells
}



/*
function initModelRunner() {
    const modelRunner = {
        spread_rate_model: null,
        propagation_model: null,
        burn_model: null,
        grid: null,
        t0: 0,
        t_index: 0,
        parameters: {
            EXTENTS: { x: 10, y: 10 },
            RESOLUTION: { x: 1, y: 1, t: 1 },
            SIMULATION: { steps: 15 },
            TOPOGRAPHY: { flat: true }
        }
    };

    modelRunner.grid = initGrid(modelRunner);

    console.log("Type of modelRunner: " + typeof modelRunner);
    console.log("modelRunner data: " + modelRunner);
    return modelRunner;
}

// grid is an array of arrays of the objects point
// grid is spatial and represents a 2d map
function initGrid(modelRunner) {
    console.log("init grid");
    const grid = [];

    for (let y = 0; y < modelRunner.parameters.EXTENTS.y; y++) {
        const row = [];
        for (let x = 0; x < modelRunner.parameters.EXTENTS.x; x++) {
            const point = initPoint({ x, y }, { x: x * modelRunner.parameters.RESOLUTION.x, y: y * modelRunner.parameters.RESOLUTION.y, z: 0.0 }, modelRunner);
            row.push(point);
        }
        grid.push(row);
    }

    console.log("Type of grid: " + typeof grid);
    console.log("grid data: " + grid);
    return grid;
}

function initPoint(index, position, runner) {
    console.log("init point");
    return {
        index,
        position,
        runner,
        ignition_time: Infinity,
        extinguish_time: Infinity,
        _param_cache: {},

        is_ignited(t0, t1) {
            return (this.ignition_time < t1) && (this.extinguish_time >= t1);
        },

        param(group_name, parameter) {
            console.log(group_name + " and " + parameter);
        },

        clean() {
            this._param_cache = null;
            this.runner = null;
        }
    };
}

function neighbours(point, modelRunner) {
    if (point.neighbours) return point.neighbours;

    const neighbour = (x, y) => {
        if ((x < 0) || (y < 0) || (x >= modelRunner.parameters.EXTENTS.x) || (y >= modelRunner.parameters.EXTENTS.y)) {
            return null;
        }
        return modelRunner.grid[y][x];
    };

    point.neighbours = [];

    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            if ((x === 0) && (y === 0)) continue;
            const n = neighbour(point.index.x + x, point.index.y + y);
            if (n) point.neighbours.push(n);
        }
    }
    return point.neighbours;
}
*/





/////////////
// fill table for testing
/////////////

function fill_table(in_list) {
    console.log("CALL WORKS");

    for (let i = 0; i < in_list.length; i++) {
        let table_cell = document.getElementById(`x${in_list[i].x}y${in_list[i].y}`); // uses id of needed cell in the table
        table_cell.textContent = in_list[i].t && in_list[i].id;
        let test2 = document.getElementById(`x${in_list[i].x}y${in_list[i].y}`).value
        console.log(test2);
    }
}

