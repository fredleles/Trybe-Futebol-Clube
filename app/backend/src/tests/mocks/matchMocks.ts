import Match from '../../database/models/Match';

const matches = [
	{
		"id": 1,
		"homeTeam": 16,
		"homeTeamGoals": 1,
		"awayTeam": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"teamHome": {
			"teamName": "São Paulo"
		},
		"teamAway": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 2,
		"homeTeam": 9,
		"homeTeamGoals": 1,
		"awayTeam": 14,
		"awayTeamGoals": 1,
		"inProgress": true,
		"teamHome": {
			"teamName": "Internacional"
		},
		"teamAway": {
			"teamName": "Santos"
		}
	},
] as Match[];

const inProgressMatches = [
	{
		"id": 2,
		"homeTeam": 9,
		"homeTeamGoals": 1,
		"awayTeam": 14,
		"awayTeamGoals": 1,
		"inProgress": true,
		"teamHome": {
			"teamName": "Internacional"
		},
		"teamAway": {
			"teamName": "Santos"
		}
	},
] as Match[];

const validMatch = {
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
};

const createdMatch = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
} as Match;

const eqTeamsMatch = {
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 16,
  "awayTeamGoals": 2,
  "inProgress": true,
};

const invalidTeamMatch = {
  "homeTeam": 1600,
  "homeTeamGoals": 2,
  "awayTeam": 16,
  "awayTeamGoals": 2,
  "inProgress": true,
};

export default {
  matches,
  inProgressMatches,
  validMatch,
  eqTeamsMatch,
  invalidTeamMatch,
  createdMatch,
};
