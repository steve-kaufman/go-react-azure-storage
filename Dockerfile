# React App
FROM node:12-slim as reactBuilder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --network-timeout 100000

COPY src ./src
COPY public ./public

# Go Server
FROM golang:1.14 as goBuilder

WORKDIR /go/src/app

COPY api/main.go .

ARG MSG=0

RUN go get -d -v ./...
RUN go install -v ./...

RUN go build

# Run server
FROM node:12-slim

WORKDIR /app

COPY --from=reactBuilder /app .
COPY --from=goBuilder /go/src/app/app ./server

ENV REACT_DIR=/app/build

EXPOSE 8080

COPY run.sh ./run.sh

CMD sh ./run.sh
