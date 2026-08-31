FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY packages/shared-core ./packages/shared-core
COPY services/order-dispatch-service ./services/order-dispatch-service
RUN npm install
RUN npm run build --workspace=@yumdrop/shared-core
RUN npm run build --workspace=@yumdrop/order-dispatch-service
EXPOSE 3003
CMD ["npm", "start", "--workspace=@yumdrop/order-dispatch-service"]
