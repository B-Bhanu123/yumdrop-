FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY packages/shared-core ./packages/shared-core
COPY services/api-gateway ./services/api-gateway
RUN npm install
RUN npm run build --workspace=@yumdrop/shared-core
RUN npm run build --workspace=@yumdrop/api-gateway
EXPOSE 3000
CMD ["npm", "start", "--workspace=@yumdrop/api-gateway"]
