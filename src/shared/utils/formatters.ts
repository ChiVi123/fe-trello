import { ICardEntity } from '~modules/card/entity';
import { IColumnEntity } from '~modules/column/entity';

export const capitalizeFirstLetter = (val: string | undefined | null) => {
    if (!val) return '';
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
export const generatePlaceholderCard = (column: IColumnEntity): ICardEntity => ({
    _id: column._id + '-placeholder-card',
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
});
