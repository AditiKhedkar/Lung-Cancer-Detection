# Lung-Cancer-Detection
 So this is a   repository where we'll first manage the backend ,then the frontend .
 Cheers!
## Setup
 - 0) Install Anaconda
 - 1) Get from github, duh!
 - 2) Go to project root and run `conda env create --file environment.yaml`
 - 3) In the terminal enter 'conda activate Lung-Cancer-Detection' in every new terminal session.
 - 4) Change directory to server `cd Backend`
 - 5) Run server with `python server.py`

To train your own model a config file would need to be created and placed in your users folder. This is so pylidc can the dataset for preprocessing.
- Create a file **pylidc.conf** inside C:/Users/Your user name
- Download Dataset from a manifest file
- Paste `[dicom]
  path = PATH_TO_DATASET`
- Run prepareDataset notebook
- Run train notebook