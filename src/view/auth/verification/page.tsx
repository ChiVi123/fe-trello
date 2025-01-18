import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import PageLoadingSpinner from '~components/page-loading-spinner';
import { verifyUserAPI } from '~modules/user/repository';

function AccountVerificationPage() {
    const [verified, setVerified] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    const { email, token } = Object.fromEntries([...searchParams]);

    useEffect(() => {
        if (!email || !token) return;
        const controller = new AbortController();
        verifyUserAPI({ email, token }, controller.signal).then(() => setVerified(true));

        return () => {
            controller.abort();
        };
    }, [email, token]);

    if (!email || !token) {
        return <Navigate to='/404' />;
    }

    if (!verified) {
        return <PageLoadingSpinner caption='Verifying your account...' />;
    }

    return <Navigate to={`/login?verifiedEmail=${email}`} />;
}

export default AccountVerificationPage;
