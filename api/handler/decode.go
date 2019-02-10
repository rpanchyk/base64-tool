package handler

import (
	"base64-tool/api/proto"
	"base64-tool/api/service"
	"encoding/json"
	"github.com/golang/glog"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func Decode() func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		response := &proto.Response{}

		var request proto.Request
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			glog.Errorf("Error parsing request: %v", err)
			response.Error = err.Error()
		}

		decoder := service.Decoder{Value: request.Value}
		if result, err := decoder.Decode(); err != nil {
			glog.Errorf("Error encoding: %v", err)
			response.Error = err.Error()
		} else {
			response.Value = result
		}

		if err := json.NewEncoder(w).Encode(&response); err != nil {
			glog.Errorf("Error parsing response: %v", err)
		}
	}
}
