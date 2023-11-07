> Ember Sim
<p align="center">
  <img src="https://github.com/OTI2020/ember-sim-germany/blob/main/images/head-animation.gif" alt="ember-sim-germany" width="400" height="auto">
</p>

# ember-sim-germany

WebApp to simulate the spread of forest-fire (or ember) with models for forests in Germany. 
Tool for education and civil servants.

[![GitHub Sterne](https://img.shields.io/github/stars/OTI2020/ember-sim-germany?style=flat-square)](https://github.com/OTI2020/ember-sim-germany)
[![GitHub Forks](https://img.shields.io/github/forks/oti2020/ember-sim-germany?style=flat-square)](https://github.com/oti2020/ember-sim-germany/network)
[![GitHub Probleme](https://img.shields.io/github/issues/oti2020/ember-sim-germany?style=flat-square)](https://github.com/oti2020/ember-sim-germany/issues)
[![GitHub Pull-Anfragen](https://img.shields.io/github/issues-pr/oti2020/ember-sim-germany?style=flat-square)](https://github.com/oti2020/ember-sim-germany/pulls)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/oti2020/ember-sim-germany?style=flat-square)
[![GitHub Lizenz](https://img.shields.io/github/license/oti2020/ember-sim-germany?style=flat-square)](https://github.com/oti2020/ember-sim-germany/blob/main/LICENSE)

---

## About

Inspiration: Project for Australia:
[Ember-Simulation-Australia](http://ember-sim.s3-website-ap-southeast-2.amazonaws.com/)

### Input Parameters for Users
* Vegetation
  - vegetation parameters:
    * if grassland (near Stawell):
      - FMC (double)
      - C (?)
      - grazing (?)
    * if forest (Cotter River):
      - treatment ... (???)
      - KBDI (?)
      - w (?)
  - select: 
    * a provided geotiff file
      - if so, you can even edit its vegetation parameters in the parameter Lookup table
    * upload own tiff file
    * upload own csv file

* Elevation
  - select flat topography, a provided geotiff file or upload own tiff file
* Wind
  - Direction(degrees to North: 0-360)
  - 2min Speed(km/h as double/float)
* Atmosphere
  - Air temperature(°C)
  - Relative humidity(%)
* Rain
  - Precipitation(mm)
  - Days since rain(days)
* Ignition Point(s)
  - you can add as much ignition points as you want
* Simulation
  - select spread rate model
    - McArthur Eucalypt
    - Cheney Grassland
  - konfigurate simulation steps
    - at least 1 (Each simulation step is 30 minutes)
* Properties
  - is not (directly) editable by the user
  - contains:
    - Bounds (North, East, South, West)
    - Resolution:
      - x = 15 (?)
      - y = 15 (?)
      - time = 30 (Minutes)
    - Raster extends
      - X (?)
      - Y (?)

---

## Demo

* Info about Live-Domo
---

## Installation
- JavaScript

---

## Useage

* How the project gets used and code samples
---

## Contribution
* Do you want to expend the project? Great choice! See Istallation first and then read the - Encourage other developers to contribute to your project. Give instructions on how to set up the development environment and submit contributions.
---

## License
- MIT-License: see [here](https://github.com/OTI2020/ember-sim-germany/blob/main/LICENSE)
---
