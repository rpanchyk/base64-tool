package main

import (
	"github.com/golang/glog"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func main() {
	router := httprouter.New()

	// UI
	router.GET("/", serveIndex)
	router.ServeFiles("/static/*filepath", http.Dir("static"))
	// API
	router.POST("/api", serveEncode)
	router.GET("/api", serveDecode)

	if err := http.ListenAndServe(":8080", router); err != nil {
		glog.Errorf("Error listening for TCP connections", err)
	}
}

func serveIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	http.ServeFile(w, r, "static/index.html")
}

func serveEncode(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	responseBytes := []byte("{\"key\":\"value\"}")
	w.Write(responseBytes)
}

func serveDecode(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	responseBytes := []byte("{\"key\":\"value\"}")
	w.Write(responseBytes)
}
