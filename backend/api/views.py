import logging
import json
#from django.shortcuts import render
from django.conf import settings
#from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

from stockfish import Stockfish

logger = logging.getLogger(__name__)

@api_view(['POST'])
def best_move(request):
    """
    Compute the best move for a given chess position using Stockfish engine.

    Accepts a POST request with JSON data 
    containing 'fen' (Forsyth–Edwards Notation) and 'elo' (estimated playing strength).
    Returns the best move computed by the Stockfish engine.

    :param request: HTTP request object.
    :return: Response object with JSON data containing the best move.
    """
    try:
        # Extract data from the request
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)
        fen = request_data['fen']
        elo = request_data['elo']

        # Perform the necessary computations
        stockfish = Stockfish(path=settings.ENGINE_PATH,
                              depth=18,
                              parameters={
                                  "UCI_Elo": elo,
                                  "Threads": 2,
                              })
        if not stockfish.is_fen_valid(fen):
            return Response({'error': 'Invalid FEN position'}, status=400)
        stockfish.set_fen_position(fen)
        best_mv = stockfish.get_best_move()

        # Create the response data
        data = {
            'best_move': best_mv
        }

        # Logging statements
        logger.info("Request data: %s", request_data)
        logger.info("Computed best move: %s", best_mv)

        return Response(data, status=200)
    except Exception as erro:
        logger.exception("An error occurred: %s", str(erro))
        return Response({'error': f'An error occurred: {str(erro)}'}, status=500)
