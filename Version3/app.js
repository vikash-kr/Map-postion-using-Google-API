var express = require("express");
var app = express();

//to convert request.body to json
var bodyParser = require("body-parser");    
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setting html templete
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//this we will fetch from DATABASE later
var employees = [
        {name: "Vikash Kumar", address: "Naval Dockyard Navpada, Vile Parle East, Vile Parle Mumbai, Maharashtra 400023", ID : 1},
        {name: "Ganesh Gokhele", address: "Indrajit Society, Vithaldas Nagar, Santacruz West, Mumbai, Maharashtra 400054",ID:2},
        {name: "Mountain Man", address: "Junction, LBS Rd, Kamani, Kurla West, Kurla, Mumbai, Maharashtra 400070",ID: 3 },
        
];

var locations =[];//value is added when viewmap route is called
 

//setting geolocation api
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBOPhQDBl3hTlx5q4K8UOAqicK6776BhSg'
});

//home page
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/viewmap", function(req, res){
        for(let i=0;i<employees.length ; i++){
            
            var destination = employees[i].address;

                // Geocode of an  address. link - https://github.com/googlemaps/google-maps-services-js
                googleMapsClient.geocode({
                  address: destination
                }, function(err, response) {
                  if (!err) {
                    var newLocation = {lat:response.json.results[0].geometry.location.lat , lng :response.json.results[0].geometry.location.lng} ;
                    locations.push(newLocation);
                    console.log(locations[i]);
                    
                  }
                });
        }
    res.render("viewmap",{employees:employees,locations:locations} )
    
     
});


//adding new employee detail
app.post("/viewmap", function(req, res){
    // get data from form and add to employees array
    var name = req.body.first_name +" "+req.body.last_name;
    var address = req.body.address;
    var newEmployee = {name: name, address:address, ID:4}
    employees.push(newEmployee);
    console.log(newEmployee.name + " is added to employee list");
    //redirect back to viewmap page
    res.redirect("/viewmap");
});

app.get("/viewmap/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(3000,()=>{ console.log("Server Has Started On Port 3000!")} );