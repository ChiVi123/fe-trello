import { io } from 'socket.io-client';
import { env } from '~config/env';

export const socketIO = io(env.API_BASE_URL);
