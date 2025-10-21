FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm i --package-lock-only && npm ci --omit=dev
COPY . .
EXPOSE 8000
CMD ["npm", "start"]