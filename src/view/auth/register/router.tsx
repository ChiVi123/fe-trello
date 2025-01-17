import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const registerRoute: RouteObject = {
    path: 'register',
    Component: lazy(() => import('./page')),
};
