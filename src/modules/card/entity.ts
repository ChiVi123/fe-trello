export interface ICardEntity {
    _id: string;
    boardId: string;
    columnId: string;
    title?: string;
    description?: string | null;
    cover?: string | null;
    memberIds?: string[];
    comments?: string[];
    attachments?: string[];
    FE_PlaceholderCard?: true;
}
