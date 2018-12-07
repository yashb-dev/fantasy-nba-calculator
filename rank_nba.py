from nba_api.stats.endpoints import leaguedashplayerstats
import pandas
import operator
import math

def rank_players(args = {'mode':'official', 'W':False, 'L':False, 'MIN':False, 'FG_PCT':False, 'FG3_PCT':False, 'FT_PCT':False, 'REB':True, 'AST':True, 'TOV':True, 'STL':True, 'BLK':True, 'PTS':True}):
    # initialize
    data = leaguedashplayerstats.LeagueDashPlayerStats(season="2018-19").get_data_frames()
    df = pandas.DataFrame(data=data[0])
    scores = []
    totals = {}
    if args['mode'] == 'official':
        #init scoring rules
        totals = {'PTS':1,'REB':1.2,'AST':1.5,'STL':3,'BLK':3,'TOV':-1}

        # calculate fantasy score for each player
        for index, row in df.iterrows():
            pts = 0
            for key in totals:
                pts += row[key] * totals[key]
            scores.append(pts)
    elif args['mode'] == 'custom':
        #init scoring rules
        for cat in args:
            if cat not in totals:
                if (cat != 'mode') & (args[cat] == True):
                    totals[cat] = 0
        #calc totals for each category
        for index, row in df.iterrows():
            for k in totals:
                totals[k] += row[k]
        #calculate category weights
        maxcat = max(totals.items(), key=operator.itemgetter(1))[1]
        for key in totals:
            totals[key] /= maxcat
            totals[key] = 1 / totals[key]
            if totals[key] != 1:
                totals[key] = math.log(totals[key], 2)
            if key == 'TOV':
                totals[key] *= -1

        #calculate score
        for index, row in df.iterrows():
            pts = 0
            for k in totals:
                pts += row[k] * totals[k]
            scores.append(pts)
    else:
        return "mode must be set to 'official' or 'custom'"

    #format output
    df["SCORES"] = scores
    df = df.sort_values(by=["SCORES"], ascending=False)
    for col in df:
        if (col != 'PLAYER_NAME') & (col != 'SCORES'):
            df = df.drop(col, axis=1)
    return df.to_json(index=False, orient='table')


if __name__ == '__main__':
    rank_players()
