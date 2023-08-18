// weather.js
"use strict";

const apikey = "";

$(document).ready(function() {

	$("#cities").hide();
	
	$("#countries").change(function(){
		if($(this).val() != "Select a Country"){ // valid country chosen
			$("#cities").load($(this).val() + ".html");
			$("#cities").show();
		} else {
			$("#cities").hide();
			$("#cityname").html("");
			$("#cityinfo").html("");
			$("#info").html("");
		}
	});
	
	$("#cities").change(function(){
		if($(this).val() != "Select a City"){ // valid city chosen
			$("#cityname").html("You have selected: " + $(this).val());
			update($(this).val());
		} else {
			$("#cityinfo").html("");
			$("#cityname").html("");
			$("#info").html("");
		}
	});
});

function update(city){
	
    $.ajax( {
        url:"https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apikey,
		type: "GET",
        dataType: "json", // Returns JSON
		success: function(response) {
			let sTxt = `<tr>
					<th>City</th>
					<th>Date</th>
					<th>Current Conditions</th>
					<th></th>
					<th>Temperature</th>
					<th>Wind Speed</th>
					<th>Wind Direction</th>
					</tr>
			`;
			
			const date = new Date();
			
			
			sTxt += "<tr><td>" 
				+ response.name 
				+ "</td><td>" + date.toLocaleDateString()
				+ "</td><td>" + getIcon(response.weather[0].main)
				+ "</td><td>" + response.weather[0].main
				/*+ "</td><td>" + response.weather[0].description*/
				+ "</td><td>" + kelvintoc(response.main.temp) + "&#8451;/" + kelvintof(response.main.temp) + "F"
				+ "</td><td>" + mpstomph(response.wind.speed) + "mph/" + mpstokph(response.wind.speed) + "kph"
				+ "</td><td>" + response.wind.deg + "&deg; " + winddirection(response.wind.deg)
				+ "</td></tr>";
				
			$("#cityinfo").html(""); // clear the table
			$("#info").html(""); // clear any error messages
			$("#cityinfo").append(sTxt);
			
			if(isseveretemp(response.main.temp)){
				$("#info").append("<p>Severe temperature warning!</p>");
			}
			if(isseverewind(response.wind.speed)){
				$("#info").append("<p>Severe wind warning!</p>");
			}
		},	
		error: function() {
			$("#info").html("<p>An error has occurred</p>");
        }
    });
}

function kelvintoc(temp){
	// convert kelvin to celcius
	return (temp - 273.15).toFixed();
}

function kelvintof(temp){
	// convert kelvin to fahrenheit
	return ((temp - 273.15) * 9/5 + 32).toFixed();
}

/*
Convert meters per second into miles per hour
*/
function mpstomph(windspeed){
	//Unit Default: meter/sec
	return (windspeed * 2.237).toFixed();
}

/*
Convert meters per second into kilometers per hour
*/
function mpstokph(windspeed){
	return (windspeed * 3.6).toFixed();
}

function winddirection(direction){
	// convert wind direction to string eg. 0 deg - > North

	// https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words
 
	let val = Math.floor((direction / 45) + 0.5);
	const arr = ["Northernly", "North Easterly", "Easterly", "South Easterly",
				"Southernly", "South Westerly", "Westerly", "North Westerly"];

	return arr[(val % 8)];
}

/*
Check if the weather conditions are severe
return true/false
*/
function isseveretemp(temp){
	if(kelvintoc(temp) > 35 || kelvintoc(temp) < 5){ // 35
		
		return true;
	}
	
	return false;
}

/*
Check if the wind conditions are severe
return true/false
*/
function isseverewind(temp, windspeed){
	if(mpstomph(windspeed) > 50){ // mph
		
		return true;
	}
	
	return false;
}

/*
convert weather condition to icon
eg. cloud to cloud.png img
*/
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
