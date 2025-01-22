import { BOARD_INVITATION_STATUS, INVITATION_TYPES } from '~core/constants';
import { IBoardEntity } from '~modules/board/entity';
import { IUserEntity } from '~modules/user/entity';

export interface INotificationEntity {
    _id: string;
    inviterId: string;
    inviteeId: string;

    inviter: IUserEntity;
    invitee: IUserEntity;

    type: INVITATION_TYPES;

    boardInvitation?: {
        boardId: string;
        status: BOARD_INVITATION_STATUS;
    };

    board: IBoardEntity;

    createdAt: number;
    updatedAt: number | null;
    _destroy: boolean;
}
