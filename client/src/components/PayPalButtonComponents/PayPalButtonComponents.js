import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
function PayPalButtonsComponents({
    loggedInAccount,
    listProductInCart,
    paymentMethod,
    promoCodeApplied,
    promoCode,
}) {
    const handleCreateSubscription = () => {
        console.log('create subscription!');
    };

    const finalTotal = () => {
        const subtotal = listProductInCart.reduce(
            (accumulator, product) => accumulator + product.quantity * product.perfumePrice,
            0,
        );

        const calculateDiscount = (subtotal) => subtotal * 0.2; // 20%
        const calculateTax = (subtotal) => subtotal * 0.1; // 10%

        const discount = calculateDiscount(subtotal);
        const tax = calculateTax(subtotal);

        // final total: subtotal - discount + tax
        let finalTotal = subtotal - discount + tax;

        // optional: apply promotion code --> discount 5%
        if (promoCodeApplied && promoCode === 'UTE99') {
            finalTotal *= 0.95; // Apply 5% discount
        }

        // round final total to 2 decimal places
        finalTotal = Math.round(finalTotal * 100) / 100;

        // Check if a payment method is selected
        return finalTotal;
    };

    const getTotalPrice = finalTotal();

    // tiến hành thanh toán
    const handleSubmitOrder = async () => {
        // calculate for subtotal

        const order = {
            orderId: `${new Date().getTime()}`,
            paymentMethod,
            user: {
                name: loggedInAccount?.firstName + ' ' + loggedInAccount?.lastName,
                email: loggedInAccount?.email,
                phone: loggedInAccount?.phoneNumber,
                address: loggedInAccount?.address,
            },
            products: listProductInCart.map((product) => ({
                productId: product.perfumeID,
                name: product.perfumeName,
                image: product.perfumeImage,
                quantity: product.quantity,
                size: product.perfumeSize,
                price: product.quantity * product.perfumePrice,
                brand: product.perfumeBrand,
            })),
            totalPrice: getTotalPrice,
            // add timestamp for when the purchase was made
            timestamp: new Date().toISOString(),
            // test for commenting
            isCommented: false,
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
                        value: getTotalPrice / 30000,
                    },

                    owner: loggedInAccount.userId,

                    totalAmount: getTotalPrice / 30000,
                    paymentMethod: 'Paypal',
                    shippingFee: 'free',
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
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
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
