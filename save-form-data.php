<?php
// Получение данных из POST-запроса
$xmlData = file_get_contents('php://input');

// Сохранение данных в XML-файл
$file = 'form-data.xml';
if (file_put_contents($file, $xmlData)) {
    http_response_code(200);
    echo "Данные успешно сохранены!";
} else {
    http_response_code(500);
    echo "Ошибка сохранения данных.";
}
?>
