let champions = [];

fetch("../src/data/champions.json")
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
    console.log("info " + championInfo.name)
    //let champion = null;

    //// Buscar el campeón con forEach
    //championInfo.forEach(champ => {
    //    if (champ.name.toLowerCase() === nombre.toLowerCase()) {
    //        champion = champ;
    //        console.log("Champseect" + champion)
    //    }
    //});

    //if (champion) {
    //    document.getElementById("champion-info").style.display = "block";
    //    document.getElementById("champion-title").textContent = champion.name;
    //    document.getElementById("champion-role").textContent = "Rol: " + champion.role;
    //    document.getElementById("champion-difficulty").textContent = "Dificultad: " + champion.difficulty;
    //    document.getElementById("champion-img").src = champion.image;
    //} else {
    //    alert("Campeón no encontrado.");
    //}
}