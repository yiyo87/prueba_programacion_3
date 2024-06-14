window.addEventListener("load", () => {
  document
    .getElementById("btnRegistrar")
    .addEventListener("click", function (event) {
      event.preventDefault();
      validar();
    });
  document
    .getElementById("btnContraste")
    .addEventListener("click", cambiarContraste);
  document
    .getElementById("btnFuente")
    .addEventListener("click", cambiarFuenteTamano); //debo completar con la funcion que corresponde para cada id
});

function validar() {
  validarVacio("nombre");
  validarVacio("apellido");
  validarVacio("edad");
  validarVacio("email");
  validarLongitud("telefono");
  validaOption("opciones");
  validarVacio("comentario");
  validarCheckBox("check");
}
function validarVacio(idCampo) {
  //REcupera el elemento
  let elemento = document.getElementById(idCampo);
  console.log(elemento);
  //Recuperar valor del campo
  let valor = elemento.value;
  console.log(valor);
  let eParrafo = document.getElementById("p" + idCampo);
  if (valor.trim() == "") {
    console.log("No hay nada");
    elemento.style.borderColor = "red";
    eParrafo.style.display = "block";
  } else {
    console.log("algo Hay");
    elemento.style.borderColor = "green";
    eParrafo.style.display = "none";
  }
}

function validarCheckBox(idCampo){
     //REcupera el elemento
  let elemento = document.getElementById(idCampo);
  console.log(elemento);
  //Recuperar valor del campo
  let valor = elemento.value;
  console.log(valor);
  let eParrafo = document.getElementById("p" + idCampo);
  if (valor.checked) {//este checked por defecto verifica si es true o false 
    console.log("algo Hay");
    elemento.style.borderColor = "green";
    eParrafo.style.display = "none";
  } else {
    console.log("No hay nada");
    elemento.style.borderColor = "red";
    eParrafo.style.display = "block";
  }
}

function validarLongitud(idCampo) {
  //REcupera el elemento
  let elemento = document.getElementById(idCampo);
  console.log(elemento);
  //Recuperar valor del campo
  let valor = elemento.value;
  console.log("valor", valor);
  console.log("isnan", isNaN(valor));
  let eParrafo = document.getElementById("p" + idCampo);
  if (valor == "") {
    //true si es un caracter
    eParrafo.innerText = "Debes ingresar un numero";
    eParrafo.style.display = "block";
    elemento.style.borderColor = "red";
  } else {
    if (valor.trim().length == 9 || valor.trim().length == 0) {
      console.log("algo Hay");
      elemento.style.borderColor = "green";
      eParrafo.style.display = "none";
    } else {
      console.log("No hay nada");
      elemento.style.borderColor = "red";
      eParrafo.style.display = "block";
    }
  }
}

function validaOption(idCampo) {
  let elemento = document.getElementById(idCampo);
  let valor = elemento.value;
  let eParrafo = document.getElementById("p" + idCampo);
  if (valor) {
    console.log("algo Hay");
    elemento.style.borderColor = "green";
    eParrafo.style.display = "none";
  } else {
    console.log("No hay nada");
    elemento.style.borderColor = "red";
    eParrafo.style.display = "block";
  }
}

function cambiarContraste() {
  //esta funcion cambia el contraste de la pagina con un background color blanco y cambia a negro
  let eBody = document.body; //toma el body como un elemento y lo recupera
  let fondo = eBody.style.backgroundColor; // a ese elemento body le aplica un css
  let eH1 = document.getElementsByClassName("titulo"); // se toma el elemento id titulo y se recupera
  //console.log(eH1);
  //console.log(eH1[0]);
  //console.log(eH1[1]);
  let inputs = document.getElementsByTagName("input"); // y tambien se toman los elementos inputs
  console.log(inputs);

  //console.log(fondo);
  if (fondo == "white") {
    // con este if y ciclo for se hace que al hacer click al boton cambiar contraste pasa de blanco a negro y tambien cambia de color tanto el h1 de titulo junto con los bordes de los inputs
    eBody.style.backgroundColor = "black";
    for (let index = 0; index < eH1.length; index++) {
      const element = eH1[index];
      element.style.color = "white";
    }

    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      element.style.borderColor = "white";
    }
    //eH1[0].style.color = "purple";
    //eH1[1].style.color = "purple";
  } else {
    eBody.style.backgroundColor = "white";
    for (let index = 0; index < eH1.length; index++) {
      const element = eH1[index];
      element.style.color = "black";
    }

    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      element.style.borderColor = "black";
    }
    // eH1[0].style.color = "black";
    //eH1[1].style.color = "black";
  }
}

function cambiarFuenteTamano() {
  var caja = document.getElementById("caja");
  var titulo = document.getElementById("titulo");
  var labels = document.getElementsByClassName("label");
  var formulario = document.getElementById("formulario");

  // Cambiar clases para el contenedor principal y el título
  caja.classList.toggle("cambioTamanoFormulario");
  titulo.classList.toggle("cambioFuente");
  titulo.classList.toggle("cambioFuente2");

  // Cambiar clases para cada label
  for (var i = 0; i < labels.length; i++) {
    labels[i].classList.toggle("cambioFuente");
    labels[i].classList.toggle("cambioFuente2");
  }

  // Cambiar clases para el formulario
  formulario.classList.toggle("cambioTamanoFormulario");
}
