FROM node:20-slim

COPY . /app

WORKDIR /app

RUN corepack enable

RUN  pnpm install --prod --frozen-lockfile

RUN pnpm run build

EXPOSE 8000

CMD [ "pnpm", "start" ]