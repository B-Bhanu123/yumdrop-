FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY packages/shared-core ./packages/shared-core
COPY services/notification-service ./services/notification-service
RUN npm install
RUN npm run build --workspace=@yumdrop/shared-core
RUN npm run build --workspace=@yumdrop/notification-service
EXPOSE 3005
CMD ["npm", "start", "--workspace=@yumdrop/notification-service"]
