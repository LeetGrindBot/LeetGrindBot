FROM node:20-alpine
COPY . .
RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]
