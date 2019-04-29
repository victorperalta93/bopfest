//Variables
const abrirComentarios = document.getElementById("abrir-comentarios");
const botonComentario = document.getElementById("boton-comentario");
const formulario  = document.getElementsByClassName("grupo-formulario");
const nombreForm = document.getElementById("nombre-form");
const emailForm  = document.getElementById("email-form");
const mensajeForm = document.getElementById("mensaje-form");
const prohibidas = ["casa", "furgoneta","caballo"];

let botonComentariosActivo = false;

//Al pulsar Comentarios en la barra de navegacion aparece la zona de comentarios
abrirComentarios.onclick = function () {
    if(!botonComentariosActivo) {
        document.getElementById("zona-comentarios").style.width = "30%";
        document.body.style.marginRight = "30%";
        document.getElementById("abrir-comentarios").innerHTML = "Cerrar";
        botonComentariosActivo = true;
    }
    else {
        document.getElementById("zona-comentarios").style.width = "0";
        document.body.style.marginRight = "0";
        document.getElementById("abrir-comentarios").innerHTML = "Comentarios";
        botonComentariosActivo = false;
    }   
}

//Al pulsar el boton enviar, procesa y añade el comentario
botonComentario.addEventListener("click", (e) =>{
    e.preventDefault(); // evitar que se refresque la página

    // crear objeto de imagen
    let imagen  = document.createElement("img");
    imagen.src = "../imgs/user.png";
    imagen.classList.add("imagen-comentario");

    // crear objeto de nombre
    let nombre  = document.createElement("h3");
    let correo  = document.createElement("p");
    let fecha   = document.createElement("p");
    let mensaje = document.createElement("p");


    if(nombreForm.value == "" || emailForm.value == "" || mensajeForm.value == "")
        alert("¡Algun campo está vacio!")
    else if (!validarEmail(emailForm.value))
        alert("¡Email no correcto!")
    else{
        // añadir contenido
        nombre.appendChild(document.createTextNode(`${nombreForm.value}`));
        correo.appendChild(document.createTextNode(`${emailForm.value}`));
        fecha.appendChild(document.createTextNode(incluirFecha()));
        mensaje.appendChild(document.createTextNode(`${mensajeForm.value}`));

        // añadir clases
        nombre.classList.add("nombre-usuario");
        correo.classList.add("correo-usuario");
        fecha.classList.add("fecha-usuario");
        mensaje.classList.add("comentario-usuario");

        // añadir div contenedor
        let comentarios_dinamicos = document.getElementById("comentarios-dyn");

        let comentario = document.createElement("div");
        comentario.classList.add("comentario");
        comentario.appendChild(imagen);
        comentario.appendChild(nombre);
        comentario.appendChild(correo);
        comentario.appendChild(fecha);
        comentario.appendChild(mensaje);

        comentarios_dinamicos.appendChild(comentario);

        nombreForm.value = "";
        emailForm.value  = "";
        mensajeForm.value = "";
    }
});

//Comprueba que un email es correcto
function validarEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Comprueba si en un texto hay una palabra prohibida
function comprobarMensaje(mensaje) {
    let p = mensaje.value;

    prohibidas.forEach(function(elemento){
        if(p.includes(elemento))
            p = p.replace(elemento, marcarPalabraProhibida(elemento.length));
    });
    
    return p;
}

//Añade los asteriscos segun la longitud de la palabra
function marcarPalabraProhibida(longitud) {
    let asteriscos = "";

    for(let i=0; i<longitud; i++)
        asteriscos += "*";

    return asteriscos;
}

//Funcion que devuelve la fecha y hora actual
function incluirFecha() {
    let fecha = new Date();

    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let anyo = fecha.getFullYear();
    let hora = fecha.getHours();
    let min = (fecha.getMinutes()<10?"0":"") + fecha.getMinutes();

    let fechaCompleta = dia + "/" + mes +"/" + anyo + " a las " + hora + ":" + min;

    return fechaCompleta;
}

//Se comprueba cada vez que levantas una tecla en el formulario si ha una palabra prohibida
mensajeForm.onkeyup = function () {
    mensajeForm.value = comprobarMensaje(mensajeForm);
}

nombreForm.onkeyup = function () {
    nombreForm.value = comprobarMensaje(nombreForm);
}

emailForm.onkeyup = function () {
    emailForm.value = comprobarMensaje(emailForm);
}