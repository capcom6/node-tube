# NodeTube

Example project from ["Bootstrapping Microservices with Docker, Kubernetes, and Terraform"](https://www.manning.com/books/bootstrapping-microservices-with-docker-kubernetes-and-terraform) book.

Based on Node.js + Express.

## Microservices

At this moment (incomplete) project consists of 3 microservices and database:

1. Video streaming service. Gets video id from query param, search for video path in *database*, get video stream from *video storage* service and return to client.
2. Video storage service. Uses Azure Blob storage for videos storage and returns stream by path for *video streaming* service.
3. History service. *Incomplete*.
4. MongoDB for storing data.

## Requirements

* docker
* docker-compose

### Optional

* make

## How to start?

Use `make up` and `make down` to start and stop containers.

Use `make dev` for development with support of live reload by nodemon.

## See also

* Go + Fiber version: https://github.com/capcom6/go-tube
* Python + Flask version: https://github.com/capcom6/py-tube
