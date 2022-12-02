#!/usr/bin/python
# -*- coding: utf-8 -*-
from simple_websocket_server import WebSocketServer, WebSocket
from colorama import Fore, Back, Style
import json
import traceback


class Player(WebSocket):
    def handle(self):
        try:
            data = json.loads(self.data)
            d = data["data"]
            if type(json.loads(d)) == str:
                d = json.loads(d)
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


server = WebSocketServer('0.0.0.0', 8000, Player)
server.serve_forever()
