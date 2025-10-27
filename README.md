# Performance Review

Стек технологий:

-   SvelteKit - https://svelte.dev/docs/kit/introduction,
-   Vite - https://vitejs.dev/,
-   TypeScript - https://www.typescriptlang.org/,
-   Bun - https://bun.sh/

## Getting Started

1. Установка Bun - https://bun.sh/blog/bun-v1.3
2. Установка Node.js - https://nodejs.org/en/download/ - (если не установлен v22.20.0(LTS)), может и не понадобится так как используем BUN.
3. Скопировать репозиторий
4. Установить зависимости: bun install
   ⚠️ Не используй npm install или yarn — у нас стек на Bun.

## Developing

Start a development server:

```sh
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

To create a production version of your app:

```sh
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

### Структура

-   Ui - компоненты доступны по ссылке http://localhost:5173/#/ui
