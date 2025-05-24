#!/bin/sh

echo "⏳ Waiting for Postgres to be ready..."

# Wait until Postgres is up
until nc -z postgres 5432; do
  echo "Waiting for database..."
  sleep 2
done

echo "✅ Database is ready!"

npx prisma migrate deploy
npm run start
