export type CardComment = {
    userId: string;
    userEmail: string;
    userAvatar: string;
    userDisplayName: string;
    content: string;
    commentedAt: number;
};
export interface ICardEntity {
    _id: string;
    boardId: string;
    columnId: string;
    title?: string;
    description?: string | null;
    cover?: string | null;
    memberIds?: string[];
    comments?: CardComment[];
    attachments?: string[];
    FE_PlaceholderCard?: true;
}
