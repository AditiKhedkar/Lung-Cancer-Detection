from configparser import ConfigParser
if __name__ == "__main__":
    config = ConfigParser()
    config['prep_ds'] = {
        'LIDC_DICOM_DIR': './LIDC-IDRI',
        'MASKED_DIR': './data/Masked',
        'CLEAN_DIR': './data/Clean',
        'DB_INDEX': './data/DB_INDEX',
        'MASK_THRESHOLD':  8

    }
    config['pylidc'] = {
        'confidence': 0.5,
        'padding_size':512,

    }

    with open('./lung.conf','w') as f:
        config.write(f)