- [ ] переместить места для инвалидов
- [x] отрисовать выходы
- [x] компонент формы всплывашки
- [ ] отрисовать спец места
- [ ] сделать ограничение по времени только на день ??
- [x] добавить обязательное поле "Номер машины" в бронь
- [x] добавить в всплывшаку выбор действия Купить или Бронь, написать форму покупки
- [x] toast

API аренды и покупки:

- [ ] СДАЧА В АРЕНДУ (на карте кликаем на свое купленное свободное место, всплывает формы для сдачи в аренду)
    - POST BASE_URL/lease/{place_id}
    - request body: {номер места, timestamp начала и конца аренды, цена_в_час}
    - response
        - 200: выставлено на аренду
            - на бэке: добавляются атрибуты
                1) СДАЕТСЯ_В_АРЕНДУ = true
                2) цена_в_час (int > 0)
            - на фронте на карте на место добавляется символ что оно сдается
        - иначе - ошибка

- [ ] ВЗЯТИЕ В АРЕНДУ (на карте кликаем на свободное место, всплывает форма с выбором для аренды)
    - POST BASE_URL/rent/{place_id}
    - request body: {номер места, id человека, timestamp начала и конца аренды}
    - response
        - 200: успешно взято в аренду
        - на бэке: добавляются атрибуты:
            1) id_арендатора
            2) timestamp начала (который указал арендатор)
            3) timestamp конца (который указал арендатор)
        - на фронте на карте на место добавляется символ, что оно арендовано мной


- [ ] ПОКУПКА ПАРКОВОЧНОГО МЕСТА (на карте кликаем на свободное место, всплывает форма с выбором для покупки)
    - POST BASE_URL/purchase/{place_id}
    - request body: {номер места, id человека}
    - response
        - 200: успешно куплено
        - на бэке: добавляются атрибуты:
            1) id_владельца (того, кто купил)
        - на фронте на карте на место добавляется символ, что оно куплено мной


- [ ] СПИСОК ВСЕХ ПАРКОВОЧНЫХ МЕСТ (данные о всех м/м)
    - GET BASE_URL/parking-spots
    - request body: empty
    - response body
    - 200:
    - АДМИНИСТРАТОР
          - на бэке:
            - список парковочных мест 
            - join данные арендующего/владельца (оттуда нужен номер машины) 
            - join бронь по месту
      - УК
        - на бэке:
          - список парковочных мест
          - join данные арендующего/владельца (оттуда нужен номер машины)
          - join бронь по месту
      - ВЛАДЕЛЕЦ
        - на бэке:
          - список парковочных мест

API получения отчета:

- [ ] сделать создание отчета по датам
- GET BASE_URL/report/{place_id}/{start_date}{end_date}
- request body: empty
    - response
        - 200:{список сущностей БРОНЬ, где id_парковочного места = place_id
            - на фронте формируется таблица
        - 404: place_id не найден
        - 400: другая ошибка
 