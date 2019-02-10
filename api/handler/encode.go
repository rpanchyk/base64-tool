package handler

import (
	"base64-tool/api/handler/model"
	"base64-tool/api/proto"
	"base64-tool/api/service"
	"encoding/json"
	"github.com/golang/glog"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func Encode() func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		response := &proto.Response{}

		var request proto.Request
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			glog.Errorf("Error parsing request: %v", err)
			response.Error = err.Error()
		} else {
			in := make(chan string)
			out := make(chan model.Result)

			go encode(in, out)

			in <- request.Value
			result := <-out

			err := result.Error
			if err != nil {
				glog.Errorf("Error encoding: %v", err)
				response.Error = err.Error()
			} else {
				response.Value = result.Value
			}
		}

		if err := json.NewEncoder(w).Encode(&response); err != nil {
			glog.Errorf("Error parsing response: %v", err)
		}
	}
}

// This method is just for demonstration how goroutines and channels work.
func encode(in <-chan string, out chan<- model.Result) {
	encoder := service.Encoder{Value: <-in}

	result := model.Result{}
	result.Value, result.Error = encoder.Encode()

	out <- result
}
