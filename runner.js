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
    */
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