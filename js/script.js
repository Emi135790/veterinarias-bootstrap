// const lista_cursos = [
//   {
//     id: 'vet1',
//     titulo: 'Veterinaria Pattas',
//     texto: 'Luis Donaldo Colosio',
//     imagen: '../img/veterinarias/vete6.jpg',
//     enlace: '',
//     colonia: 'Colosio',
//     servicio: 'Servicio a Domicilio',
//     estado: "abierto",
//   },
//   {
//     id: 'vet2',
//     titulo: 'veterinaria Animalocos',
//     texto: 'Luis Donaldo Colosio',
//     imagen: '../img/veterinarias/vete10.jpg',
//     enlace: '',
//     colonia: 'Colosio',
//     servicio: 'Servicio a Domicilio',
//     estado: "cerrado",
//   },
//   {
//     id: 'vet3',
//     titulo: 'veterinaria Santa Luicia',
//     texto: 'Luis Donaldo Colosio',
//     imagen: '../img/veterinarias/vete3.jpg',
//     enlace: '',
//     colonia: 'Colosio',
//     servicio: '',
//     estado: "abierto",
//   },
//   {
//     id: 'vet4',
//     titulo: 'veterinaria ZooCare',
//     texto: 'El cayaco',
//     imagen: '../img/veterinarias/vete4.jpg',
//     enlace: '',
//     colonia: 'Coloso',
//     servicio: '',
//     estado: "cerrado",
//   },
//   {
//     id: 'vet5',
//     titulo: 'veterinaria Pets',
//     texto: 'Luis Donaldo Colosio',
//     imagen: '../img/veterinarias/vete5.jpg',
//     enlace: '',
//     colonia: 'Colosio',
//     servicio: 'Servicio a Domicilio',
//     estado: "abierto",
//   },
//   {
//     id: 'vet6',
//     titulo: 'veterinaria Pets',
//     texto: 'Luis Donaldo Colosio',
//     imagen: '../img/veterinarias/vete6.jpg',
//     enlace: '',
//     colonia: 'Colosio',
//     servicio: 'Servicio a Domicilio',
//     estado: "abierto",
//   },
//   {
//     id: 'vet7',
//     titulo: 'veterinaria Pets',
//     texto: 'Luis Donaldo Colosio',
//     imagen: '../img/veterinarias/vete7.jpg',
//     enlace: '',
//     colonia: 'Colosio',
//     servicio: 'Servicio a Domicilio',
//     estado: "abierto",
//   },


//   // Resto de los objetos de la lista de cursos ...
// ];

// const tarjetas = document.createElement('div');
// tarjetas.classList.add('cont-cartas');
// tarjetas.classList.add('swiper-wrapper');



// // Variable map y coord1 declaradas en un ámbito más amplio
// var map;
// var coord1, coord2, coord3, coord4, coord5;

// for (curso of lista_cursos) {
//   const tarjeta = document.createElement('div');
//   tarjeta.classList.add('card');
//   tarjeta.setAttribute('id', curso.id);

//   const figure = document.createElement('div');

//   // cuerpo de tarjeta
//   const cuerpo = document.createElement('div');
//   cuerpo.classList.add('card-body');

//   //cuerpo info
//   const imagen = document.createElement('img');
//   imagen.setAttribute('src', curso.imagen);
//   imagen.classList.add('card-img-top');


//   const titulo = document.createElement('h5');
//   titulo.classList.add('card-title');
//   titulo.innerText = curso.titulo;

//   const texto = document.createElement('p');
//   texto.classList.add('card-text');
//   texto.innerText = curso.texto;

//   const boton = document.createElement('a');
//   boton.classList.add('btn', 'btn-primary');
//   boton.setAttribute('href', curso.enlace);
//   boton.innerText = 'Visitar';

//   const colonia = document.createElement('p');
//   colonia.innerText = curso.colonia;

//   figure.appendChild(imagen);
//   tarjeta.appendChild(figure);
//   cuerpo.appendChild(titulo);
//   cuerpo.appendChild(texto);
//   cuerpo.appendChild(boton);
//   tarjeta.appendChild(cuerpo);
//   tarjetas.appendChild(tarjeta);

//   // ... Agregar la tarjeta al contenedor ...
// }

