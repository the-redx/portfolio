FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE 3001
CMD ["yarn", "start"]
