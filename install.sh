#!/usr/bin/env bash

# Build the application with react + flask
rm /home/hades/PycharmProjects/alebracompetition/flaskr/src/templates/* -rf
npm run build --prefix /home/hades/program/react/algeeval
cp /home/hades/program/react/algeeval/build/* /home/hades/PycharmProjects/alebracompetition/flaskr/src/templates/ -r

# Upload files that are needed
scp -i ~/program/aws/tsp/tsp-home.pem -r /home/hades/PycharmProjects/alebracompetition/flaskr ec2-user@13.48.243.215:/home/ec2-user
scp -i ~/program/aws/tsp/tsp-home.pem -r /home/hades/PycharmProjects/alebracompetition/resources/problem/medium.tsv ec2-user@13.48.243.215:/home/ec2-user/medium.tsv

# Start the FLASK server (running run.sh)
ssh -i ~/program/aws/tsp/tsp-home.pem ec2-user@13.48.243.215 'exec bash' < /home/hades/PycharmProjects/alebracompetition/run.sh &

echo "DONE"
