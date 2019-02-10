package proto

// Defines a contract for encode & decode response.
type Response struct {
	Value string `json:"value,omitempty"`

	Error string `json:"error,omitempty"`
}
