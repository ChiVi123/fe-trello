import { ICardEntity } from '~modules/card/entity';

export interface IColumnEntity extends Record<string, unknown> {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[];
    cards: ICardEntity[];
}
