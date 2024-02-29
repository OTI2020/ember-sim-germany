new_cells_index = 0

start_calculation = ->
  console.log 'load input for parameters'
  # loadInput();
  console.log 'start calculation'
  arrivaltime_test = 0.5
  # TODO: #11 add function in own file to calculate arrivaltime with the propagation model
  inital_ignition = [
    {
      id: 0
      x: 5
      y: 2
      t: 0
    }
    {
      id: 1
      x: 1
      y: 8
      t: 0
    }
  ]
  # TODO: #10 in future the data (x,y,arrivaltime) will come from the input form submission by the user
  steps = 5
  # TODO: #10 in future the data will come from the input form submission by the user
  # time_steps(steps, arrivaltime_test, inital_ignition)
  final_list_of_burning_cells = undefined
  final_list_of_burning_cells = cellular_automaton(inital_ignition)
  # console.log(final_list_of_burning_cells);
  # console.log(JSON.stringify(final_list_of_burning_cells, null, 0));
  fill_table final_list_of_burning_cells
  # testing result visual in a table
  # const modelRunner = initModelRunner();
  return

add_neighbours_to_list = (in_list_of_cells) ->
  length_at_this_time = in_list_of_cells.length
  # the length of the array changes in these loops, so we need this static value for the length at the beginning
  id_counter = length_at_this_time - 1
  # value for id of the last cell in the list
  new_cells_counter = 0
  i = new_cells_index
  while i < length_at_this_time
    j = -1
    while j < 2
      k = -1
      while k < 2
        new_cell = 
          id: null
          x: null
          y: null
          t: null
        new_cell.x = in_list_of_cells[i].x + j
        new_cell.y = in_list_of_cells[i].y + k
        # check if the cell is out of border or coordinates are already in the list
        cell_exists = true
        #in_list_of_cells.some(cell => cell.x === new_cell.x && cell.y === new_cell.y);
        # console.log("cell_exists = " + cell_exists);
        if !cell_exists and new_cell.x >= 0 and new_cell.x <= 9 and new_cell.y >= 0 and new_cell.y <= 9
          id_counter++
          # Only new id/cell generated if condition fulfilled 
          new_cell.id = id_counter
          new_cell.t = in_list_of_cells[i].t + calculate_arrival_time(new_cell, in_list_of_cells[i], null)
          #test data for elevation?
          # new_cell.t = in_list_of_cells[i].t + 0.5 //test data for elevation?
          # console.log("new cell: " + JSON.stringify(new_cell, null, 1));
          in_list_of_cells.push new_cell
          new_cells_counter++
          # new_cells_index++}
        else if cell_exists
          # check if minimum possible arrival time, else overwrite
          new_cell.t = in_list_of_cells[i].t + calculate_arrival_time(new_cell, in_list_of_cells[i], null)
          s = 0
          while s < in_list_of_cells.length
            if in_list_of_cells[s].x == new_cell.x and in_list_of_cells[s].y == new_cell.y
              if in_list_of_cells[s].t > new_cell.t
                in_list_of_cells[s].t = new_cell.t
                console.log 'OVERWRITE arrival time'
            s++
        k++
      j++
    i++
  new_cells_index = in_list_of_cells.length - new_cells_counter
  # variable value saved outside this function       
  in_list_of_cells

# 

cellular_automaton = (in_inital_ignition) ->
  list_of_ignited_cells = in_inital_ignition
  # in past: called "grid" and not list, but technically it was a list
  # Check if simulation should end
  # breake recursion if simulation runs out of time
  max_steps = document.getElementById('simulationSteps').value
  # DOM in every iteration? Is that smart??
  # let current_index = 0;
  cache = 0
  current_step = 0
  loop
    # const last_cell_index = list_of_ignited_cells.length - 1
    # const time_last_cell = list_of_ignited_cells[last_cell_index].t
    latest_time = find_latest_time_in_list_of_ignited_cells(list_of_ignited_cells)
    console.log '>  >  >  CHECK latest_time ' + latest_time
    if current_step >= max_steps
      #|| list_of_ignited_cells.length >= 4) { //5.9) { //TODO #20 - find bug - Why is this always a stackoverflow when max_time is greater than 3 ??
      console.log '> > > TIME IS OVER < < <'
      console.log 'latest_time ' + latest_time
      console.log 'list_of_ignited_cells: ' + JSON.stringify(list_of_ignited_cells, null, 0)
      return list_of_ignited_cells
      # return breaks recursion
      break
    current_step++
    console.log 'current_step ' + current_step
    # cache = list_of_ignited_cells.length
    list_of_ignited_cells = add_neighbours_to_list(list_of_ignited_cells)
    # current_index = cache - current_index // TODO #19 - improof efficency of cellular automaton algorithm
  return

# helper function to efficently find the latest time

find_latest_time_in_list_of_ignited_cells = (in_array) ->
  latest_time = -1
  i = 0
  while i < in_array.length
    if in_array[i].t > latest_time
      latest_time = in_array[i].t
    i++
  # console.log(latest_time);
  latest_time

# ---
# generated by js2coffee 2.2.0