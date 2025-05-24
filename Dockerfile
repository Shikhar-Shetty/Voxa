# Stage 1: Build 
FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci 

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

# Stage 2: Run the built App
FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd openssl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/start.sh ./start.sh
COPY --from=builder /app/prisG/generated/prisma ./prisG/generated/prisma

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]
