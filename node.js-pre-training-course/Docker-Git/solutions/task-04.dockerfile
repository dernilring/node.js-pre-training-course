FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm install --omit=dev
CMD ["node", "server.js"]