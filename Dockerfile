FROM node:22-alpine AS builder
RUN apk upgrade --no-cache
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
RUN apk upgrade --no-cache && apk add --no-cache curl
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.mjs ./server.mjs
EXPOSE 80
CMD ["node", "server.mjs"]
