const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const container = document.querySelector('.carousel-container');

const cardWidth = cards[0].offsetWidth;
let counter = 1; // Empezamos en 1 porque el índice 0 es el clon de atrás
const transitionStyle = "transform 0.4s ease-in-out";

let autoPlayInterval;

// Función para mover el carrusel de forma limpia
function updateCarousel() {
    track.style.transition = transitionStyle;
    track.style.transform = `translateX(${-cardWidth * counter}px)`;
}

// Control de botones
nextBtn.addEventListener('click', () => {
    if (counter >= cards.length - 1) return; // Evita saltos si el usuario cliquea muy rápido
    counter++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    counter--;
    updateCarousel();
});

// El truco de magia: Reiniciar la posición de forma invisible al tocar los clones
track.addEventListener('transitionend', () => {
    // Si llegamos al clon del final (tarjeta 1 clonada)
    if (cards[counter].classList.contains('clone') && counter === cards.length - 1) {
        track.style.transition = "none";
        counter = 1; // Saltamos a la tarjeta 1 real
        track.style.transform = `translateX(${-cardWidth * counter}px)`;
    }
    // Si llegamos al clon del principio (tarjeta 4 clonada)
    if (cards[counter].classList.contains('clone') && counter === 0) {
        track.style.transition = "none";
        counter = cards.length - 2; // Saltamos a la última tarjeta real
        track.style.transform = `translateX(${-cardWidth * counter}px)`;
    }
});

// Auto-play + Hover Pause
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        counter++;
        updateCarousel();
    }, 3000); // Cambia cada 3 segundos
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Eventos para pausar al pasar el ratón por encima
container.addEventListener('mouseenter', stopAutoPlay);
container.addEventListener('mouseleave', startAutoPlay);

// Iniciar ciclo de reproducción automática al cargar la página
startAutoPlay();