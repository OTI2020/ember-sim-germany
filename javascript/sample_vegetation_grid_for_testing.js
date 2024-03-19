/**
 * IDEA: a grid that says there is something burnable or not.
 * before my algorithim compleetly ignored, if a cell contains vegetation or not
 * global variable needed in an other file, 
 * that is why I use the window tag
 * 
*/

window.sampleVegetationGrid = [
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