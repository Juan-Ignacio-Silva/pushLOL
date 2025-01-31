let barraBusq = document.getElementById("buscador");
let cardsChampions = document.querySelectorAll('.card-chmpion');

barraBusq.addEventListener('input', function(e) {
    const busqueda = e.target.value.toLowerCase();
    
    cardsChampions.forEach(card => {
        const championName = card.querySelector('img').id.toLowerCase();
        
        if (championName.includes(busqueda)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

document.querySelector('.contenido-pjs').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        const championName = e.target.id.toLowerCase();
        sessionStorage.setItem("championSelected", championName);
        window.location.href = 'search'
    } else {
        alert("Intente de nuevo")
    }
});

window.onload = function() {
    const champion = sessionStorage.getItem("championSelected");

    if (champion === "lux") {
        console.log("¡Redirección exitosa! Estás en la página correcta.");
        sessionStorage.removeItem("championSelected");
    } else {
        console.log("PJ NO")
    }
};
