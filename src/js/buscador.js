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

// Mantener la funcionalidad original del Enter
barraBusq.addEventListener('keyup', function(e){
    if (e.key == 'Enter') {
        verificador();
    }
});

function verificador() {
    window.location.href = 'search';
}