from nba_api.stats.endpoints import leaguedashplayerstats
import pandas

data = leaguedashplayerstats.LeagueDashPlayerStats(season="2018-19").get_data_frames()
df = pandas.DataFrame(data=data[0])

# TODO: Create algorithm to assess value of player in Fantasy league/rules.


# In Fantasy NBA, you make a team of 10 players from any teams. Then those players' stats are aggregated for each match
# that your fantasy league has.
# Ex: Team 1:                                        Team 2:
#     Player 1  30   5   6                           Player 1  36   2   3
#     Player 2  12   7   5                           Player 2  32   3   1
#     Player 3  27   1   1                           Player 3  41   0   3
#     Player 4  11   1   2                           Player 4  17   12  6
#     Player 5  5    12  11                          Player 5  22   1   9
#     Player 6  21   4   3                           Player 6  21   11  12
#     Player 7  22   5   6                           Player 7  56   0   1
#     Player 8  51   0   1                           Player 8  31   7   8
#     Player 9  7    14  13                          Player 9  26   4   5
#     Player 10 11   7   9                           Player 10 12   6   13
# --------------------------------------------------------------------------
#     Total:    197  56  57                          Total:    294  46  61
#
# Team 2 wins in categories 1 and 3. Team 1 wins in category 2. Lets assume category 1 has a point value of 1, and
# categories 2 and 3 have a point value of 2. This means that Team 1 has 2 points and Team 2 has 3 points, giving Team 2
# the victory.
#
# So how do we determine the rankings of the players?
# We could calculate how many overall points were contributed by each player with something like:
# Ranking/Category = CategoryPoints * PlayerContribution/TeamValue
# ie for Player 4 of Team 2 for category 3 = 2*6/61 = 0.1967
# ie for Player 9 of Team 1 for category 3 = 0*13/57 = 0
# This would tell us what ratio of the total points earned by either team came from which player. Then we could just sum
# the contributions for each category and rank players from largest to smallest.
# Ex: Team 1:                                        Team 2:
#     Player 1  0   17.85   0  | 17.85               Player 1  12.24   0  9.83   | 22.08
#     Player 2  0   25.00   0  | 25.00               Player 2  10.88   0  3.27   | 14.16
#     Player 3  0   3.57    0  | 3.57                Player 3  13.94   0  9.83   | 23.78
#     Player 4  0   3.57    0  | 3.57                Player 4  5.78    0  19.67  | 25.45
#     Player 5  0   42.85   0  | 42.85               Player 5  7.48    0  29.51  | 36.99
#     Player 6  0   14.28   0  | 14.28               Player 6  7.14    0  39.34  | 46.48
#     Player 7  0   17.85   0  | 17.85               Player 7  19.04   0  3.27   | 22.32
#     Player 8  0   0       0  | 0                   Player 8  10.54   0  26.23  | 36.77
#     Player 9  0   50.00   0  | 50.00               Player 9  8.84    0  16.39  | 25.23
#     Player 10 0   25.00   0  | 25.00               Player 10 4.08    0  42.62  | 46.70
# ------------------------------------------------------------------------------------------
# Using that formula, we can Rank players like:
# 1. Player 9 (Team 1)
# 2. Player 10 (Team 2)
# 3. Player 6 (Team 2)
# 4. ...
#
# The next step is to iterate this ranking over all possible fantasy teams (player combinations) and measure the average
# ranking of the players over all matches. There are 448C20 possible matches (2.83e34) but we could limit our set of
# players to the union of the sets of players in the top 50 of each measured statistic. This should ideally cut our
# player pool to ~150 players which would cut the number of matches to 150C20 = 3.6e24