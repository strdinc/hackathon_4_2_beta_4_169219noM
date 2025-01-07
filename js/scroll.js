document.addEventListener("DOMContentLoaded", () => {
  // Отключение скрипта на мобильных экранах
  const isMobile = window.innerWidth < 1000;
  if (isMobile) {
    console.log("Скрипт отключен на мобильных устройствах.");
    return;
  }

  const sectionIds = [
    "first_screen",
    "second_screen",
    "third_screen",
    "fourth_screen",
    "fifth_screen",
    "sixth_screen",
    "seventh_screen"
  ];

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(section => section !== null);

  if (sections.length === 0) {
    console.error("Блоки для прокрутки не найдены.");
    return;
  }

  let isScrolling = false;
  let currentSectionIndex = 0;
  let touchStartY = 0;
  const swipeThreshold = 50; // Минимальная длина свайпа для срабатывания

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length || isScrolling) return;

    const scrollTarget = sections[index].offsetTop;

    isScrolling = true;

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth"
    });

    setTimeout(() => {
      isScrolling = false;
    }, 700);
  };

  document.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (event.deltaY < 0 && currentSectionIndex > 0) {
      currentSectionIndex--;
    }

    scrollToSection(currentSectionIndex);
  });

  document.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    if (isScrolling) return;

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0 && currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
      } else if (deltaY < 0 && currentSectionIndex > 0) {
        currentSectionIndex--;
      }
      scrollToSection(currentSectionIndex);
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    scrollToSection(currentSectionIndex);
  });

  scrollToSection(currentSectionIndex);

  const buttonSectionMap = {
    participation: 1,
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

  const startButton = document.getElementById("start");
  if (startButton) {
    startButton.addEventListener("click", () => {
      currentSectionIndex = 0;
      scrollToSection(currentSectionIndex);
    });
  }
});
