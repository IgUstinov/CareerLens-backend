# Stage 1: Build
FROM node:20.18.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20.18.0
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY migrate-mongo-config.js ./
RUN npm install --only=production
CMD ["node", "dist/app.js"]
