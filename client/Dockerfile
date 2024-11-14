FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@18
RUN npm install
EXPOSE 4200
CMD ["ng", "serve", "--configuration", "development", "--host", "0.0.0.0"]