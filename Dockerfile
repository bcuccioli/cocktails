FROM node:latest

WORKDIR /usr/src/app

# Set up dependencies.
COPY package*.json ./
RUN npm install

# Bundle app source.
COPY . .

EXPOSE 1234

CMD ["npm", "run", "reload"]
