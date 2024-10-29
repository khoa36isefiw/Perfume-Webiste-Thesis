import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { paymentAPI } from '../../api/paymentAPI';
import { useNavigate } from 'react-router-dom';
function PayPalButtonsComponents({ user, items }) {
    const navigate = useNavigate();

    const createOrder = async () => {
        try {
            const response = await paymentAPI.createPayPalPayment(user, items);
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
                navigate(`/success?Ref=${paymentId}`);
            } else {
                navigate(`/cancel?Ref=${paymentId}`);
            }
        } catch (error) {
            console.error('Error capturing PayPal order:', error);
            navigate(`/cancel?Ref=${paymentId}`);
        }
    };

    const onCancel = (data) => {
        const paymentId = data.orderID;
        console.log({ paymentId });
        navigate(`/cancel?Ref=${paymentId}`);
    };
    return (
        <PayPalScriptProvider
            options={{
                clientId:
                    'AWFALoikcfNE1uTPNmxLLK5dTXfd0PSKCzNnCZqPasELnbOyVu4ZcRkduQr0_XrEFhwlR-NrukctB9jy',
            }}
        >
            <PayPalButtons
                style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={onCancel}
                onError={(error) => console.error('Error with PayPal button:', error)}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButtonsComponents;
