const sampleVegetationGrid = [
    // 0 means not ignitable like streets, water etc.
    // 1 means forest
    // 2 means forest is or was ignited/burning here

    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], 
    [1, 1, 0, 0, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 0, 0]
];

// console.log(sampleVegetationGrid);