FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
COPY prisma ./prisma

RUN yarn

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules/.prisma/client/libquery_engine-*.node node_modules/.prisma/client/
COPY --from=builder /usr/src/app/dist/main.js ./

ENTRYPOINT [ "node", "main" ]