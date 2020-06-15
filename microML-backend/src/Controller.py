import json
import logging

import pandas as pd
from flask import Flask, request
from flask_cors import cross_origin

from src import Model

logging.basicConfig(format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
logger = logging.getLogger('Controller')
logger.setLevel(logging.INFO)

app = Flask(__name__)

model = Model.Model()


@app.route('/predict', methods=['POST'])
@cross_origin(origin='*')
def predict():
    raw = request.json
    logger.info("Incoming request", raw)
    series = pd.Series(raw, raw.keys())
    res = model.predict(series)
    print(res)
    return app.response_class(
        response=res.tolist(),
        status=200,
        mimetype='application/json'
    )



@app.route('/', methods=['GET'])
@cross_origin(origin='*')
def health():
    return app.response_class(
        response=json.dumps("OK"),
        status=200,
        mimetype='application/json'
    )


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000")

