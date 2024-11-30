import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/authAPI';
import { GoogleLogin } from '@react-oauth/google';
import i18n from '../../i18n';

function GoogleLoginButton({ showMessage }) {
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
                showMessage('success', 'Login', 'Login successfully!');
                navigate(`/${i18n.language}/`);
                window.localStorage.setItem('bottom_nav_number', JSON.stringify(0));
            } else {
                showMessage('warning', 'Login', 'Your email or password is incorrect!');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
}

export default GoogleLoginButton;