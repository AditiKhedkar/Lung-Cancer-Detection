import tensorflow as tf
import numpy as np
def getFile(orignal_image,label):
    img = np.load(orignal_image)
    return img,label
