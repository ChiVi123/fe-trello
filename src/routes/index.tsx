import { createBrowserRouter } from 'react-router-dom';
import BoardBarLayout from '~layouts/board-bar-layout';
import { notFoundRoute } from '~view/404/router';
import { boardDetailRoute } from '~view/board/detail/router';
import { boardsRoute } from '~view/board/router';

export const browserRouter = createBrowserRouter(
    [
        {
            path: '/',
            Component: BoardBarLayout,
            children: [boardsRoute, boardDetailRoute],
        },
        notFoundRoute,
    ],
    { future: { v7_relativeSplatPath: true } }
);
