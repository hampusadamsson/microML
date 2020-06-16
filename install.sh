#!/usr/bin/env bash

# Build the application with react + flask
rm backend/flaskr/src/templates/* -rf
rm backend/flaskr/src/static/* -rf
npm run build --prefix frontend/
cp frontend/build/* backend/flaskr/src/templates/ -r
mv backend/flaskr/src/templates/static backend/flaskr/src/

echo "DONE"
