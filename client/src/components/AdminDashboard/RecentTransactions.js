import { Box, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
    AdminHeadingTypography,
    AdminTypography,
} from '../CustomizeTypography/CustomizeTypography';
import useRecentTransation from '../../api/useRecentTransation';
import { formatDate } from '../FormatDate/formatDate';
import { converToVND } from '../convertToVND/convertToVND';
import { mobileScreen } from '../../Theme/Theme';

const dataTitleTable = ['Name', 'Date', 'Amount', 'Status'];

function RecentTransactions() {
    const { data: recentTransactions } = useRecentTransation();
    // console.log('recentTransactions: ', recentTransactions?.data);
    const [transactions, setTransactions] = useState([]);
    //return an array object
    useEffect(() => {
        if (recentTransactions && recentTransactions?.data) {
            const listUsers = recentTransactions?.data?.map((transaction) => {
                return {
                    id: transaction._id,
                    name:
                        transaction.order?.user.firstName + ' ' + transaction.order?.user.lastName,
                    date: transaction.createdAt,
                    amount: transaction.amount,
                    status: transaction.paid,
                };
            });
            setTransactions(listUsers);
        }
    }, [recentTransactions]);

    // console.log('listUsers: ', transactions);
    return (
        <Box sx={{ padding: 2, borderRadius: 1, bgcolor: '#fff', border: '1px solid #d5d5d5' }}>
            <AdminHeadingTypography sx={{ fontSize: '24px', mb: 2 }}>
                Recent Transactions
            </AdminHeadingTypography>

            {/* Table Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {dataTitleTable.length > 0 &&
                    dataTitleTable.map((title, index) => (
                        <AdminTypography key={index} sx={{ flex: 1, textAlign: 'center' }}>
                            {title}
                        </AdminTypography>
                    ))}
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 1 }} />

            {/* Table Body */}
            <Box sx={{ maxHeight: '270px', overflow: 'scroll' }}>
                {transactions.length > 0 &&
                    transactions.map((user, index) => (
                        <Box key={user.id}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                }}
                            >
                                <AdminTypography
                                    sx={{
                                        flex: 1,
                                        textAlign: 'center',
                                        textTransform: 'capitalize',
                                        [mobileScreen]: {
                                            fontSize: '13px',
                                        },
                                    }}
                                >
                                    {user.name}
                                </AdminTypography>
                                <AdminTypography
                                    sx={{
                                        flex: 1,
                                        textAlign: 'center',
                                        [mobileScreen]: {
                                            fontSize: '13px',
                                        },
                                    }}
                                >
                                    {formatDate(user.date)}
                                </AdminTypography>
                                <AdminTypography
                                    sx={{
                                        flex: 1,
                                        textAlign: 'center',
                                        [mobileScreen]: {
                                            fontSize: '13px',
                                        },
                                    }}
                                >
                                    {converToVND(user.amount)}
                                </AdminTypography>
                                <AdminTypography
                                    sx={{
                                        flex: 1,
                                        width: 20,
                                        textAlign: 'center',
                                        bgcolor: user.status === true ? '#ddfbe9' : '#f0ed1f87',
                                        borderRadius: 2,
                                        padding: '4px 0',
                                        [mobileScreen]: {
                                            fontSize: '13px',
                                            padding: '2px 0',
                                        },
                                    }}
                                >
                                    {user.status === true ? 'Paid' : 'Pending'}
                                </AdminTypography>
                            </Box>
                            <React.Fragment>
                                {transactions.length - 1 !== index && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
}

export default RecentTransactions;
