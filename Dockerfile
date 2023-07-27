FROM node:16.16.0 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM node:16.16.0 AS API
COPY --from=builder /app /app

ENV MYSQL_USER=
ENV MYSQL_PASSWORD=
ENV MYSQL_HOST=
ENV MYSQL_DATABASE=
ENV MERCADO_PAGO_KEY_PROD=
ENV MERCADO_PAGO_KEY_TEST=
ENV MERCADO_PAGO_CLIENT_ID=
ENV MERCADO_PAGO_CLIENT_SECRET=
ENV JWT_STRING=
ENV NODE_ENV=development
ENV PORT=4007
EXPOSE 4007

CMD [ "node", "/app/dist/server.js" ]