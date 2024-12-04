# Build stage
FROM docker.io/library/node:18.18.2-alpine3.18 AS builder

# Set working directory
WORKDIR /app

# Define build arguments
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Set environment variables for build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Build the application
RUN npm run build

# Production stage
FROM docker.io/library/node:18.18.2-alpine3.18 AS runner
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create public directory if it doesn't exist
RUN mkdir -p ./public

# Expose the port the app runs on
EXPOSE 3000

# Set host to allow connections from outside
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Set runtime environment variables
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Start the application
CMD ["node", "server.js"] 