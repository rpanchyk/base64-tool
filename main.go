package main

import (
	"base64-tool/api/handler"
	"github.com/golang/glog"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func main() {
	router := httprouter.New()
	router.GET("/", handler.Index())
	router.POST("/api", handler.Encode())
	router.GET("/api", handler.Decode())

	static := httprouter.New()
	static.ServeFiles("/*filepath", http.Dir("static"))
	router.NotFound = static

	if err := http.ListenAndServe(":8080", router); err != nil {
		glog.Errorf("Error listening for TCP connections: %v", err)
	}
}
