# Makefile

.PHONY: help deps build image

help:
	@echo ""
	@echo "  help: show this help"
	@echo "  deps: get dependencies"
	@echo "  build: build go binary"
	@echo "  image: build docker image"
	@echo ""

deps:
	dep ensure -update

build: test
	go build .

image: build
	docker build -t base64-tool .
