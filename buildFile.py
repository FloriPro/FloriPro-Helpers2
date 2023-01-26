import base64
import json

f = open("fastLoadTemplate.html","r")
ogHtml = f.read()
f.close()

#gen data from filesys.json
f = open("filesys.json","r")
r= f.read()
f.close()
f = open("fileSysDownloaderBig.js","r")
bootDat = f.read()
OGboot = bootDat[:]
f.close()

bootDat = bootDat.replace("""await informationalFetch_Text("filesys.json?v=" + (Math.random() * 1000000));""", "dat.data")
bootDat = bootDat.replace("""//load boot.dat""", "localStorage['boot']=dat.OGboot;")

r={"data":r,"boot":bootDat,"OGboot":OGboot}

data = base64.b64encode(json.dumps(r).encode("utf-8")).decode("utf-8")

f = open("fastLoad.html","w")
f.write(ogHtml.replace("{{ fsdatinsert }}", data))
f.close()