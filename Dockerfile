FROM alpine:3.8
MAINTAINER FireTrot <admin@firetrot.com>

WORKDIR /go/src/base64-tool/
RUN apk add -U --no-cache go git dep musl-dev ca-certificates mtr

ENV GOPATH /go
ENV GOOS=linux
ENV GOARCH=amd64

COPY ./ ./

RUN dep ensure
RUN go build .

WORKDIR /usr/local/bin/
RUN cp /go/src/base64-tool/base64-tool .
RUN cp -r /go/src/base64-tool/static static/

EXPOSE 8080

ENTRYPOINT ["/go/src/base64-tool/base64-tool"]
CMD ["-v", "1", "-logtostderr"]
