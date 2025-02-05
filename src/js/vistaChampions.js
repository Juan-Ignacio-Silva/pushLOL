let champions = [];

fetch("../data/champions.json")
    .then(respuesta => {
        console.log("Respuesta del fetch:", respuesta);
        return respuesta.json(); // Convertir a JSON
    })
    .then(data => {
        console.log("Datos del JSON:", data); // Verificar los datos obtenidos
        champions = data;
        buscarChampionDesdeSessionStorage(champions);
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

    function buscarChampionDesdeSessionStorage(championsData) {
    // Aca declaro nombre = al nombre del champion seleccionado.
    let nombre = sessionStorage.getItem("championSelected");
    // Aca obtengo la etiqueta span del html y le coloco el valor del champion seleccionado.
    const nombreChampion = document.querySelector(".champion-name")
    if (nombreChampion) {
        nombreChampion.innerHTML = nombre.toUpperCase();
    }

    let championInfo = championsData;
    let champion = null;

    //// Buscar el campeón con forEach
    championInfo.forEach(champ => {
        if (champ.name.toLowerCase() === nombre.toLowerCase()) {
            champion = champ;
            console.log("ChampSeleccinado: " + champion.image_url)
        }
    });
    const championAvatar = document.querySelector(".champion-avatar")
    if (champion) {
        championAvatar.innerHTML = `
            <img 
            src="${champion.image_url}" 
            alt="${champion.name}"
            style="width: 100px; border-radius: 8px;"
            >
        `;
    }
    }