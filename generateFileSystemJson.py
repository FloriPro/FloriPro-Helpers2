from multiprocessing.spawn import old_main_modules
import os
import json
import base64
import time
from jsmin import jsmin


def encrypt(text, password):
    out = ""
    for i in range(len(text)):
        out += chr(ord(text[i]) ^ ord(password[i % len(password)]))
    return out


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
            # v2 = jsmin(v.decode("utf-8")).encode("utf-8")
            if "// secure js: " in v2.decode("utf-8"):
                dat = v2.decode("utf-8").split("// secure js: ")
                v2 = dat[0]
                password = dat[1].replace("\n", "").replace(" ", "")
                v2 = encrypt(v2, password).encode("utf-8")

        d = base64.b64encode(v2).decode('ascii')
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
            # json.dump(p, f)
            oldData = p
            print(time.time())
# print(json.dumps(path_to_dict('./c/')))


while True:
    time.sleep(1)
    upadte()
