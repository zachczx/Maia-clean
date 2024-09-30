FROM node:18 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

COPY .env.production .env.production

FROM node:18

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/build /app/build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]
