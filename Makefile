# Makefile

all:
	@echo ""
	@echo "  deps: get dependencies"
	@echo "  build: build go binary"
	@echo "  image: build docker image"
	@echo ""

.PHONY: deps build image

deps:
	dep ensure -update

build: test
	go build .

image: build
	docker build -t base64-tool .
