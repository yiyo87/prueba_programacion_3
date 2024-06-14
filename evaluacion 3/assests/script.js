import {
  registrarPersona,
  obtenerPersonas,
  actualizarPersona,
  eliminarPersona,
} from "./promesas.js";
window.addEventListener("load", () => {
  document
    .getElementById("btnRegistrar")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let vali = validar();
      if (vali == true) {
        registrar();
      }
    });
  cargarDatos();
  document
    .getElementById("btnContraste")
    .addEventListener("click", cambiarContraste);
  document
    .getElementById("btnFuente")
    .addEventListener("click", cambiarFuenteTamano); //debo completar con la funcion que corresponde para cada id
  document
    .getElementById("btnActualizar")
    .addEventListener("click", actualizar);
});

const registrar = () => {
  //recupero elemento
  let eNombre = document.getElementById("nombre");
  let eApellido = document.getElementById("apellido");
  let eEdad = document.getElementById("edad");
  let eEmail = document.getElementById("email");
  let eTelefono = document.getElementById("telefono");
  let eOpciones = document.getElementById("opciones");
  let eComentario = document.getElementById("comentario");
  let eCheck = document.getElementById("check");
  console.log(eCheck, "checked");
  //recupero el valor del elemento
  let vNombre = eNombre.value;
  let vApellido = eApellido.value;
  let vEdad = eEdad.value;
  let vEmail = eEmail.value;
  let vTelefono = eTelefono.value;
  let vOpcion = eOpciones.value;
  let vComentario = eComentario.value;
  let vCheck = eCheck.checked; // true o false
  //creo un objeto en base al elemento con los datos recuperados
  let objeto = {
    nombre: vNombre,
    apellido: vApellido,
    edad: vEdad,
    email: vEmail,
    telefono: vTelefono,
    opcion: vOpcion,
    comentario: vComentario,
    termino: vCheck,
  }; //{apellido:vApellido},{edad:vEdad},tengo que agregar eso mas dentro de mi archivohtml

  // envio a una funcion que registre
  console.log(objeto);

  registrarPersona(objeto)
    .then(() => {
      //el then funciona como un activador si se cumple la funcion cuando la promesa se cumple o se ejecuta
      alert("se registra con exito");
      cargarDatos();
    })
    .catch((error) => {
      // es un activador cuando la promesa no se activa sale un error o mensaje de error
      console.log(error);
    });
};

const actualizar = () => {
  //recuperar campos del formulario
  //recupero elemento
  let eNombre = document.getElementById("UPDnombre");
  let eApellido = document.getElementById("UPDapellido");
  let eEdad = document.getElementById("UPDedad");
  let eCorreo = document.getElementById("UPDcorreo");
  let eTelefono = document.getElementById("UPDtelefono");
  let eOpcion = document.getElementById("UPDgenero");
  let eComentario = document.getElementById("UPDcomentario");
 

  //recupero el valor del elemento
  let vNombre = eNombre.value;
  let vApellido = eApellido.value;
  let vEdad = eEdad.value;
  let vCorreo = eCorreo.value;
  let vTelefono = eTelefono.value;
  let vOpcion = eOpcion.value;
  let vComentario = eComentario.value;
 
  //creo un objeto en base al elemento con los datos recuperados
  let objeto = {
    nombre: vNombre,
    apellido: vApellido,
    edad: vEdad,
    correo: vCorreo,
    telefono: vTelefono,
    opcion: vOpcion,
    comentario: vComentario,
    
  };
  //creo un objeto
  console.log(objeto,"que eso eso");
  let id = document.getElementById("btnActualizar").value;
  //envio el objeto y el id a las promesas
  console.log("id",id);
  document.getElementById("btnActualizar").disabled = "True";
  actualizarPersona(objeto, id)
    .then(() => {
      alert("se actualiza con exito");
      cargarDatos();
      document.getElementById("btnActualizar").disabled = "";
    })
    .catch((e) => {
      console.log(e);
    
    });
};

