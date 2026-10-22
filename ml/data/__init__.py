# Initialization file for the data module of the NLP LaTeX Parser project
# It allows the dataset and any other data-related utilities to be imported easily from the ml.data package

# First, read .tggz file containing dataset
import tarfile

# Open the .tgz file with 'r:gz' mode (read mode with gzip compression)
with tarfile.open("ml/data/data_sample.tgz", "r:gz") as tar:
    # Extract all contents into the specified folder
    tar.extractall(path="ml/data/extracted_data")