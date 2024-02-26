function start_calculation() {
    console.log("load input for parameters")
    loadInput();
    console.log("start calculation");
    const arrivaltime_test = 0.5; // TODO: #11 add function in own file to calculate arrivaltime with the propagation model
    const inital_ignition = [{ id: 0, x: 5, y: 2, t: 0 }, { id: 1, x: 0, y: 9, t: 0.001 }]; // TODO: #10 in future the data (x,y,arrivaltime) will come from the input form submission by the user
    const steps = 5; // TODO: #10 in future the data will come from the input form submission by the user
    // time_steps(steps, arrivaltime_test, inital_ignition)
    let final_list_of_burning_cells
    final_list_of_burning_cells = cellular_automaton(inital_ignition)
    // console.log(final_list_of_burning_cells);
    // console.log(JSON.stringify(final_list_of_burning_cells, null, 0));

    fill_table(final_list_of_burning_cells) // testing result visual in a table

    // const modelRunner = initModelRunner();
}


/*
function startCalculation() {
    console.log("load input for parameters")
    loadInput();
    console.log("start calculation")

    const modelRunner = null //initModelRunner();
 /*
    for (let i = 0; i < 5; i++) {
        // modelRunner.step();
        console.log("step " + i);
    }

}*/


/*
// helper function to calculate spread for every time step
function time_steps(in_steps, in_arrivaltime_test, in_inital_ignition) {
    let ignition_list = in_inital_ignition
    for (let i = 0; i < in_steps-1; i++) {
        cellularAutomaton(in_arrivaltime_test, ignition_list)
        console.log("step " + i);
    }
}*/

let new_cells_index = 0

function add_neighbours_to_list(in_list_of_cells) {
    let length_at_this_time = in_list_of_cells.length // the length of the array changes in these loops, so we need this static value for the length at the beginning
    let id_counter = length_at_this_time - 1 // value for id of the last cell in the list
    let new_cells_counter = 0
    console.log("new_cells_index " + new_cells_index);
    console.log("length_at_this_time " + length_at_this_time);
    console.log("id_counter " + id_counter);
    console.log("start_index_cache " + new_cells_counter);
    for (let i = new_cells_index; i < length_at_this_time; i++) {
        for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
                let new_cell = { id: null, x: null, y: null, t: null }
                new_cell.x = in_list_of_cells[i].x + j
                new_cell.y = in_list_of_cells[i].y + k

                // check if the cell is out of border or coordinates are already in the list
                let cell_exists = in_list_of_cells.some(cell => cell.x === new_cell.x && cell.y === new_cell.y);
                console.log("cell_exists = " + cell_exists);
                if (!cell_exists && new_cell.x >= 0 && new_cell.x <= 9) {
                    if (new_cell.y >= 0 && new_cell.y <= 9) {
                        id_counter++ // Only new id/cell generated if condition fulfilled 
                        new_cell.id = id_counter
                        new_cell.t = calculate_arrival_time(new_cell, in_list_of_cells[i], null) //test data for elevation?
                        // new_cell.t = in_list_of_cells[i].t + 0.5 //test data for elevation?
                        // console.log("new cell: " + JSON.stringify(new_cell, null, 1));
                        in_list_of_cells.push(new_cell)
                        new_cells_counter++// new_cells_index++
                    }
                }
            }
        }
    }
    new_cells_index = in_list_of_cells.length - new_cells_counter // variable value saved outside this function       
    return in_list_of_cells;
}

// 
function cellular_automaton(in_inital_ignition) {
    let list_of_ignited_cells = in_inital_ignition; // in past: called "grid" and not list, but technically it was a list

    // Check if simulation should end
    // breake recursion if simulation runs out of time
    let max_steps = document.getElementById("simulationSteps").value // DOM in every iteration? Is that smart??
    // let current_index = 0;
    let cache = 0;
    let current_step = 0
    while (true) {
        // const last_cell_index = list_of_ignited_cells.length - 1
        // const time_last_cell = list_of_ignited_cells[last_cell_index].t

        const latest_time = find_latest_time_in_list_of_ignited_cells(list_of_ignited_cells)

        console.log(">  >  >  CHECK latest_time " + latest_time);
        if (current_step >= max_steps || list_of_ignited_cells.length >= 4) { //5.9) { //TODO #20 - find bug - Why is this always a stackoverflow when max_time is greater than 3 ??
            console.log("> > > TIME IS OVER < < <");
            console.log("latest_time " + latest_time);
            console.log("list_of_ignited_cells: " + JSON.stringify(list_of_ignited_cells, null, 0));
            return list_of_ignited_cells // return breaks recursion
            break;
        }
        current_step++
        console.log("current_step " + current_step);
        // cache = list_of_ignited_cells.length
        list_of_ignited_cells = add_neighbours_to_list(list_of_ignited_cells)
        // current_index = cache - current_index // TODO #19 - improof efficency of cellular automaton algorithm

    }



    // return cellular_automaton(list_of_ignited_cells) // Recursion took place right here
    /*
    console.log("x of ignided cell "+ 0 + ": " + list_of_ignited_cells[0].x);
    console.log("y of ignided cell "+ 0 + ": " + list_of_ignited_cells[0].y);
    console.log("t of ignided cell "+ 0 + ": " + list_of_ignited_cells[0].t);
    */
    // console.log("list_of_ignited_cells: " + JSON.stringify(list_of_ignited_cells, null, 0));
    // console.log("next recursion step");

    return list_of_ignited_cells // Alternative
}


// helper function to efficently find the latest time
function find_latest_time_in_list_of_ignited_cells(in_array) {
    let latest_time = -1;
    let cell_with_latest_time;
    for (i = 0; i < in_array.length; i++) {
        if (in_array[i].t > latest_time) {
            latest_time = in_array[i].t;
            // cell_with_latest_time = in_array[i];
        }
    }

    // console.log(latest_time);

    return latest_time // cell_with_latest_time.id
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

// DOM interaction
function fill_table(in_list) {
    for (let i = 0; i < in_list.length; i++) {
        let table_cell = document.getElementById(`x${in_list[i].x}y${in_list[i].y}`); // uses id of needed cell in the table
        table_cell.textContent = in_list[i].t  // in_list[i].id;
        /*
        let test_2 = document.getElementById(`x${in_list[i].x}y${in_list[i].y}`).value
        console.log(test_2);
        */
    }
}