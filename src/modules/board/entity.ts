import { IColumnEntity } from '~modules/column/entity';

export interface IBoardEntity {
    _id: string;
    title: string;
    description: string;
    type: 'public' | 'private';
    ownerIds: [];
    memberIds: [];
    columnOrderIds: string[];
    columns: IColumnEntity[];
}
