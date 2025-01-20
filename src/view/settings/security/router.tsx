import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const settingsSecurityRoute: RouteObject = {
    path: 'settings/security',
    Component: lazy(() => import('./page')),
};
