# FROM node:16 as development

# WORKDIR /usr/src/app

# COPY package*.json ./
# COPY yarn.lock .

# RUN yarn install

# COPY . .

# RUN npm run build

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/src/main.js"]


FROM node:16 as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock .

RUN yarn install

COPY . .

RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main.js"]
