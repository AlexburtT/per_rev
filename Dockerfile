# Базовый образ
FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Установка зависимостей (dev для сборки)
FROM base AS istall
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Сборка приложения
FROM istall AS build
COPY --from=istall /temp/dev/node_modules node_modules
COPY . .
RUN bun run build

# Финальный образ
FROM base AS release
WORKDIR /app

# Копируем только собранную статику
COPY --from=build /usr/src/app/build ./public

# Запускаем сервер для SPA
EXPOSE 3000
USER bun
CMD ["bun", "x", "serve", "--single", "--listen", "tcp://0.0.0.0:3000", "public"]