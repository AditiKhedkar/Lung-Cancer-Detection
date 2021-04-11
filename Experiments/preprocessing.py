import numpy as np
from scipy.ndimage import median_filter
from sklearn.cluster import KMeans
from skimage import morphology,measure

def preprocess_image(arr):
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
    for region in regions:
        Box = region.bbox
        print(Box)

    targets = []
    for region in regions:
        Box = region.bbox
        if (Box[0] > 40 and Box[2] < 472 and Box[3] < 475 and Box[2] - Box[0] < 475):
            targets.append(region.label)
    mask = np.zeros([512, 512], dtype=np.int8)
    for target in targets:
        mask = mask + np.where(labels == target, 1, 0)

    return mask*arr