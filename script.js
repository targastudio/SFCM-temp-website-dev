const slideshow = document.querySelector('.slideshow');
const themeCombinations = [
  { background: 'var(--sfcm-green)', text: 'var(--sfcm-black)' },
  { background: 'var(--sfcm-red)', text: 'var(--sfcm-black)' },
  { background: 'var(--sfcm-violet)', text: 'var(--sfcm-black)' },
  { background: 'var(--sfcm-black)', text: 'var(--sfcm-green)' },
  { background: 'var(--sfcm-black)', text: 'var(--sfcm-red)' },
  { background: 'var(--sfcm-black)', text: 'var(--sfcm-violet)' },
];
let slides = document.querySelectorAll('.slide');
let activeSlide = 0;
let touchStartX = null;
let touchStartY = null;
let didSwipe = false;

const swipeThreshold = 40;
const themeStorageKey = 'sfcm-theme-index';
const typewriterDelay = 2;
const awardsTypewriterStepSize = 8;
const defaultTypewriterStepSize = 3;
const typewriterSections = document.querySelectorAll('[data-typewriter-section]');

function applyRandomTheme() {
  let previousThemeIndex = -1;
  let selectedThemeIndex = Math.floor(Math.random() * themeCombinations.length);

  try {
    previousThemeIndex = Number.parseInt(localStorage.getItem(themeStorageKey), 10);
  } catch {
    previousThemeIndex = -1;
  }

  if (themeCombinations.length > 1 && selectedThemeIndex === previousThemeIndex) {
    selectedThemeIndex = (selectedThemeIndex + 1) % themeCombinations.length;
  }

  try {
    localStorage.setItem(themeStorageKey, String(selectedThemeIndex));
  } catch {
    // The theme can still apply when browser storage is unavailable.
  }

  const selectedTheme = themeCombinations[selectedThemeIndex];

  document.documentElement.style.setProperty('--site-background', selectedTheme.background);
  document.documentElement.style.setProperty('--site-text', selectedTheme.text);
}

const projectImageGroups = [
  {
    images: [
      'img/[30 Verticale]/30 Verticale_01.jpg',
      'img/[30 Verticale]/30 Verticale_02.jpg',
      'img/[30 Verticale]/30 Verticale_03.jpg',
      'img/[30 Verticale]/30 Verticale_04.jpg',
    ],
  },
  {
    images: [
      'img/[Beachvolley-halle Peccia]/Beachvolley-halle Peccia_01.jpg',
      'img/[Beachvolley-halle Peccia]/Beachvolley-halle Peccia_02.jpg',
      'img/[Beachvolley-halle Peccia]/Beachvolley-halle Peccia_03.jpg',
      'img/[Beachvolley-halle Peccia]/Beachvolley-halle Peccia_04.jpg', 
    ],
  },
  {
    images: [
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_01.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_02.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_05.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_06.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_07.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_08.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_09.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_10.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_11.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_12.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_13.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_14.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_15.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_16.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_18.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_20.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_21.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_22.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_23.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_24.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_25.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_26.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_27.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_29.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_30.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_31.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_32.jpg',
      'img/[G. Modugno, Primary School]/G. Modugno, Primary School_33.jpg',
    ],
  },
  {
    images: [
      'img/[Hotel Mondial]/Hotel Mondial_01.jpg',
      'img/[Hotel Mondial]/Hotel Mondial_02.jpg',
      'img/[Hotel Mondial]/Hotel Mondial_03.jpg',
      'img/[Hotel Mondial]/Hotel Mondial_04.jpg',
      'img/[Hotel Mondial]/Hotel Mondial_05.jpg',
    ],
  },
  {
    images: [
      'img/[Livraria Gondwana]/Livraria Gondwana_01.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_02.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_03.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_04.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_05.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_06.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_09.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_10.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_12.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_13.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_14.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_15.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_17.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_19.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_20.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_21.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_22.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_23.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_24.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_25.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_26.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_27.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_28.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_29.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_30.jpg',
      'img/[Livraria Gondwana]/Livraria Gondwana_31.jpg',
    ],
  },
  {
    images: [
      'img/[Mediterranean Cultural Gate]/Mediterranean Cultural Gate_01.jpg',
      'img/[Mediterranean Cultural Gate]/Mediterranean Cultural Gate_02.jpg',
      'img/[Mediterranean Cultural Gate]/Mediterranean Cultural Gate_03.jpg',
      'img/[Mediterranean Cultural Gate]/Mediterranean Cultural Gate_05.jpg',
    ],
  },
  {
    images: [
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_01.jpg',
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_02.jpg',
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_03.jpeg',
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_05.jpeg',
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_06.jpeg',
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_07.jpg',
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_08.jpg',
      'img/[Multipurpose Cultural Center]/Multipurpose Cultural Center_09.jpg',
    ],
  },
  {
    images: [
      'img/[Research]/Blurring Identities_01.jpg',
      'img/[Research]/Blurring Identities_02.jpg',
      'img/[Research]/Blurring Identities_03.jpg',
      'img/[Research]/Instagram_01.jpg',
      'img/[Research]/Instagram_02.jpg',
      'img/[Research]/Instagram_03.jpg',
      'img/[Research]/Laboratorio Prenestino_01.jpg',
      'img/[Research]/Laboratorio Prenestino_02.jpg',
      'img/[Research]/Laboratorio Prenestino_03.jpg',
      'img/[Research]/Laboratorio Prenestino_04.jpg',
    ],
  },
];

