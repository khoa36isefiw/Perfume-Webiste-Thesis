import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
function PayPalButtonsComponents() {
    const handleCreateSubscription = () => {
        console.log('create subscription!');
    };

    // tiến hành thanh toán
    const handleSubmitOrder = async () => {
        // Check if a payment method is selected

        const order = {
            // owner: user._id,
            // items: cartItems.map((item) => ({
            //     name: item.name,
            //     price: item.price,
            //     quantity: item.quantity,
            //     size: item.size,
            //     images: item.images,
            // })),
            // totalAmount: getTotalPriceVND(),
            // paymentMethod: 'paypal',
            // shippingFee: shippingFreeInVND,
            // status: 'processing',
        };

        console.log('information of order by PAYPAL: ', order);
        // try {
        //     const checkoutOrder = await orderService.createOrder(order);
        //     console.log('checkoutOrder: ', checkoutOrder);
        //     if (checkoutOrder.status === 201) {
        //         // Order paypal thành công
        //         dispatch(removeCart());
        //         console.log('order paypal thành công');
        //         // sau khi order thành công thì phải xóa cart đi

        //         // after 2,5s clicking order button will redirect to '/' Home
        //         // setTimeout(() => {
        //         //     navigate('/');
        //         // }, 2500);
        //         // Check if the selected payment method is Cash On Delivery
        //     }
        // } catch (error) {
        //     console.error('Error during order creation:', error);
        //     // Xử lý lỗi, hiển thị thông báo lỗi, v.v.
        // }
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        // value: getTotalPrice(),
                    },

                    // owner: user._id,

                    // totalAmount: getTotalPrice(),
                    paymentMethod: 'paypal',
                    // shippingFee: shippingFreeInVND,
                    status: 'processing',
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();
        // handleSubmitOrder();
        console.log('order', order);
        console.log('data', data);

        // setShowToast(true);
        // setToastMessage('Thanks so much for your order by PayPal!');
        // setTypeMessage('success');
        // setTimeout(() => {
        //     navigate('/');
        // }, 2500);
    };

    return (
        <div>
            <PayPalButtons
                style={{
                    shape: 'pill',
                    layout: 'vertical',
                    color: 'blue',
                }}
                // createSubscription={handleCreateSubscription}
                // onApprove={(data, actions) => {}}
                // onCrreate={(data, actions) => {}}
                amount="0.01"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"

                // order successfully created
                onSuccess={(details, data) => {
                    alert('Transaction completed by ' + details.payer.name.given_name);

                    // OPTIONAL: Call your server to save the transaction
                    return fetch('/paypal-transaction-complete', {
                        method: 'post',
                        body: JSON.stringify({
                            orderID: data.orderID,
                        }),
                    });
                }}
                // order failed
                onError={() => alert('order failed!')}
            />
        </div>
    );
}

export default PayPalButtonsComponents;
