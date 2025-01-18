import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const accountVerificationRoute: RouteObject = {
    path: 'account/verification',
    Component: lazy(() => import('./page')),
};
