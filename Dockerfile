FROM node:18

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY .env .

RUN npm install
RUN npm run build
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
