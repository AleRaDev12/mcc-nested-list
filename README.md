# Список с вложенными элементами

## Задание

Реализовать приложение с древовидной структурой элементов. Должна быть возможность добавлять/удалять/редактировать
название элементов. Также возможность сброса состояния до начального

## Реализация

Я придумал три варианта реализации этого задания, они отличаются способом хранения данных (и, соответственно, их
обработкой). На данный момент реализованы первые два варианта.

Краткий список оставшихся задач:

1. Реализовать третий вариант
2. Вынести отрисовку компонентов отдельно (так, чтобы все три реализации использовали одни и те же jsx), логику отдельно
3. Оптимизировать код, вынести повторяющиеся участи в отдельные функции
4. Переписать код на TypeScript (написал сначала на JS, т.к. это быстрее)

### Варианты реализаций:

1. Массив элементов без вложенности, каждый из элементов хранит значение своего уровня вложенности.

Пример:

```
[{
    text: 'Text 1',
    level: 1,
},
{
    text: 'Text 1-1',
    level: 2,
},
{
    text: 'Text 1-1-1',
    level: 3,
},
{
    text: 'Text 1-1-2',
    level: 3,
},
{
    text: 'Text 1-2',
    level: 2,
},
{
    text: 'Text 2',
    level: 1,
}]
```

2. Многомерная структура данных из вложенных массивов, которая повторяет структуру элементов списка при их отображении.

Пример:

```
[{
    name: 'Text 1',
    child: [
        {
            text: 'Text 1-1',
            child: [
                {
                    text: 'Text 1-1-1',
                    child: null,
                },
                {
                    text: 'Text 1-1-2',
                    child: null,
                },
            ],
        },
        {
            text: 'Text 1-2',
            child: null,
        },
    ],
},
{
    text: 'Text 2',
    child: null,
}]
```

3. Одномерная структура данных с полями-указателями на родительский элемент.

Пример:

```
[{
    id: 1,
    text: 'Text 1',
    parent: null,
},
{
    id: 2,
    text: 'Text 1-1',
    parent: 1,
},
{
    id: 6,
    text: 'Text 2',
    parent: null,
},
{
    id: 3,
    text: 'Text 1-1-1',
    parent: 2,
},
{
    id: 5,
    text: 'Text 1-2',
    parent: 1,
},
{
    id: 4,
    text: 'Text 1-1-2',
    parent: 2,
}]
```

### Сравнение трёх методов

------------------------------------------------------------------------------------------

|                                                                                    | Первый способ                                                                                                                    | Второй способ                                                                                                                                                           | Третий способ                                                                                                                                                                                                                                                                                                                                         |
|------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Преимущества                                                                       | Максимально простая реализация, высокая скорость работы                                                                          | * Отриосованные DOM элементы действительно вложены друг в друга<br/>* Малый размер JSON файла<br/>* Наглядное представление вложенности данных при просмотре JSON       | * При добавлении нового элемента в любое место в списке, достаточно добавить новый элемент в конец массива и указать id родителя, без необходимости менять местами уже существующие элементы массива<br/>* Для перемещения элемента в массиве достаточно изменить одну переменную (id родителя), он переместится сразу вместе с вложенными элементами |
| Недостатки                                                                         | Для реализации перемещения элементов вместе с вложенными - необходимо выполнить проход по массиву и найти все вложенные элементы | При каждом изменении положения элемента, требуется выполнять рекурсивный поиск. Производительность сравнима с первым вариантом, но такой код сложнее поддерживать.      | * Данные сложно прочитать из JSON<br/>* JSON файл с данными занимает сравнительно больше места                                                                                                                                                                                                                                                        |
| Читаемость данных в сыром (JSON) виде                                              | Все элементы хранятся на одном уровне:<br/>- к наглядности вложенности<br/>+ не требуется широкий экран/горизонтальный скролл    | Элементы вложены так же, как и при выводе списка.<br/>+ удобно оценить уровень вложнности<br/>- удобно до тех пор, пока вложенность не большая                          | Самый неудобный вариант среди прочих, т.к. данные могут быть расположены не в порядке вывода на экран.                                                                                                                                                                                                                                                |
| Простота реализации отрисовки                                                      | Вывод элементов максимально простой: проход по одномерному массиву, добавление стилей для изменения отступов                     | Рекурсивная функция для отрисовки элементов - несколько сложнее первой реализации                                                                                       | Здесь есть несколько вариантов для отрисовки. Самый простой: несколько проходов по массиву с данными, поиск "детей" для каждого элемента                                                                                                                                                                                                              |
| Простота удаления элемента                                                         | Максимально просто. Зная индекс элемента в массиве - можно напрямую его удалить, без перебора элементов массива                  | Сложный рекурсивный поиск элемента. Даже если бы мы хранили id элементов, от рекурсивного поиска не избавиться (если не использовать дополнительный массив для словаря) | Простой поиск id в одномерном массиве                                                                                                                                                                                                                                                                                                                 |
| Объём, необходимый для хранения данных, помимо текста элемента (размер JSON файла) | 1 числовое значение (номер уровня вложенности)                                                                                   | Указатель на вложенный массив (название переменной и пара скобок)                                                                                                       | 2 числовых значения: id собственный и id родителя                                                                                                                                                                                                                                                                                                     |

