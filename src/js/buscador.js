let barraBusq = document.getElementById("buscador");
let cardsChampions = document.querySelectorAll('.card-chmpion');
let activeFilter = null;

// Función para actualizar la visualización de campeones
function updateChampionsDisplay() {
    const searchText = barraBusq.value.toLowerCase();
    
    cardsChampions.forEach(card => {
        const championName = card.querySelector('img').id.toLowerCase();
        const championPositions = JSON.parse(card.dataset.positions);
        
        // Verificar si el campeón coincide con la búsqueda de texto
        const matchesSearch = championName.includes(searchText);
        
        // Verificar si el campeón coincide con el filtro activo
        const matchesFilter = !activeFilter || 
            activeFilter === 'all' ||
            championPositions.includes(activeFilter);

        // Mostrar el campeón solo si coincide con ambos criterios
        card.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';
    });
}

// Event listener para el buscador
barraBusq.addEventListener('input', updateChampionsDisplay);

// Event listener para los botones de filtro
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const position = btn.dataset.position;
        const wasActive = btn.classList.contains('active');
        
        // Remover clase active de todos los botones
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Si el botón clickeado no estaba activo, activarlo
        if (!wasActive) {
            btn.classList.add('active');
            activeFilter = position;
        } else {
            // Si estaba activo, desactivarlo (equivalente a mostrar todos)
            activeFilter = null;
        }
        
        updateChampionsDisplay();
    });
});

document.querySelector('.contenido-pjs').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        const championName = e.target.id.toLowerCase();
        sessionStorage.setItem("championSelected", championName);
        window.location.href = 'vistaChampion'
    } else {
        alert("Intente de nuevo")
    }
});