import tensorflow as tf
import numpy as np
def getFile(path):
    img = np.load(path)
    return img
