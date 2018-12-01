import json
from nba_api.stats.endpoints import leaguedashplayerstats
import pandas

data = leaguedashplayerstats.LeagueDashPlayerStats(season="2018-19").get_data_frames()
print(data)

