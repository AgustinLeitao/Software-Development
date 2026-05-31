FROM node:20 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --no-fund
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:20-slim AS runtime
WORKDIR /usr/src/app
RUN chown node:node /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

USER node
CMD ["node", "dist/index.js"]
