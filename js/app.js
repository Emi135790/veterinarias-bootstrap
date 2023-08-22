// variables
const estado = document.querySelector("#estado");
const servicio = document.querySelector("#servicio");
const texto = document.querySelector("#texto");
const resultado = document.querySelector("#cartas");
let input = document.getElementById('search-input')
const bontonubicacio = document.querySelector('#actualizar-perimetro-btn')

//event listener
estado.addEventListener("change", (e) => {
  datosBusqueda.estado = e.target.value;
  filtarvet();
});
servicio.addEventListener("change", (e) => {
  datosBusqueda.servicio = e.target.value;
  filtarvet();
});
texto.addEventListener("change", (e) => {
  datosBusqueda.texto = e.target.value;
  filtarvet();
});


const marcadoresArray = [];
function addMarker(veterinarias, map) {
  let iconoPersonalizado = {
    url: "./img/iconlocation.png",
    scaledSize: new google.maps.Size(30, 40), // Tamaño del ícono
  };
  veterinarias.forEach((veterinaria) => {
    const id = veterinaria.id;

    let marker = new google.maps.Marker({
      position: veterinaria.coord,
      map: map,
      icon: iconoPersonalizado,
      optimized: true,
    });
    marcadoresArray.push({ id: id, marker: marker });
  });
}
const marcadores = {};
//gnerar un objero con la bsqueda
const datosBusqueda = {
  texto: "",
  estado: "",
  servicio: "",
  input: "",
};
var map;
// var coord1, coord2, coord3, coord4, coord5;
// funciones
function mostrarveterinarias(veterinarias) {

  limpiarHtml(); //elimina el html previo
  let marker;
  const tarjetas = document.createElement("div");
  tarjetas.classList.add("cont-cartas");
  
  veterinarias.forEach((vet) => {
    const { titulo, texto, imagen, enlace, servicio, estado, id } = vet;

    const tarjeta = document.createElement("DIV");
    tarjeta.classList.add("card");
    tarjeta.setAttribute("id", id);

    // cuerpo de tarjeta
    const cuerpo = document.createElement("div");
    cuerpo.classList.add("card-body");

    const figure = document.createElement("div");

    const img = document.createElement("img");
    img.setAttribute("src", imagen);
    img.classList.add("card-img-top");

    const tituloHTML = document.createElement("p");
    tituloHTML.textContent = `
        ${titulo}
        `;

    const colonia = document.createElement("p");
    colonia.textContent = `
            ${texto}
        `;

    const serv = document.createElement("p");
    serv.classList.add("text-success");
    serv.textContent = `
            ${servicio}
        `;

    const esta = document.createElement("p");
    esta.textContent = `
            ${estado}
        `;

    const boton = document.createElement("a");
    boton.classList.add("btn", "btn-primary");
    boton.setAttribute("id", id);
    boton.setAttribute("href", enlace);
    boton.innerText = "Visitar";

    //insertar en el html
    figure.appendChild(img);
    tarjeta.appendChild(figure);
    cuerpo.appendChild(tituloHTML);

    cuerpo.appendChild(colonia);
    cuerpo.append(boton);

    tarjeta.appendChild(cuerpo);
    tarjetas.appendChild(tarjeta);

    resultado.appendChild(tarjetas);

    marcadores[id] = marker;

  });

}
function listenerCards(veterinarias) {
  document.querySelectorAll(".card").forEach((tarjeta, index) => {
    tarjeta.addEventListener("click", () => {
      map.panTo(veterinarias[index].coord);
    });
  });
}


function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
let resultadoFiltrado = [];
function filtarvet() {
  const resultadoFiltrado = veterinarias
    .filter(filtrarestado)
    .filter(filtrarservicio)
    .filter(filtrarcolonia)
    .filter(filtrarInput)
  if (resultadoFiltrado.length) {
    mostrarveterinarias(resultadoFiltrado);
    ocultarMarcadoresNoVisibles(resultadoFiltrado);
    listenerCards(resultadoFiltrado);
  } else {
    noresultado('No hay resultados');
  }
}


function noresultado(mensaje, tipo) {
  limpiarHtml();
  const noresultado = document.createElement("DIV");
  noresultado.classList.add("alert", "alert-danger", "text-center", 'm-3');
  noresultado.textContent = mensaje;
  if (tipo === 'inicio') {
    noresultado.classList.add("alert", "alert-info", "text-center", 'm-3');
    noresultado.classList.remove('alert-danger')
  } else if (tipo === 'error') {
    noresultado.classList.add("alert", "alert-warning", "text-center", 'm-3');
    noresultado.classList.remove('alert-danger')
  }
  resultado.appendChild(noresultado);
}

