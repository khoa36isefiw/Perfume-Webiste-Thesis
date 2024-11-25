import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { paymentAPI } from '../../api/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_METHOD } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
function PayPalButtonsComponents({ user, items, promotionCode }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');

    const createOrder = async () => {
        let payload = {
            user,
            items,
            method: PAYMENT_METHOD.PAYPAL,
        };

        // if (promotionCode2 !== null) {
        //     payload.promotionCode = promotionCode2;
        // }
        const promotionCode2 =
            promotionCode?.isApplied === true ? promotionCode.codeApplied.code : null;

        console.log('promotionCode2: ', promotionCode2);
        console.log('Final Payload:', payload);
        try {
            const response = await paymentAPI.createOrder(
                user,
                items,
                promotionCode2,
                PAYMENT_METHOD.PAYPAL,
            );

            return response.data.payRef;
            // } catch (error) {
            //     console.error('Error creating PayPal order:', error);
            //     throw new Error('Order creation failed');
            // }
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
