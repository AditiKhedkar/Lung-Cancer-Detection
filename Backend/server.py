import io
import pickle

import jsonpickle as jsonpickle
from flask import  Flask,request,Response
import numpy as np
import preprocessing
import tensorflow as tf
import pydicom
app = Flask(__name__)

encoder = pickle.load(open("label_encoder", 'rb'))
model = tf.keras.models.load_model("./acc89_valacc84-2/")
def inference(img):
    img = tf.image.resize(img.reshape((1,512, 512, 1)), (256, 256))



    output = model.predict(img)
    print(output)


    output = output[0].tolist()
    opclass = encoder.classes_[output.index(max(output))]

    return opclass,output
@app.route('/inference', methods=['POST'])
def test():
    r = request
    # convert string of image data to uint8
    img = pydicom.dcmread(io.BytesIO(r.data))
    #nparr = np.fromstring(r.data, np.uint8)
    # decode image
    #img = Image.open(io.BytesIO(nparr))
    #img = ImageOps.grayscale(img)
    array_image = np.array(img.pixel_array)
    # do some fancy processing here....
    img = preprocessing.preprocess_image(array_image)
    result,output = inference(img)
    # build a response dict to send back to client
    response = {'message': result,
                'confidence':output}
    # encode response using jsonpickle
    response_pickled = jsonpickle.encode(response)


    return Response(response=response_pickled, status=200, mimetype="application/json")


# start flask app
app.run(host="0.0.0.0", port=5000)