import tensorflow as tf
import pickle
import preprocessing
import matplotlib.pyplot as plt
#numpy array input 256 x 256
#output string
def inference(img):

    encoder = pickle.load(open("label_encoder",'rb'))
    model = tf.keras.models.load_model("acc89_valacc84-2")

    img = tf.image.resize(img.reshape((1,512, 512, 1)), (256, 256))
    output = model.predict(img)

    print(output)
    output = output[0].tolist()
    opclass = encoder.classes_[output.index(max(output))]
    return opclass




if __name__ == "__main__":
    import PIL.Image as image
    import numpy as np
    from pydicom import dcmread
    from skimage.transform import resize

    img = dcmread("true.dcm").pixel_array

    #img = image.open("Nodule0Slice74.png")

    img = preprocessing.preprocess_image(img)

    op = inference(img)
    print(op)
