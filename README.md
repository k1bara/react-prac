Области хранения данных:

- база данных на json-server
- BFF
- redux store

Сущности приложения

- пользователь: БД (список пользователей), BFF (текущая сессия), стор (отображение в браузере)

- роль пользователя БД (список ролей), BFF (сессия пользователя с ролью). стор (использование на клиенте)

- статьи: БД (список статей), стор (отображение в браузере)

- комментарии: БД (список комментариев), стор (отображение в браузере)

Таблица БД:

- пользователь - users: id / login / password / registed_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарии comments: id / author_id / posts_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для redux-store на клиенте:

- user: id / login / roleId
- posts: массив post: id / title / imageUrl / publushedAt / commentsCount
- post: id / title / imageUrl / content / publushedAt / comments: массив comment: id / author / content / publushedAt
- users: массив user: id / login / registedAt / role
