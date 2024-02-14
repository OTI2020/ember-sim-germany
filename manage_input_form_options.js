 function showVegetationOptions() {
        var vegetationType = document.getElementById("vegetationType").value;
        var grasslandOptions = document.getElementById("grasslandOptions");
        var forestOptions = document.getElementById("forestOptions");

        if (vegetationType === "grassland") {
            grasslandOptions.style.display = "block";
            forestOptions.style.display = "none";
        } else if (vegetationType === "forest") {
            grasslandOptions.style.display = "none";
            forestOptions.style.display = "block";
        }
    }