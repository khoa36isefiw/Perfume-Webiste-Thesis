import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { paymentAPI } from '../../api/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_METHOD } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
function PayPalButtonsComponents({ user, items, address, email, phoneNumber, promotionCode }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const createOrder = async () => {
        let payload = {
            user,
            items,
            address,
            email,
            phoneNumber,
            method: PAYMENT_METHOD.PAYPAL,
        };

        const promotionCode2 =
            promotionCode?.isApplied === true ? promotionCode.codeApplied.code : null;

        console.log('promotionCode2: ', promotionCode2);
        console.log('Final Payload:', payload);
        try {
            if (address !== '' && email !== '' && phoneNumber !== '') {
                const response = await paymentAPI.createOrder(
                    user,
                    items,
                    address,
                    email,
                    phoneNumber,
                    promotionCode2,
                    PAYMENT_METHOD.PAYPAL,
                );
                return response.data.payRef;
            } else {
                showNotificationMessage('warning', 'Paypal', 'Please fill in all required fields');
            }
        } catch (error) {
            if (error.response) {
                console.error('API Error:', error.response.data);
            } else {
                console.error('Unknown Error:', error.message);
            }
        }
    };

    const onApprove = async (data) => {
        const paymentId = data.orderID;
        try {
            const response = await paymentAPI.capturePayPalPayment(paymentId);
            window.localStorage.setItem('order_id', JSON.stringify(paymentId));
            if (response.data.message === 'Payment successful') {
                navigate(`/${i18n.language}/success?Ref=${paymentId}`);
            } else {
                navigate(`/${i18n.language}/cancel?Ref=${paymentId}`);
            }
        } catch (error) {
            console.error('Error capturing PayPal order:', error);
            navigate(`/${i18n.language}/cancel?Ref=${paymentId}`);
        }
    };

    const onCancel = (data) => {
        const paymentId = data.orderID;
        console.log({ paymentId });
        navigate(`/${i18n.language}/cancel?Ref=${paymentId}`);
    };
    return (
        <PayPalScriptProvider
            options={{
                clientId:
                    'AWFALoikcfNE1uTPNmxLLK5dTXfd0PSKCzNnCZqPasELnbOyVu4ZcRkduQr0_XrEFhwlR-NrukctB9jy',
            }}
        >
            <PayPalButtons
                style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'paypal' }}
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={onCancel}
                onError={(error) => console.error('Error with PayPal button:', error)}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButtonsComponents;
