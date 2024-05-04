FROM ubuntu:latest
LABEL authors="datta"

FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY . .

FROM base as dev

RUN bun install

EXPOSE 3000

CMD ["bun", "run","index.ts"]

