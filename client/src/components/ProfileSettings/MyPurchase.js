import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';

import useOrderByUser from '../../api/useOrderByUser';

import { OrderSummary } from '../PurchaseComponents/OrderSummary';
import { OrderLists } from '../PurchaseComponents/OrderLists';
import { useTranslation } from 'react-i18next';

function MyPurchase() {
    const { t } = useTranslation('translate');
    const userId = JSON.parse(window.localStorage.getItem('user_data'))?._id || null;
    const { data: orders } = useOrderByUser(userId);

    const filterOrdersList = [
        { filter: 'All Orders', status: 'ALL' },
        { filter: 'Pending', status: 'PENDING_PAYMENT' },
        { filter: 'Paid', status: 'PAID' },
        { filter: 'Cancelled', status: 'CANCELLED' },
    ];

    const [filterOrders, setFilterOrders] = useState({ filter: 'All Orders', status: 'ALL' });
    const filterListOrders =
        filterOrders.status !== filterOrdersList[0]?.status
            ? orders?.data.filter((order) => order.status === filterOrders.status)
            : orders?.data;

    const handleSelectFilterOrders = (filter) => {
        setFilterOrders(filter);
    };

    const totalOrderBasedStatus = (orderStatus) => {
        return orders?.data?.filter((order) => order.status === orderStatus).length;
    };
    const pending = totalOrderBasedStatus('PENDING_PAYMENT');
    const paid = totalOrderBasedStatus('PAID');
    const cancelled = totalOrderBasedStatus('CANCELLED');

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <CustomizeTypography
                    sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: theme.palette.text.secondary,
                    }}
                >
                    {t('common.orderHistory.title')}
                </CustomizeTypography>
            </Grid>
            <Grid item container spacing={2}>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.total.bg}
                        iconColor={theme.palette.orderHistory.total.icon}
                        orderCount={orders?.data.length}
                        orderLabel={t('common.orderHistory.type.k1')}
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.deliveried.bg}
                        iconColor={theme.palette.orderHistory.deliveried.icon}
                        orderCount={pending}
                        orderLabel={t('common.orderHistory.type.k2')}
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.pending.bg}
                        iconColor={theme.palette.orderHistory.pending.icon}
                        orderCount={paid}
                        orderLabel={t('common.orderHistory.type.k3')}
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.cancel.bg}
                        iconColor={theme.palette.orderHistory.cancel.icon}
                        orderCount={cancelled}
                        orderLabel={t('common.orderHistory.type.k4')}
                    />
                </Grid>
            </Grid>
            {/* filter  */}
            <Grid
                item
                container
                spacing={0}
                xs={12}
                sm={12}
                sx={{
                    [mobileScreen]: {
                        paddingLeft: 0,
                    },
                }}
            >
                {filterOrdersList.map((filter, index) => (
                    <Button
                        onClick={() => handleSelectFilterOrders(filter)}
                        key={index}
                        variant={filterOrders?.status === filter.status ? 'contained' : 'outlined'}
                        sx={{
                            margin: 0.5,
                            fontSize: '14px',
                            textTransform: 'initial',
                            mb: 2,
                            borderRadius: 5,
                            color:
                                filter.status === 'ALL'
                                    ? theme.palette.orderHistory.total.icon
                                    : filter.status === 'PENDING_PAYMENT'
                                    ? theme.palette.orderHistory.deliveried.icon
                                    : filter.status === 'PAID'
                                    ? theme.palette.orderHistory.pending.icon
                                    : theme.palette.orderHistory.cancel.icon,

                            fontWeight: 'bold',
                            '&:focus': {
                                bgcolor:
                                    filter.status === 'ALL'
                                        ? theme.palette.orderHistory.total.bg
                                        : filter.status === 'PENDING_PAYMENT'
                                        ? theme.palette.orderHistory.deliveried.bg
                                        : filter.status === 'PAID'
                                        ? theme.palette.orderHistory.pending.bg
                                        : theme.palette.orderHistory.cancel.bg,
                            },
                        }}
                    >
                        {/* {filter.filter} */}
                        {t(`common.orderHistory.filter.${filter.filter}`)}
                    </Button>
                ))}
            </Grid>
            <Grid
                item
                container
                spacing={0}
                xs={12}
                sm={12}
                sx={{
                    [mobileScreen]: {
                        paddingLeft: 0,
                    },
                }}
            >
                <OrderLists orderHistory={filterListOrders} />
            </Grid>
        </Grid>
    );
}

export default MyPurchase;
