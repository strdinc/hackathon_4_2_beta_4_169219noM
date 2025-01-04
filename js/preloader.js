window.addEventListener('load', () => {
  // Удаляем класс "loading" у body для включения прокрутки
  document.body.classList.remove('loading');

  // Плавно скрываем экран загрузки
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');

  // Полностью удаляем preloader из DOM через задержку, чтобы избежать лишнего контента
  setTimeout(() => {
    preloader.remove();
  }, 1000); // 1000ms должно совпадать с временем в transition
});


window.addEventListener('load', () => {
  console.log('Страница загружена'); // Проверяем, срабатывает ли событие
  document.body.classList.remove('loading');
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
  setTimeout(() => preloader.remove(), 1000);
});

// Максимальное время ожидания
const MAX_LOADING_TIME = 10000; // 10 секунд

setTimeout(() => {
  console.warn('Время загрузки истекло. Убираем прелоадер принудительно.');
  document.body.classList.remove('loading');
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
  setTimeout(() => preloader.remove(), 1000);
}, MAX_LOADING_TIME);
