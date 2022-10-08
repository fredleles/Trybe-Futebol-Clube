import { IMatch, INewMatch } from '../models/IMatch';

export default interface IMatchServices {
  List(filters: object) : Promise<IMatch[] | []>;
  ListByProgress(queryInProgress: string) : Promise<IMatch[] | []>;
  Create(match: INewMatch, token: string | undefined) : Promise<IMatch>;
  GetById(id: number) : Promise<IMatch>;
  Update(id: number, data : object, token: string | undefined) : Promise<[number, IMatch[]]>;
}
