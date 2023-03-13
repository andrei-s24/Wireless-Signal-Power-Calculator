import re

def parse_profile(file):
    f = file.open()
    data = dict()
    
    manager = None
    for row in f:
        lineAsString = str(row)
        cells = lineAsString.split(',')
        clean_row = []
        for cell in cells:
            clean_cell = re.sub('[^0-9\.]', '', cell)
            clean_row.append(clean_cell)
        data[clean_row[0]] = float(clean_row[1])
    print(data)
    return data