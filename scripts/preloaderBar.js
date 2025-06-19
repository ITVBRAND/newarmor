const loader = document.getElementById('loader');
const percentText = document.getElementById('percentage');
const preloaderText = document.getElementById('preloader-text');
const segmentCount = 60;
let loaded = 0;
let textSwitched = false; // чтобы не переключалось много раз

// Создаём сегменты
for (let i = 0; i < segmentCount; i++) {
    const segment = document.createElement('div');
    segment.classList.add('bar-segment');
    loader.appendChild(segment);
}

const segments = document.querySelectorAll('.bar-segment');

// Функция добавления прогресса
function animateLoading() {
    if (loaded < segmentCount) {
        segments[loaded].style.opacity = 1;
        loaded++;
        const percent = Math.round((loaded / segmentCount) * 100);
        percentText.textContent = `${percent}%`;

        // Меняем текст при достижении 70%
        if (percent >= 50 && !textSwitched) {
            preloaderText.innerHTML = `только тот, кто не боится встретиться<br>лицом к лицу с ними<br>достоин славы и уважения`;
            textSwitched = true;
        }

        setTimeout(animateLoading, 100);
    } else {
        // Когда загрузка завершена (100%)
        const slideOne = document.querySelector('.preloader__slide.one');
        const slideTwo = document.querySelector('.preloader__slide.two');

        if (slideOne && slideTwo) {
            slideOne.style.display = 'none';
            slideTwo.style.transform = 'scale(1)';
            slideTwo.style.opacity = '1';
        }
    }

}

animateLoading();

const btn = document.querySelector('.btn');
const preloader = document.querySelector('.preloader');
const windowBottom = document.querySelector('.window__bottom');
const header = document.querySelector('.header');

btn.addEventListener('click', () => {
    // Добавляем класс для анимации прелоадера
    preloader.classList.add('preloader--slide-up');

    // Запускаем таймер на 1 секунду
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);

    // Добавляем transform: translateY(0); к window__bottom и header
    if (windowBottom) {
        windowBottom.style.transform = 'translateY(0)';
    }
    if (header) {
        header.style.transform = 'translateY(0)';
    }
});

const preloaderEnd = document.querySelector('.preloader__slide--end');

preloaderEnd.addEventListener('click', () => {
    preloaderEnd.style.opacity = '0';
    preloaderEnd.style.transform = 'scale(0)';
});