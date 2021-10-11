from datetime import datetime
import json


LOCAL_DIRECTORY = 'C:\\Users\\emili\\OneDrive - Instituto Politecnico Nacional\\Desktop\\savips\\src\\scripts\\data.json'

timestamp = 1545730073
dt_object = datetime.fromtimestamp(timestamp)
print("timestamp =", timestamp)
print("dt_object =", dt_object)
print("---")

from datetime import datetime

# current date and time
now = datetime.now()

timestamp = datetime.timestamp(now)
print("timestamp =", timestamp)


dt_object = datetime.fromtimestamp(timestamp)

print("dt_object =", dt_object)
print("---")

alpha_metric = -0.312313134
with open(LOCAL_DIRECTORY, 'r+') as file:
                file_data = json.load(file)
                file_data['ActualTherapy'][timestamp] = '1.3098178414'
                file.seek(0)
                json.dump(file_data, file, indent=4)