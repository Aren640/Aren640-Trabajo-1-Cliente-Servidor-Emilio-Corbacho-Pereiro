/*Poner el nombre del jugador*/
let datos = new URLSearchParams(window.location.search);
let nombre = datos.get("nombre");
let textoJugador = document.getElementById("jugador");



textoJugador.textContent = nombre;

/*Contador*/
let tiempo = 60;
let textoTiempo = document.getElementById("tiempo");

textoTiempo.textContent = tiempo;

function restarSegundo() {
    tiempo = tiempo - 1;
    textoTiempo.textContent = tiempo;

    if (tiempo == 0) {
        clearInterval(reloj);
        enviarPartida("derrota");
    }
}

let reloj = null;

/*Mezclado imagenesa*/
let imagenes = [
    "img/Tiranido1.png",
    "img/Tiranido2.png",
    "img/Tiranido3.png",
    "img/Tiranido4.png",
    "img/Tiranido5.png",
    "img/Tiranido6.png",
    "img/Tiranido7.png",
    "img/Tiranido8.png",
    "img/Tiranido9.png",
    "img/Tiranido10.png",
    "img/Tiranido11.png",
    "img/Tiranido12.png",
    "img/Tiranido13.png",
    "img/Tiranido14.png",
    "img/Tiranido15.png",
    "img/Tiranido1.png",
    "img/Tiranido2.png",
    "img/Tiranido3.png",
    "img/Tiranido4.png",
    "img/Tiranido5.png",
    "img/Tiranido6.png",
    "img/Tiranido7.png",
    "img/Tiranido8.png",
    "img/Tiranido9.png",
    "img/Tiranido10.png",
    "img/Tiranido11.png",
    "img/Tiranido12.png",
    "img/Tiranido13.png",
    "img/Tiranido14.png",
    "img/Tiranido15.png"
];

/*Hago que la mezcla se haga en el arrat*/
for (let i = imagenes.length - 1; i > 0; i--) {
    let posicion = Math.floor(Math.random() * (i + 1));
    let temporal = imagenes[i];
    imagenes[i] = imagenes[posicion];
    imagenes[posicion] = temporal;
}

let cartas = document.getElementsByClassName("carta");

for (let i = 0; i < cartas.length; i++) {
    cartas[i].dataset.imagen = imagenes[i];
}

/*comprobar al click*/
let primeraCarta = null;
let segundaCarta = null;
let puntos = 0;
let parejas = 0;
let textoPuntos = document.getElementById("puntuacion");

for (let i = 0; i < cartas.length; i++) {
    cartas[i].onclick = function () {
            /*añado la funcion al click de la carta*/
        if (cartas[i].disabled || segundaCarta != null || tiempo == 0) {
            return;
        }

        cartas[i].style.backgroundImage = 'url("' + cartas[i].dataset.imagen + '")';
        cartas[i].disabled = true;

        if (reloj == null) {
            reloj = setInterval(restarSegundo, 1000);
        }

        if (primeraCarta == null) {
            primeraCarta = cartas[i];
        } else {
            segundaCarta = cartas[i];

            if (primeraCarta.dataset.imagen == segundaCarta.dataset.imagen) {
                puntos = puntos + 50;
                parejas = parejas + 1;
                primeraCarta = null;
                segundaCarta = null;

                if (parejas == 15) {
                    clearInterval(reloj);
                    enviarPartida("victoria");
                }
            } else {
                puntos = puntos - 10
                if (puntos < 0) {
                    puntos = 0;
                }

                setTimeout(function () {
                    primeraCarta.style.backgroundImage = "";
                    segundaCarta.style.backgroundImage = "";
                    primeraCarta.disabled = false;
                    segundaCarta.disabled = false;
                    primeraCarta = null;
                    segundaCarta = null;
                }, 1000);
            }

            textoPuntos.textContent = puntos;
        }
    };
}

function enviarPartida(resultado) {
    let partida = new FormData();
    partida.append("nombre", nombre);
    partida.append("tiempo", 60 - tiempo);
    partida.append("puntos", puntos);
    partida.append("resultado", resultado);

    fetch("guardar.php", {
        method: "POST",
        body: partida
    }).then(function (respuesta) {
        if (!respuesta.ok) {
            alert("El servidor no ha podido guardar la partida");
        }

        window.location.href = resultado + ".html";
    }).catch(function () {
        alert("No se ha podido contactar con el servidor");
        window.location.href = resultado + ".html";
    });
}
