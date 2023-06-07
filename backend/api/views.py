from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from stockfish import Stockfish

class StockfishAPI(APIView):
    def post(self, request, format=None):
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)

        fen = request_data['fen']
        elo = request_data['elo']
        stockfish = Stockfish(path="/home/dkir/Projects/Chess/backend/engine/stockfish_15.1_linux_x64/stockfish-ubuntu-20.04-x86-64",
                              depth = 18,
                              parameters = {
                                  "UCI_Elo": elo,
                                  "Threads": 2,
                              })
        stockfish.set_fen_position(fen)
        best_move = stockfish.get_best_move()
        data = {
            'best_move': best_move
        }
        return Response(data, status=200)

        
        
        

