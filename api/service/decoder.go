package service

import "encoding/base64"

type Decoder struct {
	Value string
}

func (e *Decoder) Decode() (string, error) {
	if result, err := base64.StdEncoding.DecodeString(e.Value); err != nil {
		return "", err
	} else {
		return string(result), nil
	}
}