// const contenedor = document.querySelector('.cartas');
// contenedor.appendChild(tarjetas);



var map;
var coord1, coord2, coord3, coord4, coord5;

var tarjeta1 = document.getElementById('vet1');
var tarjeta2 = document.getElementById('vet2');
var tarjeta3 = document.getElementById('vet3');
var tarjeta4 = document.getElementById('vet4');
var tarjeta5 = document.getElementById('vet5');



 tarjeta1.addEventListener('click', function () {
   var lat = coord1.lat;
   var lng = coord1.lng;
   map.panTo({ lat: lat, lng: lng });
 })
 tarjeta2.addEventListener('click', function () {
   var lat = coord2.lat;
   var lng = coord2.lng;
   map.panTo({ lat: lat, lng: lng });
 });
 tarjeta3.addEventListener('click', function () {
   var lat = coord3.lat;
   var lng = coord3.lng;
   map.panTo({ lat: lat, lng: lng });
 });
 tarjeta4.addEventListener('click', function () {
   var lat = coord4.lat;
   var lng = coord4.lng;
   map.panTo({ lat: lat, lng: lng });
 });
tarjeta5.addEventListener('click', function () {
   var lat = coord5.lat;
  var lng = coord5.lng;
  map.panTo({ lat: lat, lng: lng });
});


function iniciarMap() {
  var coord = { lat: 16.7940431, lng: -99.8029122 };

  coord1 = { lat: 16.80093680747825, lng: -99.80409096199409 };
  coord2 = { lat: 16.807644168779564, lng: -99.82223532793019 };
  coord3 = { lat: 16.7997121, lng: -99.8066849 };
  coord4 = { lat: 16.842807133531252, lng: -99.81245062952244 };
  coord5 = { lat: 16.7972851, lng: -99.8098145 };
  var coord6 = { lat: 16.7972967, lng: -99.8091473 };
  var coord7 = { lat: 16.7993173, lng: -99.8041376 };
  var coord8 = { lat: 16.800165, lng: -99.8165951 };
  var coord9 = { lat: 16.7997702, lng: -99.8169348 };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: coord,
    styles: [
       {
         featureType: 'poi.business',
       stylers: [{ visibility: 'off' }] // Oculta los negocios locales
      },
      {
        elementType: 'geometry',
        stylers: [{ color: '#1d1c1d' }] // Cambia el color de fondo del mapa
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#141414' }] // Cambia el color del contorno de las etiquetas
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }] // Cambia el color del texto de las etiquetas
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#131e34' }] // Cambia el color del agua
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#141414' }] // Cambia el color del paisaje
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#3a3e40' }] // Cambia el color de las carreteras
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#dddddd' }] // Cambia el color de los puntos de interés
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ color: '#a7a7a7' }] // Cambia el color de los elementos administrativos
      },

    ],
    // gestureHandling: 'greedy',

  });

  var iconoPersonalizado = {
    url: './img/iconlocation.png',
    scaledSize: new google.maps.Size(30, 50), // Tamaño del ícono
  };
  var iconoPersonalizado2 = {
    url: './img/iconlocation.png',
    scaledSize: new google.maps.Size(50, 50), // Tamaño del ícono
  };

  var marker1 = new google.maps.Marker({
    position: coord1,
    map: map,
    icon: iconoPersonalizado,
  });

  var marker2 = new google.maps.Marker({
    position: coord2,
    map: map,
    icon: iconoPersonalizado,
  });
  var marker3 = new google.maps.Marker({
    position: coord3,
    map: map,
    icon: iconoPersonalizado,
  });
  var marker4 = new google.maps.Marker({
    position: coord4,
    map: map,
    icon: iconoPersonalizado,
  });
  var marker5 = new google.maps.Marker({
    position: coord5,
    map: map,
    icon: iconoPersonalizado,
  });

  // Resto de los marcadores ...
}


 const cartas = document.querySelectorAll('.card')
 const callback = (entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       var lat = coord4.lat;
       var lng = coord4.lng;
     }
   })
 }
 const options = {
   threshold: 0.75
 }
 const observer = new IntersectionObserver(callback, options)
 cartas.forEach(element => observer.observe(element));





