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

    const validatePhoneNumber = (input) => {
        // Kiểm tra chuỗi không rỗng
        if (input.trim() === '') {
            return { isValid: false, message: 'This field is required.' };
        }

        // Kiểm tra bắt đầu bằng 0
        if (!input.startsWith('0')) {
            return {
                isValid: false,
                message: 'Số điện thoại phải bắt đầu bằng 0.',
            };
        }

        // Kiểm tra ký tự thứ 2 phải là 3, 5, 7, 8 hoặc 9
        const validSecondChar = /^[0][35789]/.test(input);
        if (!validSecondChar) {
            return {
                isValid: false,
                message: 'Ký tự thứ 2 phải là 3, 5, 7, 8 hoặc 9.',
            };
        }

        // Kiểm tra độ dài đủ 10 số
        if (input.length !== 10) {
            return {
                isValid: false,
                message: 'Số điện thoại phải có đúng 10 số.',
            };
        }

        // Kiểm tra chỉ chứa số
        const onlyDigits = /^[0-9]+$/.test(input);
        if (!onlyDigits) {
            return {
                isValid: false,
                message: 'Số điện thoại chỉ chứa số.',
            };
        }

        return { isValid: true, message: '' };
    };

    return {
        state,
        validateName,
        validateRequired,
        validateEmail,
        validatePassword,
        validatePhoneNumber,
    };
};

export default useValidationWithRef;
