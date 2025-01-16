import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const boardsRoute: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
};
