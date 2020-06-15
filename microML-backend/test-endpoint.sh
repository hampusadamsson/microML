#!/usr/bin/env bash

curl --location --request POST '127.0.0.1:5000/predict' \
--silent \
--header 'Content-Type: application/json' \
--data-raw '{
    "sl": 4.7,
    "sw": 3.2,
    "pl": 11.3,
    "pw": 10.2
}'