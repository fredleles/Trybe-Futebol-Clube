import IBoard from '../models/IBoard';

export default interface ILeaderBoardServices {
  List(type: string) : Promise<IBoard[]>;
}
