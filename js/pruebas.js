window.onload = function(){
    let input = document.getElementById('search-input')
    let map = new google.maps.Map(document.getElementById('map'),{
        zoom:4,
        center: { lat: 19.432241, lng: -99.177254 },
        scrollwheel: true,
    });
    let options ={
    types:['(cities)'],
    componentRestrictions:{country:['mx']}
    }
    let autocomplete = new google.maps.places.Autocomplete(input,options)
    autocomplete.bindTo('bounds',map)

    btn.addEventListener('click',()=>{
        
        let place = autocomplete.getPlace()
        if(place.geometry.viewport){
            map.fitBounds(place.geometry.viewport);
            
        }else{
            map.setCenter(place.geometry.location);
            map.setZoom(9);
        }
    })
}