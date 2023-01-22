#!/usr/bin/python
# -*- coding: utf-8 -*-
from simple_websocket_server import WebSocketServer, WebSocket
from colorama import Fore, Back, Style
import json
import traceback
import matplotlib.pyplot as plt
import threading

# set it to some thing like "heap_" to plot the number after "heap_" (e.g. "heap_100" will plot 100)
PLOT = None# "heap_"

if (PLOT != None):
    def startPlot():
        plt.ylabel('Bridge Log')
        plt.show()
    currentHeap = [0, 100]
    t = threading.Thread(target=startPlot, daemon=True)
    t.start()


class Player(WebSocket):
    def handle(self):
        try:
            data = json.loads(self.data)
            d = data["data"]
            if type(json.loads(d)) == str:
                d = json.loads(d)

            # check for plotting
            if (PLOT != None):
                if d.startswith(PLOT):
                    p = int(d.replace(PLOT, ""))
                    plot(p)
                    return

            if data["type"] == "debug":
                print(Back.BLACK+Fore.LIGHTBLACK_EX+d+Fore.RESET+Back.RESET)
            elif data["type"] == "info":
                print(Back.BLACK+Fore.WHITE+d+Fore.RESET+Back.RESET)
            elif data["type"] == "log":
                print(Back.BLACK+Fore.WHITE+d+Fore.RESET+Back.RESET)
            elif data["type"] == "trace":
                print(Back.BLACK+Fore.WHITE+d+Fore.RESET+Back.RESET)
            elif data["type"] == "warn":
                print(Back.BLACK+Fore.YELLOW+d+Fore.RESET+Back.RESET)
            elif data["type"] == "error":
                print(Back.BLACK+Fore.RED+d+Fore.RESET+Back.RESET)
            else:
                print(data["type"])
                print(d)
        except:
            traceback.print_exc()

    def connected(self):
        print(self.address, 'connected')

    def handle_close(self):
        print(self.address, 'closed')


def plot(heap):
    global currentHeap
    currentHeap.append(heap)
    if len(currentHeap) > 200:
        currentHeap.pop(0)
    plt.clf()
    plt.plot(currentHeap)
    plt.show()


server = WebSocketServer('0.0.0.0', 8000, Player)
server.serve_forever()
