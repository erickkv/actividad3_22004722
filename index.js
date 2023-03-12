let formulario = document.getElementById("form-fecha");
let fechaSeleccionada = document.getElementById('fecha-select');
let climaMorn = document.getElementById('clima-morn');
let climaTarde = document.getElementById('clima-tarde');
let climaNoche = document.getElementById('clima-noche');
let mornHeader = document.getElementById('clima-morn-header');
let mornImg = document.getElementById('clima-morn-img');
let mornFooter = document.getElementById('clima-morn-footer');
let tardeHeader = document.getElementById('clima-tarde-header');
let tardeImg = document.getElementById('clima-tarde-img');
let tardeFooter = document.getElementById('clima-tarde-footer');
let nocheHeader = document.getElementById('clima-noche-header');
let nocheImg = document.getElementById('clima-noche-img');
let nocheFooter = document.getElementById('clima-noche-footer');
let fechaHeader = document.getElementById("fecha-header");
let tituloFecha = document.getElementById("titulo-fecha");

formulario.addEventListener('submit', function(evento) {
    //para la fecha se agrega esto: "replace(/-/g, '\/')", esto la cambia de 2023-02-02 a 2023/02/02
    //porque si no, la convierte a un día anterior por la zona horaria,
    //es un error del objeto date de javastring
    let fechaIngresada = new Date(fechaSeleccionada.value.replace(/-/g, '\/'));
    evento.preventDefault();
    limpiarDivs();
    /* fechaHeader.innerHTML = new Date().getDate();
    mornHeader.innerHTML = fechaIngresada.getDate(); */
    if (!fechaSeleccionada.value) {
        fechaHeader.innerHTML = 'Por favor seleccione una fecha';
    } else {
        tituloFecha.innerHTML = "Pron&oacute;stico para el d&iacutea: " + fechaIngresada.toLocaleDateString();
    }
    if (fechaSeleccionada.value && isToday(fechaIngresada)) {
        tituloFecha.innerHTML = "Pron&oacute;stico para el d&iacutea de hoy: " + fechaIngresada.toLocaleDateString();

        mostrarClimaHoy(() => {return true});
    } else if((fechaSeleccionada.value && !isToday(fechaIngresada))) {
        mostrarClimaOtroDia(() => {return true});
    }

});

//funcion math.random() para integer aleatorio entre 2 valores (fuente: MDN - Math.random())
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomTiempo() {
    const randNum = getRandomInt(0, 3);
    if (randNum === 0) return 'despejado';
    if (randNum === 1) return 'nublado';
    if (randNum === 2) return 'lluvioso';
}

function getRandomTemp() {
    // para que muestre el simbolo ° en HTML es "&deg"
    return `${getRandomInt(5, 31)}&degC`;
}

function mostrarClimaHoy(cb) {
    setTimeout(() => {
        let tiempoMorn = getRandomTiempo();
        let tiempoTarde = getRandomTiempo();
        let tiempoNoche = getRandomTiempo();
        //para que muestre la ñ en html es "&ntilde"
        mornHeader.innerHTML = "Ma&ntildeana";
        tardeHeader.innerHTML = "Tarde";
        nocheHeader.innerHTML = "Noche";
        let imgMorn = document.createElement("img");
        let imgTarde = document.createElement("img");
        let imgNoche = document.createElement("img");
        imgMorn.src = `${tiempoMorn}.png`;
        imgTarde.src = `${tiempoTarde}.png`;
        imgNoche.src = `${tiempoNoche}.png`;
        mornImg.appendChild(imgMorn);
        tardeImg.appendChild(imgTarde);
        nocheImg.appendChild(imgNoche);
        mornFooter.innerHTML = getRandomTemp();
        tardeFooter.innerHTML = getRandomTemp();
        nocheFooter.innerHTML = getRandomTemp();
        mornHeader.hidden = false;
        tardeHeader.hidden = false;
        nocheHeader.hidden = false;
        cb();
    }, 1000)

}

function mostrarClimaOtroDia(cb) {
    setTimeout(() => {
        let tiempoMorn = getRandomTiempo();
        //para que muestre la ñ en html es "&ntilde"
        mornHeader.innerHTML = "Ma&ntildeana";
        let imgMorn = document.createElement("img");
        imgMorn.src = `${tiempoMorn}.png`;
        mornImg.appendChild(imgMorn);
        mornFooter.innerHTML = getRandomTemp();
        mornHeader.hidden = false;
        cb();
    }, 1000)

}

function limpiarDivs() {
    fechaHeader.innerHTML = '';
    mornHeader.innerHTML = '';
    mornImg.innerHTML = '';
    mornFooter.innerHTML = '';
    tardeHeader.innerHTML = '';
    tardeImg.innerHTML = '';
    tardeFooter.innerHTML = '';
    nocheHeader.innerHTML = '';
    nocheImg.innerHTML = '';
    nocheFooter.innerHTML = '';
    mornHeader.hidden = true;
    tardeHeader.hidden = true;
    nocheHeader.hidden = true;
}

//fuente: https://bobbyhadz.com/blog/javascript-check-if-date-is-today
function isToday(date) {
    const today = new Date();

    console.log(today);

    if (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    ) {
      return true;
    }

    return false;
  }