const cargarDatos = () => {
  //traer de las promesas todo lo registrada
  obtenerPersonas().then((personas) => {
    console.log("hola");
    console.log(personas);
    //cargarlo en la tabla del html
    let estructura = "";
    personas.forEach((p) => {
      estructura += "<tr>";
      estructura += "<td>" + p.nombre + "</td>";
      estructura += "<td>" + p.apellido + "</td>";
      estructura += "<td>" + p.edad + "</td>";
      estructura += "<td>" + p.email + "</td>";
      estructura += "<td>" + p.telefono + "</td>";
      estructura += "<td>" + p.opcion + "</td>";
      estructura += "<td>" + p.comentario + "</td>";
      estructura += "<td>" + p.termino + "</td>";
      estructura += "<td><button id='UPD" + p.id + "'>actualizar</button></td>";
      estructura += "<td><button id='DEL" + p.id + "'>eliminar</button></td>";
      estructura += "</tr>";
    });
    document.getElementById("cuerpoTabla").innerHTML = estructura;
    personas.forEach((p) => {
      let elemento = document.getElementById("UPD" + p.id);
      elemento.addEventListener("click", () => {
        document.getElementById("UPDnombre").value = p.nombre;
        document.getElementById("UPDapellido").value = p.apellido;
        document.getElementById("UPDedad").value = p.edad;
        document.getElementById("UPDcorreo").value = p.email;
        document.getElementById("UPDtelefono").value = p.telefono;
        document.getElementById("UPDgenero").value = p.opcion;
        document.getElementById("UPDcomentario").value = p.comentario;
        //document.getElementById("UPDcheck").checked = p.check;
        document.getElementById("btnActualizar").value = p.id;
      });
      let btnEliminar = document.getElementById("DEL" + p.id);
      btnEliminar.addEventListener("click", () => {
        if (confirm("desea eliminar a:\n" + p.nombre + "" + p.apellido)) {
          //aqui va a eliminar al usuario con el nombre y apellido y lo muestra con un alert
          console.log("vamos a eliminar");
          eliminarPersona(p.id)
            .then(() => {
              alert("eliminaste con exito");
              cargarDatos();
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          console.log("cancelaste la eliminacion");
        }
      });
    });
  });
};

function validar() {
  let vali = true;
  vali = validarVacio("nombre") && vali; // para pasar que el siguiente input sea true el anterior debe de ser true si no todos los demas van a ser false
  vali = validarVacio("apellido") && vali;
  vali = validarVacio("edad") && vali;
  vali = validarVacio("email") && vali;
  vali = validarLongitud("telefono") && vali;
  vali = validaOption("opciones") && vali;
  vali = validarVacio("comentario") && vali;
  vali = validarCheckBox("check") && vali;
  return vali;
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
    return false;
  } else {
    console.log("algo Hay");
    elemento.style.borderColor = "green";
    eParrafo.style.display = "none";
    return true;
  }
}

function validarCheckBox(idCampo) {
  //REcupera el elemento
  let elemento = document.getElementById(idCampo);
  console.log(elemento);
  //Recuperar valor del campo
  let valor = elemento;
  console.log(valor);
  let eParrafo = document.getElementById("p" + idCampo);
  if (!valor.checked) {
    //este checked por defecto verifica si es true o false
    console.log("No hay nada");
    elemento.style.borderColor = "red";
    eParrafo.style.display = "block";
    return false;
  } else {
    console.log("algo Hay");
    elemento.style.borderColor = "green";
    eParrafo.style.display = "none";
    return true;
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
      return true;
    } else {
      console.log("No hay nada");
      elemento.style.borderColor = "red";
      eParrafo.style.display = "block";
      return false;
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
    return true;
  } else {
    console.log("No hay nada");
    elemento.style.borderColor = "red";
    eParrafo.style.display = "block";
    return false;
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

  // Cambiar clases para el contenedor principal y el tÃ­tulo
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
