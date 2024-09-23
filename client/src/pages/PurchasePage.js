import React from 'react';
import MyPurchase from '../components/ProfileSettings/MyPurchase';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import EmptyOrders from '../components/EmptyOrders/EmptyOrders';

const PurchasePage = () => {
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    const orderHistory = useSelector(
        // get for each user
        (state) => state.checkoutManagement.listOrders[loggedInAccount?.userId] || [],
    );
    return <Box>{orderHistory.length > 0 ? <MyPurchase /> : <EmptyOrders />}</Box>;
};

export default PurchasePage;
