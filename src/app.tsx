import { RouterProvider } from 'react-router-dom';
import { browserRouter } from '~routes';

function App() {
    return <RouterProvider router={browserRouter} future={{ v7_startTransition: true }} />;
}

export default App;
