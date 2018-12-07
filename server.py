from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import rank_nba
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

class RankPlayers(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mode', type=str)
        parser.add_argument('W', type=bool)
        parser.add_argument('L', type=bool)
        parser.add_argument('MIN', type=bool)
        parser.add_argument('FG_PCT', type=bool)
        parser.add_argument('FG3_PCT', type=bool)
        parser.add_argument('FT_PCT', type=bool)
        parser.add_argument('REB', type=bool)
        parser.add_argument('AST', type=bool)
        parser.add_argument('TOV', type=bool)
        parser.add_argument('BLK', type=bool)
        parser.add_argument('STL', type=bool)
        parser.add_argument('PTS', type=bool)
        args = parser.parse_args()
        return rank_nba.rank_players(args)

api.add_resource(RankPlayers, '/rankplayers')

if __name__ == '__main__':
    app.run(port=5002)