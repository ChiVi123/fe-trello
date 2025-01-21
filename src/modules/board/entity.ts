import { IColumnEntity } from '~modules/column/entity';
import { IUserEntity } from '~modules/user/entity';

export interface IBoardEntity {
    _id: string;
    title: string;
    description: string;
    type: 'public' | 'private';
    ownerIds: string[];
    memberIds: string[];
    owners: IUserEntity[];
    members: IUserEntity[];
    FE_all_users: IUserEntity[];
    columnOrderIds: string[];
    columns: IColumnEntity[];
}
