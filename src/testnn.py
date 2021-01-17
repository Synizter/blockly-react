import numpy as np
import random
import time

# nn_arch = [
#     {"input_dim" : 2, "output_dim": 4, "activation" : "relu"},
#     {"input_dim" : 4, "output_dim": 6, "activation" : "relu"},
#     {"input_dim" : 6, "output_dim": 6, "activation" : "relu"},
#     {"input_dim" : 6, "output_dim": 4, "activation" : "relu"},
#     {"input_dim" : 2, "output_dim": 1, "activation" : "sigmoid"}
# ]

nn_arch = [
    {"input_dim" : 2, "output_dim": 1, "activation" : "sig"}, #2 per
]

def init_layers(nn_architecture, seed = None):
    if seed is None:
        print("No random seed generator provided, using current epoch as seed")
        seed = int(time.time())
    np.random.seed(seed)

    number_of_layers = len(nn_architecture)
    params_value = {}

    for idx, layer in enumerate(nn_architecture):
        layer_idx = idx + 1
        layer_input_size = layer["input_dim"]
        layer_output_size = layer["output_dim"]

        params_value['W' + str(layer_idx)] = np.random.randn(layer_output_size, layer_input_size) * 0.1 #random weigth
        params_value['B' + str(layer_idx)] = np.random.randn(layer_output_size, 1) * 0.1 #random bias
        # the value in matrix graph representation
    return params_value

def sigmoid(Z):
    return 1/(1 + np.exp(Z))

def relu(Z):
    return np.maximum(0, Z)

info = init_layers(nn_arch)
