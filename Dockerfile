# React App
FROM node:12-slim as reactBuilder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --network-timeout 100000

COPY src ./src
COPY public ./public

RUN yarn build

# Go Server
FROM golang:alpine as goBuilder

WORKDIR /go/src/app

RUN apk update && apk add git

COPY api/main.go .

RUN go get -d -v ./...
RUN go install -v ./...

RUN go build

# Run server
FROM alpine:latest

WORKDIR /app

COPY --from=reactBuilder /app/build ./public
COPY --from=goBuilder /go/src/app/app ./server

ENV REACT_DIR=/app/public

EXPOSE 8080

# COPY run.sh ./run.sh

RUN ["chmod", "+x", "./server"]

CMD ["./server"]
