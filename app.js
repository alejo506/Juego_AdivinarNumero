let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 5;


function asignarTextoElemento(elemento, texto, color) {
    // Otra opcion de hacerlo.
    // let elementoHTML = document.querySelector(elemento);
    // elementoHTML.innerHTML = texto;

    let elementoHTML = document.getElementById(elemento);

    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
        elementoHTML.style.color = color
    } else {
        console.error(`El elemento con id '${elemento}' no fue encontrado.`);
    }

    return;
}


function verificarIntento() {

    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (isNaN(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Debes de ingresar un numero', '#b81414');
    }
    else {
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`, '#28cc00');
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.querySelector('#valorUsuario').setAttribute('disabled', 'true');
            document.querySelector('#verificar').setAttribute('disabled', 'true');

        } else {
            //El usuario no acertó.
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El número secreto es menor', '#ccbe00');
            } else {
                asignarTextoElemento('p', 'El número secreto es mayor', '#ccbe00');
            }
            intentos++;
            limpiarCaja();
        }
        return;
    }
}


function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(`El numero generado es: ${numeroGenerado}`);
    console.log(listaNumerosSorteados);

    //Si ya sorteamos todos los números

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles', '#a15cff');
        document.querySelector('#verificar').setAttribute('disabled','true');
        document.querySelector('#valorUsuario').setAttribute('disabled','true');
        document.getElementById('iniciar').style.display = 'block';

    } else {
        //Si el numero generado está incluido en la lista

        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }

    }
}


function condicionesIniciales() {
    //Indicar mensaje de intervalo de números 
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`, 'white');
    //Generar el número aleatorio
    numeroSecreto = generarNumeroSecreto();
    //Inicializar el número intentos
    intentos = 1;
}


function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Habilitar el campo
    document.getElementById('valorUsuario').removeAttribute('disabled');
    //Habilitar el boton para nuevo juego
    document.getElementById('verificar').removeAttribute('disabled');

    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}


function recargarPagina() {
    // Recargar la página
    location.reload();
}

condicionesIniciales();
