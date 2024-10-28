import { useState } from 'react';

const useValidationWithRef = () => {
    const [state, setState] = useState({
        message: '',
        isValid: true,
    });

    const validateRequired = (input) => {
        if (input === '') {
            setState({
                message: 'This field is required.',
                isValid: false,
            });
            return false;
        }
        setState({ message: '', isValid: true });
        return true;
    };

    const validateName = (input) => {
        const specialCharRegex = /[!@#$%^&*()?":{}|<>`~]/;
        const isValidName = specialCharRegex.test(input.toLowerCase());
        if (input === '') {
            setState({
                message: 'This field is required.',
                isValid: false,
            });
            return false;
        }
        if (isValidName) {
            setState({
                message: 'Not contain number or special characters in Name.',
                isValid: false,
            });
            return false;
        }
        setState({ message: '', isValid: true });
        return true;
    };

    const validateEmail = (input) => {
        if (input === '') {
            setState({
                message: 'Please enter an email address.',
                isValid: false,
            });
            return false;
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isValidEmail = emailRegex.test(input.toLowerCase());
        const isGmail = input.toLowerCase().endsWith('@gmail.com');

        if (!isValidEmail) {
            setState({
                message: 'Invalid email address.',
                isValid: false,
            });
            return false;
        } else if (!isGmail) {
            setState({
                message: 'Email must be a Gmail address.',
                isValid: false,
            });
            return false;
        }

        setState({ message: '', isValid: true });
        return true;
    };

    const validatePassword = (input) => {
        if (input === '') {
            setState({
                message: 'Please enter a password.',
                isValid: false,
            });
            return false;
        }
        if (input.length < 6) {
            setState({
                message: 'Password must be at least 6 characters.',
                isValid: false,
            });
            return false;
        }
        setState({ message: '', isValid: true });
        return true;
    };

    return {
        state,
        validateName,
        validateRequired,
        validateEmail,
        validatePassword,
    };
};

export default useValidationWithRef;
