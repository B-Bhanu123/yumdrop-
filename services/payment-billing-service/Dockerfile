FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY packages/shared-core ./packages/shared-core
COPY services/payment-billing-service ./services/payment-billing-service
RUN npm install
RUN npm run build --workspace=@yumdrop/shared-core
RUN npm run build --workspace=@yumdrop/payment-billing-service
EXPOSE 3004
CMD ["npm", "start", "--workspace=@yumdrop/payment-billing-service"]
