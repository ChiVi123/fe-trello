import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const homeRoute: RouteObject = {
    path: '',
    Component: lazy(() => import('./page')),
};
