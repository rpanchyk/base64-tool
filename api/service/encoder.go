package service

import "encoding/base64"

type Encoder struct {
	Value string
}

func (e *Encoder) Encode() (string, error) {
	result := base64.StdEncoding.EncodeToString([]byte(e.Value))
	return result, nil
}
