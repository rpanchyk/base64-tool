#!/bin/sh

curl -X POST http://localhost:8080/api/decode \
  -H 'Content-Type: application/json' \
  -d '{
    "value": "dGVzdA=="
}
'
