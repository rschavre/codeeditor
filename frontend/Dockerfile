FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite build for production
RUN npm run build

FROM node:18
WORKDIR /app

RUN npm install -g http-server

COPY --from=builder /app/dist /app/dist

EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000"]
