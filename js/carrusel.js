const carrusel = document.querySelector(".carousel");
const pista = carrusel.querySelector(".carousel__track");
const diapositivas = carrusel.querySelectorAll(".carousel__slide");
const contenedorPuntos = carrusel.querySelector(".carousel__dots");
const botonAnterior = carrusel.querySelector(".carousel__arrow--prev");
const botonSiguiente = carrusel.querySelector(".carousel__arrow--next");

let actual = 0;

// Un punto por proyecto, clicable para saltar directo a él
const puntos = Array.from(diapositivas, (_, i) => {
    const punto = document.createElement("button");
    punto.type = "button";
    punto.className = "carousel__dot";
    punto.setAttribute("aria-label", `Ir al proyecto ${i + 1}`);
    punto.addEventListener("click", () => irA(i));
    contenedorPuntos.appendChild(punto);
    return punto;
});

// Mueve la pista y deja inactivas (sin foco ni lectura) las diapositivas fuera de vista
const irA = (indice) => {
    actual = (indice + diapositivas.length) % diapositivas.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;
    diapositivas.forEach((d, i) => d.toggleAttribute("inert", i !== actual));
    puntos.forEach((p, i) => p.classList.toggle("carousel__dot--active", i === actual));
};

botonAnterior.addEventListener("click", () => irA(actual - 1));
botonSiguiente.addEventListener("click", () => irA(actual + 1));

carrusel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") irA(actual - 1);
    if (e.key === "ArrowRight") irA(actual + 1);
});

// Deslizar con el dedo en celular
let inicioX = null;
carrusel.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
carrusel.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const diferencia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(diferencia) > 50) irA(actual + (diferencia < 0 ? 1 : -1));
    inicioX = null;
});

irA(0);
