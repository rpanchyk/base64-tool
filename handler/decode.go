package handler

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func Decode() func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		responseBytes := []byte("{\"key2\":\"value2\"}")
		w.Write(responseBytes)
	}
}
