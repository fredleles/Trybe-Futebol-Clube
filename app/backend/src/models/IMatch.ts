export interface IMatch extends INewMatch {
  teamHome: {
    teamName: string,
  };
  teamAway: {
    teamName: string,
  };
}

export interface INewMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
