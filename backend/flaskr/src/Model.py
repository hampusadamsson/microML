import logging
import sklearn

import pickle

logging.basicConfig(format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
logger = logging.getLogger('ModelSingleton')
logger.setLevel(logging.INFO)

path_to_model = "/home/hades/program/microML/microML-backend/microML-model-manager/models/model-sample-Iris-1592248801.3507187.model"


class Model:
    def __init__(self):
        logger.info("Loading model", path_to_model)
        with open(path_to_model , "rb") as f:
            self.model = pickle.load(f)

    def predict(self, inp):
        return self.model.predict([inp])
