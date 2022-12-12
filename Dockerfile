FROM node:18

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY .env .

RUN npm install

COPY . .
RUN npm run build


ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
