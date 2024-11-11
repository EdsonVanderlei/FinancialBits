FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install @angular/cli -g
RUN npm install
EXPOSE 4200
CMD ["npm", "run", "start:docker"]