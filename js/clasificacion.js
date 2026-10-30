let lista = document.getElementById("lista-clasificacion");

fetch("clasificacion.php").then(function (respuesta) {
    if (!respuesta.ok) {
        throw new Error("No se ha podido consultar la clasificacion");
    }

    return respuesta.text();
}).then(function (filas) {
    if (filas == "") {
        lista.innerHTML = '<tr><td colspan="3">Todavia no hay partidas</td></tr>';
    } else {
        lista.innerHTML = filas;
    }
}).catch(function () {
    lista.innerHTML = '<tr><td colspan="3">No se ha podido cargar la clasificacion</td></tr>';
});
