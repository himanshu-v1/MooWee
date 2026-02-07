# Stage 1: Build the Next.js app
FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /moowee

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install
RUN npm clean-install

# Copy all files and build
COPY . .
RUN npm run build

# Stage 2: Run the app in production
FROM node:lts-alpine AS runner

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /moowee/package*.json ./
COPY --from=builder /moowee/node_modules ./node_modules
COPY --from=builder /moowee/.next ./.next
COPY --from=builder /moowee/public ./public
COPY --from=builder /moowee/next.config.ts ./next.config.ts

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
