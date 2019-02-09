package main

import (
	"base64-tool/handler"
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

	port := "8080"
	if err := http.ListenAndServe(":"+port, router); err != nil {
		glog.Errorf("Error listening for TCP connections on port %s: %v", port, err)
	}
}
