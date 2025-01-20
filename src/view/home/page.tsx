import { Navigate } from 'react-router-dom';

function HomePage() {
    return <Navigate to='/boards' replace />;
}

export default HomePage;
