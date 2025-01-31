let barraBusq = document.getElementById("buscador");

barraBusq.addEventListener('keyup', function(e){
    if ( e.key == 'Enter' ) {
        verificador();
    }
})

function verificador() {
    window.location.href = 'search'
}

function vistaChampion(value) {
    let idChampion = value.target.id;
    console.log("Se hizo click en el champion", idChampion);
};