function filtrarestado(vet) {
  const { estado } = datosBusqueda;
  if (estado) {
    return vet.estado === estado;
  }
  return vet;
}
function filtrarservicio(vet) {
  const { servicio } = datosBusqueda;
  if (servicio) {
    return vet.servicio === servicio;
  }
  return vet;
}
function filtrarcolonia(vet) {
  const { texto } = datosBusqueda;
  if (texto) {
    return vet.texto === texto;
  }
  return vet;
}
function filtrarInput(vet) {
  const { input } = datosBusqueda;
  if (input) {
    return vet.texto.toLowerCase().includes(input.toLowerCase());
  }
  return vet;
}


function iniciarMap() {
  noresultado('Agrega tu ubicacion...', 'inicio')
  var coord = { lat: 16.7940431, lng: -99.8029122 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: coord,
    styles: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }], // Oculta los negocios locales
      },
    ],
  });
  let options = {
    types: ['(cities)'],
    componentRestrictions: { country: ['mx'] }
  }
  let autocomplete = new google.maps.places.Autocomplete(input, options)
  autocomplete.bindTo('bounds', map)
  autocomplete.addListener('place_changed', () => {
    llamarporubicacion();
    let place = autocomplete.getPlace()
    map.setCenter(place.geometry.location);
    map.setZoom(13);
    google.maps.event.addListener(map, 'bounds_changed', obtenerCoordenadasIniciales);
  })

  button.addEventListener("click", () => {
    llamarMapa()
    google.maps.event.addListener(map, 'bounds_changed', obtenerCoordenadasIniciales);
  });
}





function llamarMapa() {
  if (navigator.geolocation) {
    noresultado('Buscando resultados...', 'error')

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const coords = {
          lat: latitude,
          lng: longitude,
        };
        map.setCenter(coords)
        map.setZoom(13)
      },
      () => {
        alert('error')
      });
    llamarporubicacion();

  } else {
    alert(
      'no '
    );
  }
}
function llamarporubicacion() {
  setTimeout(() => {
    addMarker(veterinarias, map);
    mostrarveterinarias(veterinarias);
    listenerCards(veterinarias);
  }, 2000);
}

function ocultarMarcadoresNoVisibles(veterinariasFiltradas) {
  // Ocultar todos los marcadores
  marcadoresArray.forEach((item) => {
    item.marker.setMap(null);
  });

  // Mostrar los marcadores de las veterinarias filtradas
  veterinariasFiltradas.forEach((vet) => {
    const id = vet.id;
    const marcador = marcadoresArray.find((item) => item.id === id);
    if (marcador) {
      marcador.marker.setMap(map);
    }
  });
}

function obtenerCoordenadasIniciales() {
  var bounds = map.getBounds();
  var NE = bounds.getNorthEast();
  var SW = bounds.getSouthWest();
  var NW = new google.maps.LatLng(NE.lat(), SW.lng());
  var SE = new google.maps.LatLng(SW.lat(), NE.lng());

  // var strHTML = "North East: " + NE.lat() + ", " + NE.lng() + "</br>";
  // strHTML += "South West: " + SW.lat() + ", " + SW.lng() + "</br>";
  // strHTML += "North West: " + NW.lat() + ", " + NW.lng() + "</br>";
  // strHTML += "South East: " + SE.lat() + ", " + SE.lng() + "</br>";

  // Ocultar todas las tarjetas
  const tarjetas = document.querySelectorAll(".card");
  tarjetas.forEach((tarjeta) => {
    tarjeta.style.display = "none";
  });

  // Verificar si hay marcadores dentro de las coordenadas
  var markersDentro = [];
  for (var i = 0; i < marcadoresArray.length; i++) {
    var marker = marcadoresArray[i].marker;
    var markerPosition = marker.getPosition();
    if (bounds.contains(markerPosition)) {
      markersDentro.push(marker);
      const tarjeta = document.getElementById(marcadoresArray[i].id);
      tarjeta.style.display = "block";

    }
  }

  // Imprimir información de los marcadores encontrados
  if (markersDentro.length > 0) {
      for (var i = 0; i < markersDentro.length; i++) {
      var marker = markersDentro[i];}
  }
}
const conntCartas = document.querySelector("#cartas")
const ocultarCartas = document.querySelector('#ocultar')
const maps = document.querySelector('#map')

ocultarCartas.addEventListener('click', mostrarocultarcards)


 function mostrarocultarcards(){
  if (conntCartas.classList.contains('ocultar')) {
    conntCartas.classList.remove('ocultar');
    maps.classList.add('map');
    maps.classList.remove('map-class');
    this.textContent = 'Ocultar Veterinarias';
  } else {
    conntCartas.classList.add('ocultar');
    this.textContent = 'Mostrar Veterinarias';
    maps.classList.add('map-class');
  }

 }
