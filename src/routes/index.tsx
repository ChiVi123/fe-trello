import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from '~components/private-route';
import AuthLayout from '~layouts/auth-layout';
import BoardBarLayout from '~layouts/board-bar-layout';
import { notFoundRoute } from '~view/404/router';
import { loginRoute } from '~view/auth/login/router';
import { registerRoute } from '~view/auth/register/router';
import { accountVerificationRoute } from '~view/auth/verification/router';
import { boardDetailRoute } from '~view/board/detail/router';
import { boardsRoute } from '~view/board/router';

export const browserRouter = createBrowserRouter(
    [
        {
            path: '/',
            Component: PrivateRoute,
            children: [
                {
                    Component: BoardBarLayout,
                    children: [boardsRoute, boardDetailRoute],
                },
            ],
        },
        {
            path: '/',
            Component: AuthLayout,
            children: [loginRoute, registerRoute],
        },
        accountVerificationRoute,
        notFoundRoute,
    ],
    { future: { v7_relativeSplatPath: true } }
);
