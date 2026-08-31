FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY packages/shared-core ./packages/shared-core
COPY services/restaurant-catalog-service ./services/restaurant-catalog-service
RUN npm install
RUN npm run build --workspace=@yumdrop/shared-core
RUN npm run build --workspace=@yumdrop/restaurant-catalog-service
EXPOSE 3002
CMD ["npm", "start", "--workspace=@yumdrop/restaurant-catalog-service"]
