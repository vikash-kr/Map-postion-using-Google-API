
console.log("Initiating map API");

function initMap(){
    var options = {
        zoom : 11,
        center : {lat: 19.0484114, lng: 72.853414}
    };
    // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), options);

    addMarker({lat: 19.0484114, lng: 72.853414},"1");
    addMarker({lat: 19.0584114, lng: 72.873414},"2");
    //for adding marker
    function addMarker(coordinates, employeeID){
         var marker = new google.maps.Marker({
        position: coordinates
        , map: map
        , title : "Employee" + employeeID
        });
    }
}


