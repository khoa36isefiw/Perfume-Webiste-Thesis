import { useState } from 'react';

export const useBlur = () => {
    const [formErrors, setFormErrors] = useState({});

    const onHandleBlur = (field, value, onHandleValidate, cPassword = null) => {
        const validationResult =
            cPassword !== null
                ? onHandleValidate(value, cPassword) // for confirm password
                : onHandleValidate(value); // for checking only one field

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: {
                message: validationResult.message,
                status: validationResult.isValid,
            },
        }));
    };

    return {
        formErrors,
        setFormErrors,
        onHandleBlur,
    };
};
