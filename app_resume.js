let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 5;


function asignarTextoElemento(elemento, texto, color) {
    // Otra opcion de hacerlo.
    // let elementoHTML = document.querySelector(elemento);
    // elementoHTML.innerHTML = texto;

    let elementoHTML = document.getElementById(elemento);

    //-----------------------------------------------------------------------------------------
    // CON Operadores ternarios
    return elementoHTML ?
        (elementoHTML.innerHTML = texto,
            elementoHTML.style.color = color)
        :
        console.error(`El elemento con id '${elemento}' no fue encontrado.`);
}


function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    return isNaN(numeroDeUsuario) ?
        asignarTextoElemento('p', 'Debes de ingresar un numero', '#b81414')
        :
        numeroDeUsuario === numeroSecreto ?
            (asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`, '#28cc00'),
                document.getElementById('reiniciar').removeAttribute('disabled'),
                document.querySelector('#valorUsuario').setAttribute('disabled', 'true'),
                document.querySelector('#verificar').setAttribute('disabled', 'true'))
            :
            //El usuario no acertó.
            numeroDeUsuario > numeroSecreto ?
                asignarTextoElemento('p', 'El número secreto es menor', '#ccbe00')
                :
                asignarTextoElemento('p', 'El número secreto es mayor', '#ccbe00'),

        intentos++,
        limpiarCaja();
}


function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}


function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.info(`El numero generado es: ${numeroGenerado}`);
    console.log(listaNumerosSorteados);

    //Si ya sorteamos todos los números
    return listaNumerosSorteados.length == numeroMaximo ?
        (asignarTextoElemento('p', 'Ya se sortearon todos los números posibles', '#a15cff'),
            document.querySelector('#verificar').setAttribute('disabled', 'true'),
            document.querySelector('#valorUsuario').setAttribute('disabled', 'true'),
            document.getElementById('iniciar').style.display = 'block')
        :
        //Uso de Operador ternario anidado. Si el numero generado está incluido en la lista
        (listaNumerosSorteados.includes(numeroGenerado)
            ? generarNumeroSecreto()
            : (listaNumerosSorteados.push(numeroGenerado), numeroGenerado));
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
    //Habilitar el boton intento
    document.getElementById('verificar').removeAttribute('disabled');

    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}


function recargarPagina() {
    // Recargar la página
    location.reload();
}

// Primer funcion que se ejecuta.
condicionesIniciales();
