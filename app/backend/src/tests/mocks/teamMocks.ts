import Team from '../../database/models/Team';

const mockTeams = [
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
] as Team[];

const mockOneTeam = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
} as Team;

export default { mockTeams, mockOneTeam };
