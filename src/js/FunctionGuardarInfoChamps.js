// Funcion vista Champions

document.querySelector('.contenido-pjs').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        const championName = e.target.id.toLowerCase();
        sessionStorage.setItem("championSelected", championName);
        window.location.href = 'vistaChampion'
    } else {
        console.log("Error: No se hizo click en una imagen")
    }
});