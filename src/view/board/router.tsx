import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const boardsRoute: RouteObject = {
    path: 'boards',
    Component: lazy(() => import('./page')),
};
