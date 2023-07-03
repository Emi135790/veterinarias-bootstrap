
//**index pedir ubicacion */
const botonIndex = document.querySelector('#button-index');
const cont1 = document.querySelector('#cont1');
const btncambio = document.querySelector('#btncambio')
const btncambio2 = document.querySelector('#btncambio2')


btncambio.addEventListener('click', cambiar)
btncambio2.addEventListener('click', cambiar2)


function cambiar(e) {
  e.preventDefault()

  botonIndex.classList.remove('d-block')
  botonIndex.classList.add('d-none')


  cont1.classList.add('d-block')
  cont1.classList.remove('d-none')

  btncambio2.classList.remove('d-none')
  btncambio2.classList.add('d-block')

  btncambio.classList.remove('d-block')
  btncambio.classList.add('d-none')

}

function cambiar2(e) {
  e.preventDefault()
  botonIndex.classList.add('d-block')
  botonIndex.classList.remove('d-none')


  cont1.classList.remove('d-block')
  cont1.classList.add('d-none')

  btncambio2.classList.remove('d-block')
  btncambio2.classList.add('d-none')

  btncambio.classList.add('d-block')
  btncambio.classList.remove('d-none')
}


function iniciarMap() {
  let input = document.getElementById('search-input')
  let autocomplete = new google.maps.places.Autocomplete(input, options)
  autocomplete.bindTo('bounds', map)

  // const btn = document.querySelector('#btn')
  const buscar = document.querySelector('#buscador')
  buscar.addListener('click', () => {
    
    let place = autocomplete.getPlace()
    map.setCenter(place.geometry.location);
    map.setZoom(13);
    llamarporubicacion();
    // if (place.geometry.viewport) {map.fitBounds(place.geometry.viewport);} else {}

    ///esto markers
    // let request ={
    //   location:place.geometry.location,
    //   radius:'500',
    //   type:'veterinary_care'
    // }
    service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request,callback)
    
  })
}