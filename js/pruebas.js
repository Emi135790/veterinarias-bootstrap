
function init(){
// let input = document.getElementById('search-input')
let map = new google.maps.Map(document.getElementById('map'),{
    zoom:4,
    center: { lat: 19.432241, lng: -99.177254 },
    scrollwheel: true,
});

}

google.maps.event.addListener(map, 'bounds_changed',function(){
    var bounds = map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();

    var strHTML = "North East: " + NE.lat() + ", " + NE.lng() + "</br>";
    strHTML += "south est " + SW.lat() + ", " + SW.lng() + "</br>";
    document.getElementById("info").innerHTML = strHTML;
})


var bounds = new google.maps.LatLngBounds ();
for (var i=0;i<locations.length;i++ ){
    var marker = new google.maps.Marker({position:locations[i].latlng, map:map,title:locations[i].name})
    bounds.extend(locations[i].latlng)
}
map.fitBounds (bounds)