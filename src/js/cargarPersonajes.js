let champions = [];

fetch("../js/champions.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        champions = data;
        cargarPersonajes(champions);
    })

const contenedorPersonajes = document.querySelector("#contenido-pjs");

function cargarPersonajes(personajes) {

    contenedorPersonajes.innerHTML = "";

    personajes.forEach(personajesCargados => {       

        const div = document.createElement("div");
        div.classList.add("miembroSubido");
        div.innerHTML = `
            <img class="imagen-miembro" src="${personajesCargados.champions.image_url}" alt="${personajesCargados.champions.name}">
            <div class="detalles-miembros">
                <h3 class="nombre-miembro">${personajesCargados.champions.name}</h3>
            </div>
        `;

        contenedorPersonajes.append(div);
    })
}