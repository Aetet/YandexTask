YandexTask
==========
Тестовое задание.

##Задание 1.
1. Реализация модуля, который разбирает query-строку находится в файле [QueryParser.js](https://github.com/Aetet/YandexTask/blob/master/src/QueryString/QueryParser.js). Он может использоваться как браузером так и на сервере.

2. Система сравнения двух параметров форм состоит из нескольких частей.
  1. HTML-форма с двумя полями. В них мы вводим входную queryString. [index.html](https://github.com/Aetet/YandexTask/blob/master/src/QueryString/index.html)
  2. QueryParser. Он парсит входную строку параметров и создает из нее объект. Подробнее в задании 1.
  3. Затем мы выводим JSON с различиями между объектами.

3. Реализация модуля, который десериализует объект в query-string находится в файле [queryStringBuilder.js](https://github.com/Aetet/YandexTask/blob/master/src/QueryString/queryStringBuilder.js) 
4. Система показа презентации находится в [следующем репозитории](https://github.com/Aetet/presentation)
5. https://github.com/Aetet
 
##Задание 2.
Реализация второго задания находится [здесь](https://github.com/Aetet/YandexTask/tree/master/src/XSL)

В проекте использован Grunt для удобства разработки и тестирования. Также прогоняются Unit-тесты для модулей из задания 1.
