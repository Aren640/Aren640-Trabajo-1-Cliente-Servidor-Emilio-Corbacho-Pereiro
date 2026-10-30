let formulario = document.getElementById("formulario-nombre");
let campoNombre = document.getElementById("nombre");

formulario.onsubmit = function () {
    let nick = campoNombre.value;
    let caracteres = 0;

    for (let i = 0; i < nick.length; i++) {
        if (nick[i] != " ") {
            caracteres = caracteres + 1;
        }
    }

    if (caracteres == 0) {
        alert("Escribe tu nickname correctamente");
        return false;
    }
};
