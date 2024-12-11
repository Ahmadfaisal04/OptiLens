import sys
import os
import json
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.vgg16 import preprocess_input, VGG16
from tensorflow.keras.models import Model


# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
tf.get_logger().setLevel('ERROR')

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Load the model
model = load_model('src/python/OptiLens.h5')

# Get the image path from Node.js
image_path = sys.argv[1]
# image_path = "src/python/test.jpg" 

# Preprocess the image
image = load_img(image_path, target_size=(128, 128))  # Adjust target size as per your model
image_array = img_to_array(image)
image_array = preprocess_input(image_array)  # Preprocess the image for the specific model
image_array = image_array.reshape((1, *image_array.shape))  # Add batch dimension

# Make prediction
prediction = model.predict(image_array)

# Output the result
print("Hasil : ")
print(json.dumps(prediction.tolist()))