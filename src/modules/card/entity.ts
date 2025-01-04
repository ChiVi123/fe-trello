export interface ICardEntity extends Record<string, unknown> {
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
