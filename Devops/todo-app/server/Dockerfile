FROM node:20 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20 AS runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
RUN npm install --production
EXPOSE 4000
CMD ["node", "dist/index.js"]
