import { RouteObject } from 'react-router-dom';
import NotFoundPage from './page';

export const notFoundRoute: RouteObject = {
    path: '*',
    Component: NotFoundPage,
};
