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
    const validateSelect = (input) => {
        if (!input || input === '') {
            return {
                message: 'This field is required.',
                isValid: false,
            };
        }
        return {
            isValid: true,
            message: '',
        };
    };

    const validateArray = (input) => {
        if (input.length === 0) {
            return {
                message: 'This field is required.',
                isValid: false,
            };
        }

        return { isValid: true, message: '' };
    };

    const validateNumber = (input) => {
        const isNumber = /^[0-9]+$/.test(input);
        if (!isNumber) {
            return {
                message: 'This field must contain only numbers.',
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
        const startsWithUnderscore = /^_/.test(input); // cant start with _id@gmail.com
        const endsWithUnderscoreBeforeAt = /_@gmail\.com$/.test(input); // can not _@gmail.com

        const startsWithNumber = /^[0-9]/.test(input); // cant start with a number (0 -9)

        if (startsWithNumber) {
            return {
                message: 'Email cannot start with a number.',
                isValid: false,
            };
        }

        if (startsWithUnderscore) {
            return {
                message: 'Email cannot start with an underscore.',
                isValid: false,
            };
        }

        if (endsWithUnderscoreBeforeAt) {
            return {
                message: 'Email cannot contain an underscore directly before the @ symbol.',
                isValid: false,
            };
        }

        if (!isValidEmail) {
            return {
                message: 'Invalid email address.',
                isValid: false,
            };
        }

        if (!isGmail) {
            return {
                message: 'Email must be a @gmail address.',
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
        }
        if (input.length < 6) {
            return {
                message: 'Password must be at least 6 characters.',
                isValid: false,
            };
        }

        return { isValid: true, message: '' };
    };

    const validateConfirmPassword = (input, cPassword) => {
        const trimmedPassword = String(cPassword).trim();
        const trimmedConfirmPassword = input.trim();

        if (input === '') {
            return {
                message: 'Please enter confirm password.',
                isValid: false,
            };
        }
        if (input.length < 6) {
            return {
                message: 'Password must be at least 6 characters.',
                isValid: false,
            };
        }

        if (trimmedConfirmPassword !== trimmedPassword) {
            return {
                isValid: false,
                message: 'Passwords do not match.',
            };
        }

        return {
            isValid: true,
            message: '',
        };
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
        validateConfirmPassword,
        validatePhoneNumber,
        validateNumber,
        validateArray,
        validateSelect,
    };
};

export default useValidationWithRef;
