#!/bin/bash

# Quick deployment script - minimal version
# Use this if you just want to pull and restart

set -e

APP_DIR="${APP_DIR:-$(pwd)}"
BRANCH="${BRANCH:-main}"

echo "🚀 Quick deployment starting..."

cd "$APP_DIR"

# Pull latest code
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Build
echo "📦 Building application..."
cd server && yarn install && yarn build && cd ..
cd client && yarn install && yarn build && cd ..

# Restart (try different methods)
if command -v pm2 &> /dev/null; then
  pm2 restart all
elif command -v docker-compose &> /dev/null; then
  docker-compose restart
else
  echo "⚠️  Please restart your services manually"
fi

echo "✅ Deployment complete!"

