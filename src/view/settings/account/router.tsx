import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const settingsAccountRoute: RouteObject = {
    path: 'settings/account',
    Component: lazy(() => import('./page')),
};
