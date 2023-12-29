saveinput = () => {
  var city = document.getElementById("input").value;
  const weatherinfo = document.querySelector(".weatherinfo");

  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://geocode.maps.co/search?q=${city}&api_key=658ec0fcded04350021593zyi97a698`
  );

  request.send();

  request.addEventListener("load", function () {

    const [data] = JSON.parse(this.responseText);
    // let lat = Math.floor(data.lat);
    let lat = (data.lat);
    let lon = (data.lon);
    // let lon = Math.floor(data.lon);

    // console.log(lat);
    // console.log(lon);
    weatherinfo.style.display = "block";

    const generateWeather = async () => {
      try {
        const setHeader = {
          headers: {
            Accept: "application/json",
          }
        }
        
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&forecast_days=14`, setHeader);
        
        const finaldata = await res.json();
        
        console.log(finaldata);
        var today = new Date();
        if (today.getMonth() + 1 <= 9) {
          var date =
            today.getFullYear() +
            "-0" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        }
        if (today.getMonth() + 1 >= 10) {
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
        }
        // var time = today.getHours() + "00:00";
        var time = "00:00";
        const search = date + "T" + time;

        // function convertUTCDateToLocalDate(date) {
        //     var newDate = new Date(date.getTime());
        //     var hours = date.getHours();
        //     newDate.setHours(hours);
        //     return newDate;
        // }
        var index = ((finaldata.hourly.time).indexOf(search));
        weatherinfo.innerHTML = "";
        // for (var i = index; i < index + 24; i++)
        {
          // var space = i;
          // weatherinfo.innerHTML += (`Temperature and Humidity on ${(convertUTCDateToLocalDate(new Date(finaldata.hourly.time[i]))).toLocaleString()} in ${city} will be ${finaldata.hourly.temperature_2m[i]}${finaldata.hourly_units.temperature_2m} & ${finaldata.hourly.relativehumidity_2m[i]}${finaldata.hourly_units.relativehumidity_2m}` + "<br><br>");

          // weatherinfo.innerHTML += (`<br>On ${(convertUTCDateToLocalDate(new Date(finaldata.hourly.time[i]))).toLocaleTimeString('en-US')} TEMPERATURE: ${finaldata.hourly.temperature_2m[i]}${finaldata.hourly_units.temperature_2m} , HUMIDITY: ${finaldata.hourly.relativehumidity_2m[i]}${finaldata.hourly_units.relativehumidity_2m}<br>`);

          weatherinfo.innerHTML += `
          <div>
          <img src="sun-3000986_1280.png" id="imgweather" alt="" srcset="">
          </div>
          
          <div id="innerhtml">
                    <div class="temperature">
                    ${finaldata.hourly.temperature_2m[index]}${finaldata.hourly_units.temperature_2m}  
                    </div>
                    
                    <div class="humidity">
                    <img src="water-2072211_1280.png" alt="droplet" srcset="" id="droplet" >
                    <div id="humiditydata">
                    ${finaldata.hourly.relativehumidity_2m[index]}${finaldata.hourly_units.relativehumidity_2m}
                    </div>
                    <br>
                    <div id="humidityheading">
                    HUMIDITY 
                    </div>
                    </div>
                    </div>
                    `
        }
      } catch (err) {
        console.log(`The error is ${err}`);
      }
    };
    generateWeather();
  });
};






getlocation = () => {
    latitude=0;
    longitude=0;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(latitude);
            console.log(longitude);
            const weatherinfo = document.querySelector(".weatherinfo");
            weatherinfo.style.display = "block";


            const generateWeather = async () => {
                try {
                  const setHeader = {
                    headers: {
                      Accept: "application/json",
                    }
                  }
                  
                  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&forecast_days=14`, setHeader);
                  
                  const finaldata = await res.json();
                  
                  var today = new Date();
                  if (today.getMonth() + 1 <= 9) {
                    var date =
                      today.getFullYear() +
                      "-0" +
                      (today.getMonth() + 1) +
                      "-" +
                      today.getDate();
                  }
                  if (today.getMonth() + 1 >= 10) {
                    var date =
                      today.getFullYear() +
                      "-" +
                      (today.getMonth() + 1) +
                      "-" +
                      today.getDate();
                  }
                  // var time = today.getHours() + "00:00";
                  var time = "00:00";
                  const search = date + "T" + time;
          
                  // function convertUTCDateToLocalDate(date) {
                  //     var newDate = new Date(date.getTime());
                  //     var hours = date.getHours();
                  //     newDate.setHours(hours);
                  //     return newDate;
                  // }
                  var index = ((finaldata.hourly.time).indexOf(search));
                  weatherinfo.innerHTML = "";
                  // for (var i = index; i < index + 24; i++)
                  {
                    // var space = i;
                    // weatherinfo.innerHTML += (`Temperature and Humidity on ${(convertUTCDateToLocalDate(new Date(finaldata.hourly.time[i]))).toLocaleString()} in ${city} will be ${finaldata.hourly.temperature_2m[i]}${finaldata.hourly_units.temperature_2m} & ${finaldata.hourly.relativehumidity_2m[i]}${finaldata.hourly_units.relativehumidity_2m}` + "<br><br>");
          
                    // weatherinfo.innerHTML += (`<br>On ${(convertUTCDateToLocalDate(new Date(finaldata.hourly.time[i]))).toLocaleTimeString('en-US')} TEMPERATURE: ${finaldata.hourly.temperature_2m[i]}${finaldata.hourly_units.temperature_2m} , HUMIDITY: ${finaldata.hourly.relativehumidity_2m[i]}${finaldata.hourly_units.relativehumidity_2m}<br>`);
          
                    weatherinfo.innerHTML += `
                    <div>
                    <img src="sun-3000986_1280.png" id="imgweather" alt="" srcset="">
                    </div>
                    
                    <div id="innerhtml">
                              <div class="temperature">
                              ${finaldata.hourly.temperature_2m[index]}${finaldata.hourly_units.temperature_2m}  
                              </div>
                              
                              <div class="humidity">
                              <img src="water-2072211_1280.png" alt="droplet" srcset="" id="droplet" >
                              <div id="humiditydata">
                              ${finaldata.hourly.relativehumidity_2m[index]}${finaldata.hourly_units.relativehumidity_2m}
                              </div>
                              <br>
                              <div id="humidityheading">
                              HUMIDITY 
                              </div>
                              </div>
                              </div>
                              `
                  }
                } catch (err) {
                  console.log(`The error is ${err}`);
                }
              };
              generateWeather();

        }, function(error) {
            document.getElementById("error").textContent = `Error getting location: ${error.message}`;
        });
    } else {
        document.getElementById("error").textContent = "Geolocation is not supported by your browser";
    }

};