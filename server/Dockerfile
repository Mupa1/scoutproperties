# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Enable Yarn
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
COPY tsconfig.json ./

RUN yarn build

# ---------- Runtime stage ----------
FROM node:20-alpine

WORKDIR /app

# Prisma runtime deps
RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy prisma schema BEFORE generating
COPY --from=builder /app/prisma ./prisma

RUN yarn prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["yarn", "start"]
