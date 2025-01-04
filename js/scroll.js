document.addEventListener("DOMContentLoaded", () => {
  // Идентификаторы блоков для прокрутки
  const sectionIds = [
    "first_screen",
    "second_screen",
    "third_screen",
    "fourth_screen",
    "fifth_screen",
    "sixth_screen",
    "seventh_screen"
  ];

  // Получаем элементы по их ID
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(section => section !== null);

  // Проверка: нашли ли мы все блоки?
  if (sections.length === 0) {
    console.error("Блоки для прокрутки не найдены.");
    return;
  }

  console.log("Блоки для прокрутки:", sections);

  let isScrolling = false; // Флаг для предотвращения двойного скролла
  let currentSectionIndex = 0; // Индекс текущего блока

  // Функция для прокрутки к конкретному блоку
  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return; // Выход за границы

    const scrollTarget =
      index === 0
        ? 0 // Если первый блок, прокручиваем до самого верха
        : sections[index].offsetTop + sections[index].offsetHeight / 2 - window.innerHeight / 2;

    isScrolling = true;

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth"
    });

    console.log(
      Прокрутка к блоку: ${sections[index].id} (координата: ${scrollTarget})
  );

    setTimeout(() => {
      isScrolling = false;
    }, 700); // Длительность прокрутки
  };

  // Обработчик событий колесика мыши
  document.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (event.deltaY < 0 && currentSectionIndex > 0) {
      currentSectionIndex--;
    }

    scrollToSection(currentSectionIndex);
  });

  // Обработчик сенсорных свайпов
  let touchStartY = 0;

  document.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
  });

  document.addEventListener("touchend", (event) => {
    if (isScrolling) return;

    const touchEndY = event.changedTouches[0].clientY;

    if (touchEndY < touchStartY && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (touchEndY > touchStartY && currentSectionIndex > 0) {
      currentSectionIndex--;
    }

    scrollToSection(currentSectionIndex);
  });

  // Обновление текущего блока при изменении размера окна
  window.addEventListener("resize", () => {
    scrollToSection(currentSectionIndex);
  });

  // Инициализация
  scrollToSection(currentSectionIndex);

  // Привязка кнопок к секциям
  const buttonSectionMap = {
    participation: 1, // Индексы соответствуют sectionIds
    schedule: 2,
    fq: 3,
    partners: 4,
    prize: 5,
    form: 6
  };

  Object.keys(buttonSectionMap).forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", () => {
        const targetIndex = buttonSectionMap[buttonId];
        if (targetIndex !== undefined) {
          currentSectionIndex = targetIndex;
          scrollToSection(targetIndex);
        }
      });
    }
  });

  // Обработчик для кнопки Start
  const startButton = document.getElementById("start");
  if (startButton) {
    startButton.addEventListener("click", () => {
      currentSectionIndex = 0; // Индекс first_screen
      scrollToSection(currentSectionIndex);
    });
  }
});
