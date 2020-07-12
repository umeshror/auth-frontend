### Stage 1: build ###

FROM node:12.0-alpine as builder

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY package.json .
COPY package-lock.json .

# Install app dependencies.
RUN npm install

# Copy app files.
COPY . /app

# Default build configuration.
ARG configuration=production

# Build app
RUN npm run build -- --output-path=./dist/out --configuration $configuration


### Stage 2: delivery ###

FROM nginx:1.15.7-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /app/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
