let barraBusq = document.getElementById("buscador");

barraBusq.addEventListener('keyup', function(e){
    if ( e.key == 'Enter' ) {
        verificador();
    }
})

function verificador() {
    window.location.href = 'search'
}