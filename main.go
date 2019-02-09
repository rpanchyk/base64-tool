package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func main() {
	//http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))

	router := httprouter.New()

	router.GET("/", serveIndex)
	router.ServeFiles("/static/*filepath", http.Dir("static"))

	http.ListenAndServe(":8080", router)
}

func serveIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	http.ServeFile(w, r, "static/index.html")
}
