from multiprocessing.spawn import old_main_modules
import os
import json
import base64
import time
from jsmin import jsmin

with open("programMinify.json") as f:
    tominify = json.loads(f.read())
    f.close()

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
            
            if filename in tominify:
                v2 = jsmin(v2.decode("utf-8")).encode("utf-8")
            #v2 = jsmin(v.decode("utf-8")).encode("utf-8")
        d = base64.b64encode(v2).decode('ascii')
    return d


oldData = {}
ds = os.listdir("programs/")

before = {}

for prog in ds:
    before[prog] = ""
while True:
    for prog in ds:
        if not prog.endswith(".json"):
            pro = "programs/"+prog
            p = path_to_dict("./"+pro+"/")
            if p != before[prog]:
                before[prog] = p
                with open("./"+pro+".json", "w") as f:
                    d = json.dumps(p)
                    f.write(d)
                    f.close()
                print("remade "+pro)
    time.sleep(1)
