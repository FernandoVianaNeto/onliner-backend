FROM node:16 as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock .

RUN yarn install

COPY . .

RUN npm run build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main.js"]
