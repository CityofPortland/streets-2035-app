# In case we want to test with a different mode or environment variables
ARG MODE=production

FROM node:16 AS builder

COPY ./.docker/rootfs /

# Add corporate proxy certificates and tell Node to use them
RUN update-ca-certificates
ENV NODE_EXTRA_CA_CERTS="/etc/ssl/certs/ca-certificates.crt"
# Create directory under root to build from
WORKDIR /app
# Add package install files and run install separately to help with rebuild caching
ADD package*.json ./
RUN npm install
# Add all other files into this directory
ADD . .
# Use NPM to build our application
RUN npm run build --mode ${MODE}

FROM nginx
# Switch to a directory and use as starting directory for following commands and entrypoint
WORKDIR /usr/share/nginx/html
# Clean any existing files from the directory
RUN rm -rf ./*
# Copy built application from previous stage
COPY --from=builder /app/dist .
# Copy in our NGINX configuration file(s)
COPY ./.docker/rootfs /