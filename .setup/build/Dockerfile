FROM node:latest as development

COPY package*.json ./
COPY yarn.lock .

RUN yarn install

COPY . .

RUN npm run build
