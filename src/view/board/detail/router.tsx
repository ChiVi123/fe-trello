import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const boardDetailRoute: RouteObject = {
    path: 'boards/:boardId',
    Component: lazy(() => import('./page')),
};
