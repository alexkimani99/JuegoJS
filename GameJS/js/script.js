let personaje = document.getElementById('personaje');
let personajeBottom = parseInt(window.getComputedStyle(personaje).getPropertyValue('bottom'));
let personajeRight = parseInt(window.getComputedStyle(personaje).getPropertyValue('right'));
let personajeWidth = parseInt(window.getComputedStyle(personaje).getPropertyValue('width'));
let suelo = document.getElementById('suelo');
let sueloBottom = parseInt(window.getComputedStyle(suelo).getPropertyValue('bottom'));
let sueloHeight = parseInt(window.getComputedStyle(suelo).getPropertyValue('height'));
let saltando = false;
let tiempoAereo;
let caida;
let mostrarPuntuacion = document.getElementById('puntos');
let puntos = 0;

function saltar(){
    if(saltando) return;
    tiempoAereo = setInterval(() => {
        if(personajeBottom >= sueloHeight + 250){
            clearInterval(tiempoAereo);
            caida = setInterval(() => {
                if(personajeBottom <= sueloHeight + 10){
                    clearInterval(caida);
                    saltando = false;
                }
                personajeBottom -= 10;
                personaje.style.bottom = personajeBottom + 'px';
            }, 20)
        }
        personajeBottom += 10;
        personaje.style.bottom = personajeBottom + 'px';
        saltando = true;
    }, 20);
}

function mostrarPuntos(){
    puntos++;
    mostrarPuntuacion.innerText = puntos;
}

setInterval(mostrarPuntos, 60);

function generarObstaculos(){
    let obstaculos = document.querySelector('.obstaculos');
    let obstaculo = document.createElement('div');
    obstaculo.setAttribute('class', 'obstaculo');
    obstaculos.appendChild(obstaculo);

    let timeoutAleatorio = Math.floor(Math.random() * 1000)+1000;
    let obstaculoRight = -30;
    let obstaculoBottom = 100;
    let obstaculoWidth = 30;
    let obstaculoHeight = Math.floor(Math.random() * 50)+50;

    function moverObstaculo(){
        obstaculoRight += 5;
        obstaculo.style.right = obstaculoRight + 'px';
        obstaculo.style.bottom = obstaculoBottom + 'px';
        obstaculo.style.width = obstaculoWidth + 'px';
        obstaculo.style.height = obstaculoHeight + 'px';
        if(personajeRight >= obstaculoRight - personajeWidth && personajeRight <= obstaculoRight + obstaculoWidth && personajeBottom <= obstaculoBottom + obstaculoHeight){
            alert('¡Has perdido!\n\nTu puntuación: '+puntos);
            clearInterval(obstaculoInterval);
            clearTimeout(obstaculoTimeout);
            location.reload();

        }
    }
    let obstaculoInterval = setInterval(moverObstaculo, 20);
    let obstaculoTimeout = setTimeout(generarObstaculos, timeoutAleatorio);

}


generarObstaculos();

function controlar(tecla){
    if(tecla.key == 'ArrowUp' || tecla.key == ' ' ){
        saltar();
    }
}



document.addEventListener('keydown', controlar);

