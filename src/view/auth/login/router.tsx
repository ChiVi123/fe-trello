import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const loginRoute: RouteObject = {
    path: 'login',
    Component: lazy(() => import('./page')),
};
