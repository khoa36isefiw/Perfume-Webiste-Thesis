import { useState } from 'react';

const useValidationWithRef = () => {
    const validateRequired = (input) => {
        if (input === '') {
            return {
                message: 'This field is required.',
                isValid: false,
            };
        }

        return { isValid: true, message: '' };
    };

    const validateName = (input) => {
        const specialCharRegex = /[!@#$%^&*()?":{}|<>`~]/; // check special characters
        const numberRegex = /\d/; // check numbers
        if (input === '') {
            return {
                message: 'This field is required.',
                isValid: false,
            };
        }
        if (specialCharRegex.test(input)) {
            return {
                message: 'Name cannot contain special characters.',
                isValid: false,
            };
        }
        if (numberRegex.test(input)) {
            // exist a number

            return {
                message: 'Name cannot contain numbers.',
                isValid: false,
            };
        }

        return { isValid: true, message: '' };
    };

    const validateEmail = (input) => {
        if (input === '') {
            return {
                message: 'Please enter an email address.',
                isValid: false,
            };
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isValidEmail = emailRegex.test(input.toLowerCase());
        const isGmail = input.toLowerCase().endsWith('@gmail.com');

        if (!isValidEmail) {
            return {
                message: 'Invalid email address.',
                isValid: false,
            };
        } else if (!isGmail) {
            return {
                message: 'Email must be a Gmail address.',
                isValid: false,
            };
        }

        return { isValid: true, message: '' };
    };

    const validatePassword = (input) => {
        if (input === '') {
            return {
                message: 'Please enter a password.',
                isValid: false,
            };
            return false;
        }
        if (input.length < 6) {
            return {
                message: 'Password must be at least 6 characters.',
                isValid: false,
            };
            return false;
        }

        return { isValid: true, message: '' };
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
        validateName,
        validateRequired,
        validateEmail,
        validatePassword,
        validatePhoneNumber,
    };
};

export default useValidationWithRef;
