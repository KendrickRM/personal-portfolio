const formContacto = document.getElementById("contacto");
const botonEnviar = document.getElementById("botonEnviar");

// Cada campo: su regla de validación y el span donde se muestra el error
const campos = {
    nombre: { el: document.getElementById("nombre"), error: document.getElementById("errorNombre"), valido: (v) => /^[a-zA-ZÀ-ÿ\s'.-]{1,50}$/.test(v) },
    email: { el: document.getElementById("email"), error: document.getElementById("errorEmail"), valido: (v) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) },
    asunto: { el: document.getElementById("asunto"), error: document.getElementById("errorAsunto"), valido: (v) => v.length >= 1 && v.length <= 50 },
    mensaje: { el: document.getElementById("mensaje"), error: document.getElementById("errorMensaje"), valido: (v) => v.length >= 10 && v.length <= 300 },
};

const esValido = (campo) => campo.valido(campo.el.value.trim());

// Pinta de verde/rojo solo el campo que se está editando y muestra u oculta su error
const marcarCampo = (campo) => {
    const valido = esValido(campo);
    campo.el.style.borderColor = valido ? "green" : "red";
    campo.error.style.display = valido ? "none" : "block";
};

// El botón solo se habilita cuando todos los campos son válidos
const actualizarBoton = () => {
    botonEnviar.disabled = !Object.values(campos).every(esValido);
};

Object.values(campos).forEach((campo) => {
    ["keyup", "blur"].forEach((evento) => {
        campo.el.addEventListener(evento, () => {
            marcarCampo(campo);
            actualizarBoton();
        });
    });
});

const limpiarForm = () => {
    Object.values(campos).forEach((campo) => {
        campo.el.value = "";
        campo.el.style.borderColor = "";
        campo.error.style.display = "none";
    });
    botonEnviar.disabled = true;
};

formContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    const cuerpo = `Nombre: ${campos.nombre.el.value.trim()}\nCorreo: ${campos.email.el.value.trim()}\n\n${campos.mensaje.el.value.trim()}`;
    // Abre el cliente de correo del visitante con el mensaje ya redactado
    window.location.href = `mailto:kendri354@gmail.com?subject=${encodeURIComponent(campos.asunto.el.value.trim())}&body=${encodeURIComponent(cuerpo)}`;
    limpiarForm();
});
