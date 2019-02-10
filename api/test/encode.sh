#!/bin/sh

curl -X POST http://localhost:8080/api/encode \
  -H 'Content-Type: application/json' \
  -d '{
    "value": "test"
}
'
