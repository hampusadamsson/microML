#!/usr/bin/env bash

# Stop the server if its running
pkill flask

# Start server - with Problem and database specified
PYTHONPATH=backend/flaskr/ \
FLASK_APP=backend/flaskr/src/Controller.py \
backend/venv/bin/python -m flask run --host=0.0.0.0 --port 5000
