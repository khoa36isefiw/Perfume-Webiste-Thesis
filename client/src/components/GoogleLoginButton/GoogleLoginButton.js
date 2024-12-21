import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/authAPI';
import { GoogleLogin } from '@react-oauth/google';
import i18n from '../../i18n';

import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

function GoogleAuthButton({ isLogin }) {
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const navigate = useNavigate();
    const handleGoogleLogin = async (credentialResponse) => {
        console.log(credentialResponse);
        const { credential } = credentialResponse;
        try {
            const response = await authAPI.googleLogin({ token: credential });
            // Handle success (maybe store user data or navigate to another page)
            console.log('Login successful', response);
            if (response.status === 200) {
                // store all user data in localStorage as a JSON string
                window.localStorage.setItem(
                    'user_data',
                    JSON.stringify({
                        userId: response.data._id,
                        imagePath: response.data.imagePath,
                        email: response.data.email,
                        // Add any other data you want to store
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        role: response.data.role,
                        address: response.data.address,
                    }),
                );
                window.localStorage.setItem('token', response.data.accessToken);

                showNotificationMessage('success', 'Login', 'Login successfully!');
                setTimeout(() => {
                    navigate(`/${i18n.language}`);
                }, 1500);
                window.localStorage.setItem('bottom_nav_number', JSON.stringify(0));
            } else {
                showNotificationMessage('warning', 'Login', 'Your email or password is incorrect!');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <>
            <GoogleLogin
                text={isLogin ? 'signin_with' : 'signup_with'}
                shape="pill"
                onSuccess={handleGoogleLogin}
                onError={() => {
                    showNotificationMessage(
                        'error',
                        isLogin ? 'Login' : 'Sign Up',
                        'Google authentication failed.',
                    );
                }}
            />
        </>
    );
}

export default GoogleAuthButton;
