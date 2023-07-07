// variables
const estado = document.querySelector("#estado");
const servicio = document.querySelector("#servicio");
const texto = document.querySelector("#texto");
const reesultado = document.querySelector("#cartas");
const prueba = document.querySelectorAll('.form-check-input')
let input = document.getElementById('search-input')
const aplicar = document.querySelector('#aplicar')

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
aplicar.addEventListener("click", function () {
  prueba.forEach((e)=>{
    if(e.checked == true){
      console.log(e.value)
    }
  })

 
})

//gnerar un objero con la bsqueda
const datosBusqueda = {
  texto: "",
  estado: "",
  servicio: "",
  input: "",
  prueba:'',
};
var map;
var coord1, coord2, coord3, coord4, coord5;
// funciones
function mostrarveterinarias(veterinarias) {
  limpiarHtml(); //elimina el html previo
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

    reesultado.appendChild(tarjetas);

  });
}

function limpiarHtml() {
  while (reesultado.firstChild) {
    reesultado.removeChild(reesultado.firstChild);
  }
}
function filtarvet() {
  const resultado = veterinarias
  
    .filter(filtrarestado)
    .filter(filtrarservicio)
    .filter(filtrarcolonia)
    .filter(filtrarInput)

  if (resultado.length) {
    mostrarveterinarias(resultado);
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
  reesultado.appendChild(noresultado);
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
function filtrocheck(vet){
  const { prueba } = datosBusqueda;

  if (prueba) {
    return vet.prueba === prueba;
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

const listenerCards = (veterinarias) => {
  document.querySelectorAll(".card").forEach((tarjeta, index) => {
    tarjeta.addEventListener("click", () => {
      map.panTo(veterinarias[index].coord)
    })
    // tarjeta.addEventListener("click", () => map.panTo(veterinarias[index].coord));

  });
};

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
    componentRestrictions: { country: ['mx']}
  }
  let autocomplete = new google.maps.places.Autocomplete(input, options)
  autocomplete.bindTo('bounds', map)

  // const btn = document.querySelector('#btn')

  autocomplete.addListener('place_changed', () => {
    llamarporubicacion();
    let place = autocomplete.getPlace()
    map.setCenter(place.geometry.location);
    map.setZoom(13);
  })
  button.addEventListener("click", () => {
    llamarMapa()
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
const addMarker = (veterinarias, map) => {
  let iconoPersonalizado = {
    url: "./img/iconlocation.png",
    scaledSize: new google.maps.Size(30, 40), // Tamaño del ícono
  };
  veterinarias.forEach((veterinaria) => {
    let marker = new google.maps.Marker({
      position: veterinaria.coord,
      map: map,
      icon: iconoPersonalizado,
      optimized: true,
      
    });
    google.maps.event.addListener(marker, 'click', function () {
      alert(veterinaria.titulo)
    })


  });
};