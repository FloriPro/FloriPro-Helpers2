from multiprocessing.spawn import old_main_modules
import os
import json
import base64
import time
from jsmin import jsmin


def path_to_dict(path):
    if os.path.isdir(path):
        # os.listdir(path)
        d = {}
        for x in os.listdir(path):
            s = path_to_dict(os.path.join(path, x))
            d[x] = s

    else:
        f = open(path, 'rb')
        v = f.read()
        f.close()

        filename = path.replace("\\", "/").split("/")[-1]
        if (filename.endswith(".js")):
            #v = jsmin(v.decode("utf-8")).encode("utf-8")
            pass

        d = base64.b64encode(v).decode('ascii')
    return d


oldData = {}


def upadte():
    global oldData
    p = path_to_dict("./c/")
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
