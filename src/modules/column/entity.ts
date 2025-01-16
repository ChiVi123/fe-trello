import { ICardEntity } from '~modules/card/entity';

export interface IColumnEntity {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[];
    cards: ICardEntity[];
}
