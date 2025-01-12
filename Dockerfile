FROM node:23
COPY . .
RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]
