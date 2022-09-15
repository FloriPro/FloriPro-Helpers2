from multiprocessing.spawn import old_main_modules
import os
import json
import base64
import time


def path_to_dict(path):
    if os.path.isdir(path):
        d = {os.path.basename(path): [
            path_to_dict(os.path.join(path, x)) for x in os.listdir(path)]}
    else:
        f = open(path, 'rb')
        #d = {os.path.basename(path): f.read().hex(" ")}
        d = {os.path.basename(path): base64.b64encode(
            f.read()).decode('ascii')}
        f.close()
    return d


oldData = {}


def upadte():
    global oldData
    p = path_to_dict("./")[""]["c"]
    if oldData != p:
        with open("./filesys.json", "w") as f:
            d = json.dumps(p)
            f.write(d)
            f.close()
            #json.dump(p, f)
            oldData = p
            print(time.time())
# print(json.dumps(path_to_dict('./c/')))


while True:
    time.sleep(1)
    upadte()
