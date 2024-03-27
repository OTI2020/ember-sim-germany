function start_calculation() {
    console.log("load input for parameters")
    console.log("start calculation");
    const arrivaltime_test = 0.5; // TODO: #11 add function in own file to calculate arrivaltime with the propagation model


    let ignition_x = document.getElementById("ignition_x").value
    let ignition_y = document.getElementById("ignition_y").value
    let __ignition_string = '[{"id":0, "x":' + ignition_x + ', "y":' + ignition_y + ', "t":0}]'
    const inital_ignition = JSON.parse(__ignition_string)

    // const inital_ignition = [{ id: 0, x: 5, y: 2, t: 0 }, { id: 1, x: 1, y: 8, t: 0 }]; // TODO: #10 in future the data (x,y,arrivaltime) will come from the input form submission by the user

    // TODO: #10 in future the data will come from the input form submission by the user
    let final_list_of_burning_cells
    final_list_of_burning_cells = cellular_automaton(inital_ignition)
    fill_table(final_list_of_burning_cells) // testing result visual in a table

}

let new_cells_index = 0

function add_neighbours_to_list(in_list_of_cells) {
    let length_at_this_time = in_list_of_cells.length // the length of the array changes in these loops, so we need this static value for the length at the beginning
    let id_counter = length_at_this_time - 1 // value for id of the last cell in the list
    let new_cells_counter = 0
    for (let i = new_cells_index; i < length_at_this_time; i++) {
        for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
                let new_cell = { "id": null, "x": null, "y": null, "t": null }
                new_cell.x = in_list_of_cells[i].x + j
                new_cell.y = in_list_of_cells[i].y + k

                // check if the cell is out of border or coordinates are already in the list
                let cell_exists = in_list_of_cells.some(cell => cell.x === new_cell.x && cell.y === new_cell.y);
                if (!cell_exists && new_cell.x >= 0 && new_cell.x <= 49 && new_cell.y >= 0 && new_cell.y <= 49) {
                    id_counter++ // Only new id/cell generated if condition fulfilled 
                    new_cell.id = id_counter
                    new_cell.t = in_list_of_cells[i].t + calculate_arrival_time(new_cell, in_list_of_cells[i], true) //test data for elevation?
                    in_list_of_cells.push(new_cell)
                    new_cells_counter++// new_cells_index++}
                } else if (cell_exists) {
                    // check if minimum possible arrival time, else overwrite
                    new_cell.t = in_list_of_cells[i].t + calculate_arrival_time(new_cell, in_list_of_cells[i], null)
                    for (let s = 0; s < in_list_of_cells.length; s++) {
                        if (in_list_of_cells[s].x === new_cell.x && in_list_of_cells[s].y === new_cell.y) {
                            if (in_list_of_cells[s].t > new_cell.t) {
                                in_list_of_cells[s].t = new_cell.t;
                                console.log("OVERWRITE arrival time");
                            }
                        }
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
         const latest_time = find_latest_time_in_list_of_ignited_cells(list_of_ignited_cells)

        if (current_step >= max_steps) {//|| list_of_ignited_cells.length >= 4) { //5.9) { //TODO #20 - find bug - Why is this always a stackoverflow when max_time is greater than 3 ??
            console.log("> > > TIME IS OVER < < <");
            console.log("latest_time " + latest_time);
            return list_of_ignited_cells // return breaks recursion
        }
        current_step++
        list_of_ignited_cells = add_neighbours_to_list(list_of_ignited_cells)
        // current_index = cache - current_index // TODO #19 - improof efficency of cellular automaton algorithm

    }
}


// helper function to efficently find the latest time
function find_latest_time_in_list_of_ignited_cells(in_array) {
    let latest_time = -1;
    for (let i = 0; i < in_array.length; i++) {
        if (in_array[i].t > latest_time) {
            latest_time = in_array[i].t;
        }
    }
    return latest_time
}
