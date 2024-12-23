import { useState } from 'react';

const useValidation = (initialState) => {
    const [state, setState] = useState({
        value: initialState.value || '',
        message: '',
        isShow: initialState.isShow || false,
    });

    // for field name
    const validateRequired = () => {
        //  trường hợp có kí tự đặc biệt
        // const specialCharRegex = /[!@#$%^&*(),.?":{}|<>`~]/;
        const specialCharRegex = /[!@#$%^&*()?":{}|<>`~]/;

        // not fill information
        if (state.value.trim() === '') {
            setState({
                ...state,
                message: 'This field is required.',
            });
            return false;
        }

        // check if exist specialCharRegex in text field
        if (specialCharRegex.test(state.value)) {
            setState({
                ...state,
                message: 'This field should not contain special characters.',
            });
            return false;
        }

        // Nếu không có vấn đề gì, trả về true
        setState({
            ...state,
            message: '',
        });
        return true;
    };

    const validateEmail = () => {
        if (state.value.trim() === '') {
            // empty
            setState({
                ...state,
                message: 'Please enter an email address.',
            });
            return false;
        } else {
            let validEmail = state.value.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); // @ and .
            if (validEmail) {
                // Additional check for Gmail
                if (state.value.toLowerCase().endsWith('@gmail.com')) {
                    setState({
                        ...state,
                        message: '',
                    });
                    return true;
                } else {
                    setState({
                        ...state,
                        message: 'Must includes @gmail.com in your email',
                    });
                    return false;
                }
            } else {
                setState({
                    ...state,
                    message: 'Invalid email address. Email does not contain special characters',
                });
                return false;
            }
        }
    };

    const validatePassword = () => {
        if (state.value === '') {
            setState({
                ...state,
                message: 'Please enter a password.',
            });
            return false;
        } else if (state.value.length < 6) {
            setState({
                ...state,
                message: 'Password must be at least 6 characters long.',
            });
            return false;
        }
        setState({
            ...state,
            message: '',
        });
        return true;
    };

    const validateConfirmPassword = (password) => {
        const trimmedPassword = String(password).trim();
        const trimmedConfirmPassword = state.value.trim();

        if (trimmedConfirmPassword === '') {
            setState({
                ...state,
                message: 'Please confirm your password.',
            });
            return false;
        } else if (trimmedConfirmPassword !== trimmedPassword) {
            setState({
                ...state,
                message: 'Passwords do not match.',
            });
            return false;
        }

        setState({
            ...state,
            message: '',
        });
        return true;
    };

    const validatePhone = () => {
        if (state.value === '') {
            setState({
                ...state,
                message: 'Vui Lòng Nhập Số Điện Thoại',
            });
            return false;
        } else {
            // Check for exactly 10 digits and no special characters
            let validPhone = state.value.match(/^(0[3|5|7|8|9])[0-9]{8}$/);

            if (validPhone) {
                setState({
                    ...state,
                    message: '',
                });
                return true;
            } else {
                setState({
                    ...state,
                    message: 'Số Điện Chỉ Có 10 Số và Không Chứa Ký Tự Đặc Biệt!',
                });
                return false;
            }
        }
    };

    const validateRequiredWithoutDigits = () => {
        // Allow letters, spaces, and accented characters
        if (/[\d!@#$%^&*()_+={};':"\\|,.<>/?`~]+/.test(state.value)) {
            setState({
                ...state,
                message: 'Không Được Tồn Tại Số Hoặc Kí Tự Đặc Biệt Trong Tên!',
            });
            return false;
        } else if (state.value.trim() === '') {
            setState({
                ...state,
                message: 'This field is required.',
            });
            return false;
        }
        setState({
            ...state,
            message: '',
        });
        return true;
    };

    const handleShow = () => {
        setState({
            ...state,
            isShow: !state.isShow,
        });
    };

    return {
        state,
        setState,
        validateRequired,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        validatePhone,
        validateRequiredWithoutDigits,
        handleShow,
    };
};

export default useValidation;
