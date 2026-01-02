#!/bin/bash

# Deployment script for Hostinger VPS
# This script can be run manually for deployment

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="${APP_DIR:-/path/to/scoutproperties}"
BRANCH="${BRANCH:-main}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/backups}"

echo -e "${GREEN}Starting deployment...${NC}"

# Navigate to application directory
cd "$APP_DIR" || {
  echo -e "${RED}Error: Application directory not found: $APP_DIR${NC}"
  exit 1
}

# Backup current version
echo -e "${YELLOW}Creating backup...${NC}"
mkdir -p "$BACKUP_DIR"
BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" . --exclude='node_modules' --exclude='dist' --exclude='.git' 2>/dev/null || true

# Pull latest changes
echo -e "${YELLOW}Pulling latest changes from $BRANCH...${NC}"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"

# Server dependencies
if [ -d "server" ]; then
  echo -e "${YELLOW}Installing server dependencies...${NC}"
  cd server
  yarn install --frozen-lockfile --production=false
  yarn build
  cd ..
fi

# Client dependencies
if [ -d "client" ]; then
  echo -e "${YELLOW}Installing client dependencies...${NC}"
  cd client
  yarn install --frozen-lockfile --production=false
  yarn build
  cd ..
fi

# Restart services
echo -e "${YELLOW}Restarting services...${NC}"

# Try PM2 first
if command -v pm2 &> /dev/null; then
  pm2 restart all || pm2 start ecosystem.config.js
  echo -e "${GREEN}Services restarted via PM2${NC}"
# Try Docker Compose
elif command -v docker-compose &> /dev/null || command -v docker &> /dev/null; then
  if [ -f "docker-compose.yml" ]; then
    docker-compose down
    docker-compose up -d --build
    echo -e "${GREEN}Services restarted via Docker Compose${NC}"
  fi
# Try systemd
elif systemctl list-units --type=service | grep -q scoutproperties; then
  systemctl restart scoutproperties
  echo -e "${GREEN}Services restarted via systemd${NC}"
else
  echo -e "${YELLOW}No service manager found. Please restart services manually.${NC}"
fi

# Run database migrations if needed
if [ -d "server/prisma" ]; then
  echo -e "${YELLOW}Running database migrations...${NC}"
  cd server
  yarn prisma generate
  # Uncomment if you want to auto-migrate (be careful in production!)
  # yarn prisma migrate deploy
  cd ..
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Backup saved to: $BACKUP_DIR/$BACKUP_NAME.tar.gz${NC}"

