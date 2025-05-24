# Stage 1: Build 
FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the built App
FROM node:20-slim


WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env ./.env  
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD [ "npm","run","start" ]