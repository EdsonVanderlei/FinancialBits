FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install @nestjs/cli -g
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]