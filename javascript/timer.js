timer()
function test_run() {
    var start = performance.now();
    start_calculation()
    var time = performance.now();
    console.log('Dauer: ' + (time - start) + ' ms.');
    console.clear();
}


function timer() {
    var runtimes = [];

    for (var i = 0; i < 100; i++) {
        test_run();
        runtimes.push(time - start);
    }

    console.log('list of runtimes:');
    console.log(runtimes);
}
