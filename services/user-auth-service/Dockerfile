FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY packages/shared-core ./packages/shared-core
COPY services/user-auth-service ./services/user-auth-service
RUN npm install
RUN npm run build --workspace=@yumdrop/shared-core
RUN npm run build --workspace=@yumdrop/user-auth-service
EXPOSE 3001
CMD ["npm", "start", "--workspace=@yumdrop/user-auth-service"]
