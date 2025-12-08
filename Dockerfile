FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=build /app/dist/news-widget /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
