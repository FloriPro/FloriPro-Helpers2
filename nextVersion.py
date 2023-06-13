from datetime import datetime

path = "c/sys/init.js"

readFile = open(path, "r")


def nextVersion(s):
    # return ".".join(s.split(".")[:-1])+"."+str(int(s.split(".")[-1])+1)
    todayVersion = datetime.today().strftime("%Y.%m.%d")
    versionOfToday = -1
    if s.startswith(todayVersion):
        versionOfToday = s.split(".")[-1]
    return todayVersion + "." + str(int(versionOfToday) + 1)


replOut = ""

for line in readFile:
    line = line.replace("\n", "").replace("\r", "")
    if line.startswith("VERSION = '"):
        v = nextVersion(line.replace("VERSION = '", "").replace("';", ""))
        line = "VERSION = '" + v + "';"
        o = open("version", "w")
        o.write(v)
        o.close()
    replOut += line + "\n"

readFile.close()

write_file = open(path, "w")
# overwriting the old file contents with the new/replaced content
write_file.write(replOut)
# close the file
write_file.close()
