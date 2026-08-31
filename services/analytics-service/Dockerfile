FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY packages/shared-core ./packages/shared-core
COPY services/analytics-service ./services/analytics-service
RUN npm install
RUN npm run build --workspace=@yumdrop/shared-core
RUN npm run build --workspace=@yumdrop/analytics-service
EXPOSE 3006
CMD ["npm", "start", "--workspace=@yumdrop/analytics-service"]
