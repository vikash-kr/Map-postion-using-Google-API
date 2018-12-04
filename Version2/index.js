const express = require('express');
const app = express();
const request = require('request');
var bodyParser = require("body-parser");

//setting view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// setting up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//employe deetail -> we will fetch this from DATABASE lettar
var employeeList = [
	{	
		employeeID :1,
		firstName:'vikash',
		lastname:'kumar',
		address:'Vile Parle Navpada Vile Parle East Vile Parle Mumbai Maharashtra 400057'
	}
];


// app.get('/', (req, res) => {
// 	request('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBOPhQDBl3hTlx5q4K8UOAqicK6776BhSg', function (error, response, body) {
// 	  	if(error){
// 	  		console.log("Error in fetching data from map API");
// 	  		console.log(error); // Print the error if one occurred
// 	  	}else{
// 	  		if(response.statusCode == 200)
// 	  			console.log(body);
// 				var josnFormatBody = JSON.parse(body);
// 	  		    res.render('home',{josnFormatBody:josnFormatBody});
// 	  	}
// 	});
	
// });
app.get("/", function (req, res) {
    var destination = employeeList[0].address;
    // value is hardcoded
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + destination + "&key=AIzaSyBOPhQDBl3hTlx5q4K8UOAqicK6776BhSg";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedDataLocation = JSON.parse(body);
            console.log("Initial value")
            console.log(parsedDataLocation);
            console.log("");
            var locationID = parsedDataLocation.results[0].place_id;
            
            var url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + locationID + "&key=AIzaSyBOPhQDBl3hTlx5q4K8UOAqicK6776BhSg";
            console.log(url);
            console.log("");
            request(url, function(error1, response1, body1){
                if(!error && response.statusCode == 200) {
                    var parsedDataInformation = JSON.parse(body1);
                    console.log(parsedDataInformation.result.geometry.location);
                    var coordinate = parsedDataInformation.result.geometry.location;

                    res.render("home", {coordinate:coordinate, employeeList:employeeList});
                    //console.log(parsedDataInformation);
                    console.log("");
                }
            });
        }
    });
});

app.listen(3000, () => console.log(`App started on port 3000!`))