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
        v2 = v[:]
        if (filename.endswith(".js")):
            v = v.decode("utf-8")
            if "///--remove--" in v:
                v2 = ""
                for x in v.split("\n"):
                    if "///--remove--" not in x:
                        v2 += x+"\n"
                v2 = v2.encode("utf-8")
            #v2 = jsmin(v.decode("utf-8")).encode("utf-8")
        d = base64.b64encode(v2).decode('ascii')
    return d


oldData = {}
ds=[x[0] for x in os.walk("programs")]

for prog in ds[1:]:
    with open("./"+prog+".json", "w") as f:
        p = path_to_dict("./"+prog+"/")
        d = json.dumps(p)
        f.write(d)
        f.close()
