package handler

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func Index() func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		http.ServeFile(w, r, "static/index.html")
	}
}
