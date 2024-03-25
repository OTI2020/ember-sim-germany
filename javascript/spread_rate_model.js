// let spread_rate = 100;





// Simple spread rate model used for testing. Will set the spread rate to a constant.
function simple_spread_rate_model() {

  /*
  calculate_spread_rate(point, t0, t1) {
    // r = Math.random()
 
    // point.theta = if t0 < 250 then 0 else Math.PI / 2.0
    // point.forward_spread_rate = (0.3 + r*0.6) * 3
    // point.flanking_spread_rate = (0.1 + r*0.2) * 3
 
    point.theta = 0;
    return spread_rate = 1;
  }*/
  let spread_rate;
  return spread_rate = 1;

}



// Same spread_rate for the whole area all the time - MUST change this if you want dynamic parameter input with API from WeatherApp...
// const mcarthur_spread_rate_model = function(point, t0, t1) {
function mcarthur_spread_rate_model() {
  const kbdi = document.getElementById("kdbi").value // point.param('VEGETATION', 150);
  if (!kbdi) { return; } // if no data

  const p = document.getElementById("precipitation").value // point.param('RAIN', 5);
  const n = document.getElementById("daysSinceRain").value // point.param('RAIN', 14);

  const d1 = (0.191 * (kbdi + 104) * Math.pow(n + 1, 1.5));
  const d2 = (((3.52 * Math.pow(n + 1, 1.5)) + p) - 1);
  const d = d1 / d2;

  const u = document.getElementById("windSpeed").value // point.param('WIND', 20); // wind speed
  const rh = document.getElementById("relativeHumidity").value // point.param('ATMOSPHERE', 50);
  const t = document.getElementById("airTemperature").value // point.param('ATMOSPHERE', 30);
  const mc = (5.658 + (0.04651 * rh) + ((0.0003151 * Math.pow(rh, 3)) / t)) - (0.185 * Math.pow(t, 0.77));
  const ffdi = 34.81 * Math.exp(0.987 * Math.log(d)) * Math.pow(mc, -2.1) * Math.exp(0.0234 * u);

  const w = document.getElementById("w").value // point.param('VEGETATION', 1);

  let spread_rate = 0.0012 * ffdi * w;
//  console.log(`spread_rate (McArthur) = ${spread_rate}`);
  return spread_rate
};



// const cheney_spread_rate_model = function(point, t0, t1) {
function cheney_spread_rate_model() {
  const grazing = document.getElementById("grazing").value // point.param('VEGETATION', 0);
  if (grazing == null) { return; }

  const u = document.getElementById("windSpeed").value // point.param('WIND', 20);
  const c = document.getElementById("c").value // point.param('VEGETATION', 100);
  const mc = document.getElementById("fmc").value; // point.param('VEGETATION', 2.0); 
  // TODO #22 - Question?? mc = fmc = FRB (Fuel reduction burn)

  const dm = mc < 12 ?
    Math.exp(-0.108 * mc) :
    u < 10 ?
      0.684 - (0.0342 * mc) :
      0.547 - (0.0228 * mc);

  const dc = c < 20 ?
    1.12 / (1 + (59.2 * Math.exp(-0.124 * (c - 50)))) :
    1.036 / (1 + (103.99 * Math.exp(-0.0996 * (c - 20))));

  const r = (() => {
    switch (grazing) {
      case 0:
        if (u < 5) {
          return (0.054 + (0.269 * u)) * dm * dc;
        } else {
          return (1.4 + (0.838 * Math.pow(u - 5, 0.844))) * dm * dc;
        }
      case 1:
        if (u < 5) {
          return (0.054 + (0.209 * u)) * dm * dc;
        } else {
          return (1.1 + (0.715 * Math.pow(u - 5, 0.844))) * dm * dc;
        }
      case 2:
        if (u < 5) {
          return (0.054 + (0.209 * u)) * dm * dc;
        } else {
          return (0.55 + (0.357 * Math.pow(u - 5, 0.844))) * dm * dc;
        }
    }
  })();

  let spread_rate = r
  console.log(`spread_rate (Cheney) = ${spread_rate}`);
  return spread_rate; // Same spread_rate for the whole area all the time
};