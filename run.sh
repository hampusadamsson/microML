#!/usr/bin/env bash

# Stop the server if its running
pkill flask

# Start server - with Problem and database specified
PYTHONPATH=/home/ec2-user/flaskr/ \
FLASK_APP=/home/ec2-user/flaskr/src/application.py \
PROBLEM_PATH=/home/ec2-user/medium.tsv \
DB_PATH=/home/ec2-user/database4.db \
flask run --host=0.0.0.0 --port 3000
