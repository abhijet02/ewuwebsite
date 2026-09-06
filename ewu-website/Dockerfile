# Stage 1: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public client configuration must be present while Next.js creates its
# browser bundle. Private values belong in the runtime --env-file instead.
ARG NEXT_PUBLIC_GRAPHQL_URL=https://cloud.ewubd.edu/backend/graphql
ARG NEXT_PUBLIC_SERVER_FILE_PATH=https://cloud.ewubd.edu/backend
ARG NEXT_PUBLIC_LOCAL_FILE_PATH=https://cloud.ewubd.edu
ARG NEXT_PUBLIC_SERVER_FILE_PATH_OLD=https://new1.ewubd.edu/api
ARG NEXT_PUBLIC_DOMAIN_NAME=cloud.ewubd.edu
ARG NEXT_PUBLIC_PHONE_NUMBER=+8801755587224
ARG NEXT_PUBLIC_MESSENGER_USER_NAME=myewu
ENV NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL
ENV NEXT_PUBLIC_SERVER_FILE_PATH=$NEXT_PUBLIC_SERVER_FILE_PATH
ENV NEXT_PUBLIC_LOCAL_FILE_PATH=$NEXT_PUBLIC_LOCAL_FILE_PATH
ENV NEXT_PUBLIC_SERVER_FILE_PATH_OLD=$NEXT_PUBLIC_SERVER_FILE_PATH_OLD
ENV NEXT_PUBLIC_DOMAIN_NAME=$NEXT_PUBLIC_DOMAIN_NAME
ENV NEXT_PUBLIC_PHONE_NUMBER=$NEXT_PUBLIC_PHONE_NUMBER
ENV NEXT_PUBLIC_MESSENGER_USER_NAME=$NEXT_PUBLIC_MESSENGER_USER_NAME

# Next.js collects completely anonymous telemetry data about general usage.
# Uncoment the following line to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Stage 3: Production runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Leverage Next.js output standalone feature to minimize image size
# Note: Ensure you have "output: 'standalone'" in your next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose port 3002 for the website configuration
EXPOSE 3002
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
