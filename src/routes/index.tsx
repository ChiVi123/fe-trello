import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from '~components/private-route';
import AuthLayout from '~layouts/auth-layout';
import BoardBarLayout from '~layouts/board-bar-layout';
import SettingsLayout from '~layouts/settings-layout';
import { notFoundRoute } from '~view/404/router';
import { loginRoute } from '~view/auth/login/router';
import { registerRoute } from '~view/auth/register/router';
import { accountVerificationRoute } from '~view/auth/verification/router';
import { boardDetailRoute } from '~view/board/detail/router';
import { boardsRoute } from '~view/board/router';
import { settingsAccountRoute } from '~view/settings/account/router';
import { settingsSecurityRoute } from '~view/settings/security/router';

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
                {
                    Component: SettingsLayout,
                    children: [settingsAccountRoute, settingsSecurityRoute],
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
