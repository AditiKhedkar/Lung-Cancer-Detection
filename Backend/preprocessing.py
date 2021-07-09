import numpy as np  #array processing,functions
from scipy.ndimage import median_filter #scientific numpy,has advanced functions
from sklearn.cluster import KMeans #masking lung ,catageorization of data points
from skimage import morphology,measure #for image dilation,lines around lungs being eliminated
import matplotlib.pyplot as plt #graphs
def preprocess_image(arr): #for filtering out lung part
    arr = np.resize(arr,[512,512])
    mean = np.mean(arr)
    std = np.std(arr)
    standardized = (arr - mean) / std
    filtered = median_filter(standardized,size = 3)
    kmeans = KMeans(n_clusters=2).fit(np.reshape(filtered, [np.prod(filtered.shape), 1]))
    centers = sorted(kmeans.cluster_centers_.flatten())
    threshold = np.mean(centers)
    threshed = np.where(filtered < abs(threshold), 1.0, 0.0)
    dialated = morphology.dilation(threshed, np.ones([10, 10]))
    labels = measure.label(dialated)
    #label_vals = np.unique(labels)
    regions = measure.regionprops(labels)
    targets = []
    for region in regions: #bounding box used
        Box = region.bbox
        if (Box[0] > 40 and Box[2] < 472 and Box[3] < 475 and Box[2] - Box[0] < 475):
            targets.append(region.label)
    mask = np.zeros([arr.shape[0], arr.shape[1]], dtype=np.int8)
    for target in targets: #for extracting lung part
        mask = mask + np.where(labels == target, 1, 0)
    masked_img = (mask * arr)
    return masked_img