applyRandomTheme();

function initializeTypewriterSections() {
  typewriterSections.forEach((section) => {
    const title = section.querySelector('.typewriter-section__title');
    const content = section.querySelector('[data-typewriter-content]');

    if (!title || !content) {
      return;
    }

    const fullText = content.textContent;
    content.dataset.typewriterText = fullText;

    collapseTypewriterSection(section);

    title.addEventListener('click', () => {
      const isExpanded = section.classList.contains('is-expanded');
      const isAwardsSection = section.classList.contains('typewriter-section--awards');

      if (isAwardsSection && !isExpanded) {
        typewriterSections.forEach((otherSection) => {
          if (otherSection !== section) {
            animateTypewriterSection(otherSection, false);
          }
        });
      }

      if (!isAwardsSection && !isExpanded) {
        const awardsSection = document.querySelector('.typewriter-section--awards');

        if (awardsSection?.classList.contains('is-expanded')) {
          animateTypewriterSection(awardsSection, false);
        }
      }

      animateTypewriterSection(section, !isExpanded);
    });
  });
}

function animateTypewriterSection(section, shouldExpand) {
  const title = section.querySelector('.typewriter-section__title');
  const content = section.querySelector('[data-typewriter-content]');
  const fullText = content?.dataset.typewriterText ?? '';

  if (!title || !content) {
    return;
  }

  const startLength = content.textContent.length;
  const targetLength = shouldExpand ? fullText.length : 0;
  const stepSize = section.classList.contains('typewriter-section--awards')
    ? awardsTypewriterStepSize
    : defaultTypewriterStepSize;
  const step = shouldExpand ? stepSize : -stepSize;

  window.clearInterval(section.typewriterTimer);
  section.classList.toggle('is-expanded', shouldExpand);
  title.setAttribute('aria-expanded', String(shouldExpand));

  if (startLength === targetLength) {
    content.textContent = fullText.slice(0, targetLength);
    return;
  }

  section.typewriterTimer = window.setInterval(() => {
    const currentLength = content.textContent.length;
    const nextLength = shouldExpand
      ? Math.min(currentLength + step, targetLength)
      : Math.max(currentLength + step, targetLength);

    content.textContent = fullText.slice(0, nextLength);

    if (nextLength === targetLength) {
      window.clearInterval(section.typewriterTimer);
    }
  }, typewriterDelay);
}

function collapseTypewriterSection(section) {
  const title = section.querySelector('.typewriter-section__title');
  const content = section.querySelector('[data-typewriter-content]');

  if (!title || !content) {
    return;
  }

  window.clearInterval(section.typewriterTimer);
  section.classList.remove('is-expanded');
  title.setAttribute('aria-expanded', 'false');
  content.textContent = '';
}

function shuffleImages(images) {
  const shuffledImages = [...images];

  for (let index = shuffledImages.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledImages[index], shuffledImages[randomIndex]] = [shuffledImages[randomIndex], shuffledImages[index]];
  }

  return shuffledImages;
}

function getAllProjectImages() {
  return projectImageGroups.flatMap((project) => project.images);
}

function buildProjectSlides() {
  if (!slideshow || projectImageGroups.length === 0) {
    return;
  }

  const shuffledImages = shuffleImages(getAllProjectImages());

  shuffledImages.forEach((imageSrc) => {
    const slide = document.createElement('img');

    slide.className = 'slide';
    slide.alt = '';
    slide.addEventListener('load', () => {
      const isVertical = slide.naturalHeight > slide.naturalWidth;

      slide.classList.toggle('is-vertical', isVertical);
      slide.classList.toggle('is-horizontal', !isVertical);
    });
    slide.src = imageSrc;
    slideshow.append(slide);
  });

  slides = document.querySelectorAll('.slide');

  if (slides.length > 0) {
    slides[0].classList.add('is-active');
  }
}

function showSlide(index) {
  if (slides.length === 0) {
    return;
  }

  slides[activeSlide].classList.remove('is-active');
  activeSlide = (index + slides.length) % slides.length;
  slides[activeSlide].classList.add('is-active');
}

function showNextSlide() {
  if (activeSlide === slides.length - 1) {
    rebuildProjectSlides();
    return;
  }

  showSlide(activeSlide + 1);
}

function showPreviousSlide() {
  showSlide(activeSlide - 1);
}

buildProjectSlides();
initializeTypewriterSections();

function rebuildProjectSlides() {
  if (!slideshow) {
    return;
  }

  slideshow.querySelectorAll('.slide').forEach((slide) => slide.remove());
  activeSlide = 0;
  buildProjectSlides();
}

if (slides.length > 1 && slideshow) {
  slideshow.addEventListener('click', () => {
    if (didSwipe) {
      didSwipe = false;
      return;
    }

    showNextSlide();
  });

  slideshow.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length !== 1) {
        return;
      }

      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  slideshow.addEventListener(
    'touchend',
    (event) => {
      if (touchStartX === null || touchStartY === null) {
        touchStartX = null;
        touchStartY = null;
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      touchStartX = null;
      touchStartY = null;

      if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      if (deltaX < 0) {
        didSwipe = true;
        showNextSlide();
        return;
      }

      didSwipe = true;
      showPreviousSlide();
    },
    { passive: true }
  );

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      showNextSlide();
    }

    if (event.key === 'ArrowLeft') {
      showPreviousSlide();
    }
  });
}
