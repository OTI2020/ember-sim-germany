function loadInput() {
    // Vegetation
    var vegetationType = document.getElementById("vegetationType").value;
    var fmc = document.getElementById("fmc").value;
    var c = document.getElementById("c").value;
    var grazing = document.getElementById("grazing").value;
    var treatment = document.getElementById("treatment").value;
    var kdbi = document.getElementById("kdbi").value;
    var w = document.getElementById("w").value;

    // Elevation
    var elevationType = document.getElementById("elevationType").value;

    // Wind
    var windDirection = document.getElementById("windDirection").value;
    var windSpeed = document.getElementById("windSpeed").value;

    // Atmosphere
    var airTemperature = document.getElementById("airTemperature").value;
    var relativeHumidity = document.getElementById("relativeHumidity").value;

    // Rain
    var precipitation = document.getElementById("precipitation").value;
    var daysSinceRain = document.getElementById("daysSinceRain").value;

    // Ignition Points
    var ignitionPoints = document.getElementById("ignitionPoints").value;

    // Simulation
    var simulationSteps = document.getElementById("simulationSteps").value;

    /* // Output
    console.log("Vegetation Type:", vegetationType);
    console.log("FMC:", fmc);
    console.log("C:", c);
    console.log("Grazing:", grazing);
    console.log("Treatment:", treatment);
    console.log("KBDI:", kdbi);
    console.log("W:", w);
    console.log("Elevation Type:", elevationType);
    console.log("Wind Direction:", windDirection);
    console.log("Wind Speed:", windSpeed);
    console.log("Air Temperature:", airTemperature);
    console.log("Relative Humidity:", relativeHumidity);
    console.log("Precipitation:", precipitation);
    console.log("Days Since Rain:", daysSinceRain);
    console.log("Ignition Points:", ignitionPoints);
    console.log("Simulation Steps:", simulationSteps);
    */

}

function calculate_arrival_time(from_point, to_point, t0, t1, flat) {
    if (flat == null) { flat = false; }
    if ((from_point.position.x === to_point.position.x) && (from_point.position.y === to_point.position.y)) { return from_point.ignition_time; }

    // also for less typing
    const xp = to_point.position.x;
    const yp = to_point.position.y;
    const x0 = from_point.position.x;
    const y0 = from_point.position.y;

    const xd = xp - x0;
    const yd = yp - y0;


    // adjust spread rate based on terrain and wind
    const slope = flat === true ? 0 : from_point.param('SLOPE'); // in degrees
    if (slope == null) { return; }

    // TODO: use a better approximation for slope - there's some empirical exp() stuff somewhere
    const terrain_factor = (2.0 * slope) / 10.0; // based on firefighter's mannual - spread rate doubles for every 10 degrees of slope
    // theta = from_point.theta
    // aspect points in the direction of the downslope, need to rotate by 180
    const aspect = flat === true ? 180.0 : from_point.param('ASPECT') + 180.0;
    const terrain_theta = (aspect * Math.PI) / 180.0;

    // after [Alexander 1985]
    const wind_speed = (from_point.param('WIND', 'speed_2m'));
    const wind_factor = 1.0 + (0.00120 * Math.pow(wind_speed, 2.154));
    const wind_theta = ((from_point.param('WIND', 'angle') * Math.PI) / 180.0) + Math.PI;

    const tx = terrain_factor * Math.cos(terrain_theta);
    const ty = terrain_factor * Math.sin(terrain_theta);

    const wx = wind_factor * Math.cos(wind_theta);
    const wy = wind_factor * Math.sin(wind_theta);

    const cx = tx + wx;
    const cy = ty + wy;

    let c = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));
    let theta = Math.atan(cy / cx) - (Math.PI / 2.0);

    theta = cx > 0 ?
        cy > 0 ?
            // Q1
            theta
            :
            // Q4
            theta + (2 * Math.PI)
        :
        // Q2 or Q3
        theta + Math.PI;

    // spread rate is in km/h, we need m/h
    let r = (from_point.spread_rate * 1000.0) / 60.0;

    // TODO HACK - this is to correct the ellipsis shape for high winds - need to find the problem with the algorithm!
    r = r / ((-0.0097 * wind_speed) + 1.0558);

    const forward_spread_rate = r;

    // spread rate models include wind effects, so we'll approximate the flanking (0-wind) spread rate
    const flanking_spread_rate = r / wind_factor;

    // for less typing...
    c = Math.cos(theta);
    const s = Math.sin(theta);

    const b = flanking_spread_rate;
    const bsq = Math.pow(b, 2);

    // calculate focus distance
    const f = (Math.pow(forward_spread_rate, 2) - bsq) / (2 * forward_spread_rate);
    const fsq = Math.pow(f, 2);

    // calculate major axis length from forward spread rate and focus
    const a = forward_spread_rate - f;
    const asq = Math.pow(a, 2);

    // transform the coordinate system
    const xs = (xd * c) + (yd * s);
    const ys = (-xd * s) + (yd * c);

    // solve quadratic equation
    const div = 1 - (fsq / asq);
    const p2 = ((2 * xs * f) / asq) / (2 * div);
    const q = - ((Math.pow(xs, 2) / asq) + (Math.pow(ys, 2) / bsq)) / div;

    let tarrival = - p2 + Math.sqrt(Math.pow(p2, 2) - q);
    // the second solution of the quadratic equation is physically irrelevant as it inverts the ellipsis
    // t2 = - p2 - Math.sqrt( p2**2 - q )

    // calculate slope between the two points
    const phi = Math.atan((to_point.param('ELEVATION') - from_point.param('ELEVATION')) / Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2)));

    //tarrival = tarrival * (0.9+Math.random()*0.2)

    // correct for slope and initial ignition time
    tarrival = tarrival / Math.cos(phi);
    tarrival = from_point.ignition_time + tarrival;

    return tarrival;
}