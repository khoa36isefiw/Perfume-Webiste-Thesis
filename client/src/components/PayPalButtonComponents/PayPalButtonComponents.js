import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { paymentAPI } from '../../api/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_METHOD } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
function PayPalButtonsComponents({ user, items }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');

    const createOrder = async () => {
        try {
            const response = await paymentAPI.createOrder(user, items, PAYMENT_METHOD.PAYPAL);
            return response.data.payRef;
        } catch (error) {
            console.error('Error creating PayPal order:', error);
            throw new Error('Order creation failed');
        }
    };

    const onApprove = async (data) => {
        const paymentId = data.orderID;
        try {
            const response = await paymentAPI.capturePayPalPayment(paymentId);

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
