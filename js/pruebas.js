
function initMap(){
    const cordsmex = {lat:19.432241, lng:-99.177254};
    const map = new google.maps.Map(mapDiv,{
        center:cordsmex,
        zoom:6
    })
    const marker = new google.maps.Marker({
        position:cordsmex,
        map,
    })
    button.addEventListener("click",()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({coords:{latitude,longitude}}) => {
                const coords = {
                    lat: latitude,
                    lng: longitude,
                };
                map.setCenter(coords)
                map.setZoom(8)
                marker.setPosition(coords)
            }, 
            () => {
                alert('error')
            }
            );
        } else {
            alert(
                'no '
            );
        }
    });
}