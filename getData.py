from nba_api.stats.endpoints import leaguedashplayerstats
import pandas

data = leaguedashplayerstats.LeagueDashPlayerStats(season="2018-19").get_data_frames()
df = pandas.DataFrame(data=data[0])
print(list(df))
totals = {"PTS":0, "REB":0, "AST":0, "STL":0, "BLK":0, "TOV":0}
players = {"Total":0}
for index, row in df.iterrows():
    totals["PTS"] += row["PTS"]
    totals["REB"] += row["REB"]
    totals["AST"] += row["AST"]
    totals["STL"] += row["STL"]
    totals["BLK"] += row["BLK"]
    totals["TOV"] += row["TOV"]
# The official point system for an NBA Fantasy League is: PTS(1), REB(1.2), AST(1.5), STL(3), BLK(3), TO(-1)
    pts = row["PTS"] + 1.2*row["REB"] + 1.5*row["AST"] + 3*row["STL"] + 3*row["BLK"] - row["TOV"]
    name = row["PLAYER_NAME"]
    players[name] = pts
    players["Total"] += pts

players = sorted(players.items(), key=lambda kv:kv[1])
players.reverse()
i = 0
for key,value in players:
    print(i, '.',key,':',value)
    i+=1


