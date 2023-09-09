// variables
const resultado = document.querySelector("#cartas");
let input = document.getElementById("search-input");
const bontonubicacio = document.querySelector("#actualizar-perimetro-btn");
var map;
const marcadoresArray = [];
const marcadores = {};

const modal = new bootstrap.Modal('#modal', {});
input.addEventListener("click", () => {
  input.value = "";
});

function addMarker(map, veterinarias) {

  let iconoPersonalizado = {
    url: "./img/ubicacion1.png",
    scaledSize: new google.maps.Size(40, 50), // Tamaño del ícono
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
function cargarVeterinarias() {
  const result = fetch("./js/db.json")
    .then((response) => response.json())
    .then((data) => data.veterinarias);
  return result;
}

function mostrarveterinarias(veterinarias = []) {
  limpiarHtml();
  let marker;
  const tarjetas = document.createElement("div");
  tarjetas.classList.add("cont-cartas");
  veterinarias.forEach((vet) => {
    const { titulo, texto, imagen, enlace, id } = vet;

    const tarjeta = document.createElement("DIV");
    tarjeta.classList.add("card");
    tarjeta.setAttribute("id", id);

    // cuerpo de tarjeta
    const cuerpo = document.createElement("div");
    cuerpo.classList.add("card-body");

    const figure = document.createElement("div");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = imagen;

    const tituloHTML = document.createElement("p");
    tituloHTML.textContent = titulo;

    const colonia = document.createElement("p");
    colonia.textContent = texto;

    const boton = document.createElement("a");
    boton.classList.add("btn", "btn-primary", "cancel");
    boton.id = id;
    boton.setAttribute("href", enlace);
    boton.textContent = "Visitar";

    boton.addEventListener("click", function(e) {
      e.preventDefault();
      abrirModal(id);
    });
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
  let iconoResaltado = {
    url: "./img/ubicacion2.png",
    scaledSize: new google.maps.Size(50, 60), // Tamaño del ícono resaltado
  };
  let iconoPersonalizado = {
    url: "./img/ubicacion1.png",
    scaledSize: new google.maps.Size(40, 50), // Tamaño del ícono
  };
  

  document.querySelectorAll(".card").forEach((tarjeta, index) => {
    tarjeta.addEventListener("click", () => {
      // Mueve el mapa a la ubicación de la veterinaria
      map.panTo(veterinarias[index].coord);

      // Restaura el ícono de todos los marcadores a su estado original
      marcadoresArray.forEach((marcador) => {
        marcador.marker.setIcon(iconoPersonalizado);
      });

      // Cambia el ícono del marcador correspondiente
      const idVeterinaria = veterinarias[index].id;
      marcadoresArray.forEach((marcador) => {
        if (marcador.id === idVeterinaria) {
          marcador.marker.setIcon(iconoResaltado);
          marcadorSeleccionado = marcador;
        }
      });
    });
  });
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
function noresultado(mensaje, tipo) {
  limpiarHtml();
  const noresultado = document.createElement("DIV");
  noresultado.classList.add("alert", "alert-danger", "text-center", "m-3");
  noresultado.textContent = mensaje;
  if (tipo === "inicio") {
    noresultado.classList.add("alert", "alert-info", "text-center", "m-3");
    noresultado.classList.remove("alert-danger");
  } else if (tipo === "error") {
    noresultado.classList.add("alert", "alert-warning", "text-center", "m-3");
    noresultado.classList.remove("alert-danger");
  }
  resultado.appendChild(noresultado);
}
function iniciarMap() {
  noresultado("Agrega tu ubicacion...", "inicio");
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
    types: ["(cities)"],
    componentRestrictions: { country: ["mx"] },
  };
  let autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", () => {
    llamarporubicacion();
    let place = autocomplete.getPlace();
    map.setCenter(place.geometry.location);
    map.setZoom(13);
    google.maps.event.addListener(
      map,
      "bounds_changed",
      obtenerCoordenadasIniciales
    );
  });
  button.addEventListener("click", () => {
    llamarMapa();
    google.maps.event.addListener(
      map,
      "bounds_changed",
      obtenerCoordenadasIniciales
    );
  });
  llamarporubicacion()

}

function llamarMapa() {
  if (navigator.geolocation) {
    noresultado("Buscando resultados...", "error");

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const coords = {
          lat: latitude,
          lng: longitude,
        };
        map.setCenter(coords);
        map.setZoom(13);
      },
      () => {
        alert("error");
      }
    );
    llamarporubicacion();
  } else {
    alert("no ");
  }
}
function llamarporubicacion() {
  cargarVeterinarias().then((veterinarias) => {
    addMarker(map, veterinarias);
    mostrarveterinarias(veterinarias);
    listenerCards(veterinarias);
  });
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
      var marker = markersDentro[i];
    }
  }
}
const conntCartas = document.querySelector("#cartas");
const ocultarCartas = document.querySelector("#ocultar");
const maps = document.querySelector("#map");

ocultarCartas.addEventListener("click", mostrarocultarcards);

function mostrarocultarcards() {
  if (conntCartas.classList.contains("ocultar")) {
    conntCartas.classList.remove("ocultar");
    maps.classList.add("map");
    maps.classList.remove("map-class");
    this.textContent = "Ocultar Veterinarias";
  } else {
    conntCartas.classList.add("ocultar");
    this.textContent = "Mostrar Veterinarias";
    maps.classList.add("map-class");
  }
}

function abrirModal(id) {
  const url = `./js/db.json`;
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      // Aquí puedes acceder a los datos del archivo JSON
      const veterinaria = data.veterinarias.find((vet) => vet.id === id);
      MostrarVeterinariasModal(veterinaria);
    })

}
function MostrarVeterinariasModal(veterinaria){
  const {id, imagen, servicio,titulo, texto,horario,imgVet,nomabreVeterinario,experiencia,descripcion,telefon0} = veterinaria
  
  const Modaltitulo = document.querySelector(".modal .modal-title");
  const ModalBody = document.querySelector(".modal .modal-body");
  const ModalInfovet = document.querySelector(".modal .modal-info-vet");
  const ModalInfo = document.querySelector(".modal .modal-info");



  Modaltitulo.textContent = titulo
  ModalBody.innerHTML = `
    <img class="img-fluid w-100 h-25" src="${imagen}" />
    <h2>Ubicacion: ${texto}</h2>
    <p>Horario:${horario}</p>
    
  `;
  ModalInfovet.innerHTML = `
  <img class="img-fluid" src="${imgVet}" />
  <p>${nomabreVeterinario}</p>
  <p>Experincia: ${experiencia}</p>
  <p>Telefono:${telefon0}</p>
  
`;
ModalInfo.innerHTML = `
<p>${descripcion}</p>
<h2>Servicios</h2>
`;
const listGroup = document.createElement('UL');
listGroup.classList.add('list-group');
for(let i = 1; i <= 20; i++){
  if(veterinaria[`servicio${i}`]){
    const servicios = veterinaria[`servicio${i}`]

    const serviciosLi = document.createElement("LI");
    serviciosLi.classList.add('list-group-item');
    serviciosLi.textContent = `${servicios}`

    listGroup.appendChild(serviciosLi)
    
  }
}

ModalInfo.appendChild(listGroup)
  modal.show()
}

