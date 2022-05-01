FROM node:lts-alpine as builder

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/build/. .

COPY package.json package-lock.json ./

RUN npm install --only=prod --no-optional --ignore-scripts

EXPOSE 3000
CMD ["node", "./index.js"]
