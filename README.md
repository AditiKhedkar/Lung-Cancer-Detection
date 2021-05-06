# Lung-Cancer-Detection
 So this is a   repository where we'll first manage the backend ,then the frontend .
 Cheers!
## Setup
 - 1) Get from github, duh!
 - 2) Go to project root and run `conda env create --file environment.yaml`
 - 3) Change directory to server `cd Backend`
 - 4) Run server with `python server.py`
 
To train your own model a config file would need to be created and placed in your users folder. This is so pylidc can the dataset for preprocessing.
- Create a file **pylidc.conf** inside C:/Users/Your user name
- Download Dataset from a manifest file
- Paste `[dicom]
  path = PATH_TO_DATASET`
- Run prepareDataset notebook
- Run train notebook 