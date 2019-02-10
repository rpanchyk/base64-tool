package model

// Describes returning result of encoder & decoder services for goroutines calls.
type Result struct {
	Value string

	Error error
}
