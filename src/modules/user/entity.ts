enum USER_ROLE {
    CLIENT = 'client',
    ADMIN = 'admin',
}

export interface IUserEntity {
    email: string;
    password: string;
    username: string;
    displayName: string;
    avatar: string;

    role: USER_ROLE;

    isActive: boolean;
    verifyToken?: string | undefined;

    accessToken?: string;
    refreshToken?: string;

    createdAt: number;
    updatedAt: number | null;
    _destroy: boolean;
}
