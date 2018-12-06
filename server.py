from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import rank_nba
import os

app = Flask(__name__)
api = Api(app)

class RankPlayers(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mode', type=str)
        parser.add_argument('W', type=str)
        parser.add_argument('L', type=str)
        parser.add_argument('MIN', type=str)
        parser.add_argument('FG_PCT', type=str)
        parser.add_argument('FG3_PCT', type=str)
        parser.add_argument('FT_PCT', type=str)
        parser.add_argument('REB', type=str)
        parser.add_argument('AST', type=str)
        parser.add_argument('TOV', type=str)
        parser.add_argument('BLK', type=str)
        parser.add_argument('STL', type=str)
        parser.add_argument('PTS', type=str)
        args = parser.parse_args()
        return rank_nba.rank_players(args)

class Help(Resource):
    def get(self):
        ret = "Welcome to the NBA Fantasy Calculator API. " \
            "There are only 2 endpoints at: /rankplayers and / (which is the help). "\
            "There are currently two supported modes: 'official' and 'custom'. "\
            "The official mode follows the points allocations for the official NBA Fantasy rules: PTS:1, REB:1.2, AST:1.5, STL:3, BLK:3, TOV:-1. "\
            "The custom mode automatically determines the weightings for the categories based on the following algorithm: "\
            "Weight(category) = Log (Max of all Totals of selected Categories/Total of Category) base 2. "\
            "If the category is detrimental to the outcome of the game, such as TOV, the sign of the weight is flipped. "\
            "Currently, the supported categories include: PTS, STL, BLK, TOV, AST, REB, FT_PCT, FG3_PCT, FG_PCT, MIN, W, L. "\
            "In order to select a category, set the value of the category to '1' in the call, otherwise set to anything else. "\
            "Eg. /rankplayers?mode=custom&TEAM_ID=0&W=0&L=0&MIN=0&FG_PCT=0&FG3_PCT=0&FT_PCT=0&REB=1&AST=1&TOV=1&STL=1&BLK=1&PTS=1"

        return ret


api.add_resource(RankPlayers, '/rankplayers')
api.add_resource(Help, '/')

if __name__ == '__main__':
    app.run(port=5002)