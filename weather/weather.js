// weather.js
"use strict";

$(document).ready(function() {
	
	updateWeather();
});

function updateWeather(){
	$("#cities").html(""); // clear table
    $.ajax( {
        url:"weather.json",
		type: "GET",
        dataType: "json", // Returns JSON
		success: function(response) {
			let sTxt = `<tr>
					<th>City</th>
					<th>Current Conditions</th>
					<th>Temperature</th>
					<th>Wind Speed</th>
					<th>Wind Direction</th>
					<th>Wind Chill</th>
					</tr>
			`;
			$.each(response.cities, function(index) {        
				sTxt += "<tr><td>" 
				+ response.cities[index].name 
				+ "</td><td>" + getIcon(response.cities[index].currentcond)
				+ "</td><td>" + response.cities[index].temperature + "&#8451;"
				+ "</td><td>" + response.cities[index].windspeed + "mph"
				+ "</td><td>" + response.cities[index].winddirection
				+ "</td><td>" + response.cities[index].windchill + "&#8451;"
				+ "</td></tr>";
			});
			$("#cities").append(sTxt);
			$("#info").html(""); // clear any error messages
		},	
		error: function() {
			$("#info").html("<p>An error has occurred, please reload the page and try again.</p>");
        }
    }); 
	setTimeout(updateWeather, 10000); // recursive call
}

function getIcon(str){
	const imgs = ["cloud", "hail", "heavy cloud", "rain", "heavy rain", 
				"sleet", "snow", "sun", "sun and cloud", "thunderstorm"];
	str = str.toLowerCase().trim();
	
	
	let index = imgs.find(function(e){
		if(e.includes(str)){
			return true;
		}
		return null;
	});
	
	if(index != null) 
		return `<img src="./weather_icons/${index}.png" alt="${index}" class="wicon">`;
	else
		return `<img src="./weather_icons/cloud.png" alt="cloudy" class="wicon">`; // default
}