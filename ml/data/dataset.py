# This script represent the dataset handling for the NLP LaTeX Parser project
# It includes functions for loading, preprocessing, and managing datasets used in training and evaluation

# Using PyTorch's Dataset and DataLoader classes for handling the dataset

# First, read .tggz file containing dataset
import tarfile

# Open the .tgz file with 'r:gz' mode (read mode with gzip compression)
with tarfile.open("ml/data/data_sample.tgz", "r:gz") as tar:
    # Extract all contents into the specified folder
    tar.extractall(path="ml/data/extracted_data")