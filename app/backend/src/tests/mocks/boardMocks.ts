import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import IBoard from '../../models/IBoard';

const mockTeams = [
  {
    "id": 1,
    "teamName": "Team1"
  },
] as Team[];

const mockMatches = [
	{
		"id": 1,
		"homeTeam": 1,
		"homeTeamGoals": 1,
		"awayTeam": 2,
		"awayTeamGoals": 2,
		"inProgress": false,
		"teamHome": {
			"teamName": "Team1"
		},
		"teamAway": {
			"teamName": "Team2"
		}
	},
	{
		"id": 2,
		"homeTeam": 1,
		"homeTeamGoals": 3,
		"awayTeam": 3,
		"awayTeamGoals": 1,
		"inProgress": false,
		"teamHome": {
			"teamName": "Team1"
		},
		"teamAway": {
			"teamName": "Team3"
		}
	},
	{
		"id": 3,
		"homeTeam": 4,
		"homeTeamGoals": 1,
		"awayTeam": 1,
		"awayTeamGoals": 1,
		"inProgress": false,
		"teamHome": {
			"teamName": "Team4"
		},
		"teamAway": {
			"teamName": "Team1"
		}
	},
] as Match[];

const mockResult = [
  {
    "efficiency": "44.44",
    "goalsBalance": 1,
    "goalsFavor": 5,
    "goalsOwn": 4,
    "name": "Team1",
    "totalDraws": 1,
    "totalGames": 3,
    "totalLosses": 1,
    "totalPoints": 4,
    "totalVictories": 1,
  },
] as IBoard[];

export default {
  mockTeams,
  mockMatches,
  mockResult,
};
