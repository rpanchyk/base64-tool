package handler

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func Encode() func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		responseBytes := []byte("{\"key\":\"value\"}")
		w.Write(responseBytes)
	}
}
