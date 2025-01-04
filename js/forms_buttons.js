document.addEventListener("DOMContentLoaded", () => {
  const studentButton = document.getElementById("form_track_button_student");
  const pupilButton = document.getElementById("form_track_button_pupil");
  const yesButton = document.getElementById("form_command_button_yes");
  const noButton = document.getElementById("form_command_button_no");
  const commandNameField = document.getElementById("command_name");
  const form = document.querySelector("form");

  // Функция для управления треками
  function toggleTrackButton(button1, button2) {
    button1.addEventListener("click", () => {
      button1.classList.add("active_button_form");
      button2.classList.remove("active_button_form");
    });
    button2.addEventListener("click", () => {
      button2.classList.add("active_button_form");
      button1.classList.remove("active_button_form");
    });
  }

  // Функция для управления командами
  function toggleCommandButton(yes, no, field) {
    yes.addEventListener("click", () => {
      yes.classList.add("active_button_form");
      no.classList.remove("active_button_form");
      field.classList.remove("hidden");
      field.required = true;
    });

    no.addEventListener("click", () => {
      no.classList.add("active_button_form");
      yes.classList.remove("active_button_form");
      field.classList.add("hidden");
      field.required = false;
      field.value = ""; // Очистка поля
    });
  }

  // Запуск функций
  toggleTrackButton(studentButton, pupilButton);
  toggleCommandButton(yesButton, noButton, commandNameField);

  // Обработка формы и создание XML
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("full_name").value;
    const institution = document.getElementById("institution").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const track = studentButton.classList.contains("active_button_form") ? "студенты" : "школьники";
    const hasCommand = yesButton.classList.contains("active_button_form") ? "да" : "нет";
    const commandName = commandNameField.value || "—";

    const xmlData = `
        <formData>
          <fullName>${fullName}</fullName>
          <institution>${institution}</institution>
          <phone>${phone}</phone>
          <email>${email}</email>
          <track>${track}</track>
          <hasCommand>${hasCommand}</hasCommand>
          <commandName>${commandName}</commandName>
        </formData>
      `;

    // Отправка XML на сервер
    fetch("/save-form-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
      },
      body: xmlData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Данные успешно сохранены!");
        } else {
          alert("Ошибка сохранения данных.");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Ошибка отправки данных.");
      });
  });
});
