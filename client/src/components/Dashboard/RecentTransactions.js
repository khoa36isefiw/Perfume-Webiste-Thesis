import { Box, Divider } from '@mui/material';
import React from 'react';
import {
    AdminHeadingTypography,
    AdminTypography,
} from '../CustomizeTypography/CustomizeTypography';

const dataTitleTable = ['Name', 'Date', 'Amount', 'Status'];

const listUser = [
    {
        id: 1,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '23',
        status: 1, // Paid
    },
    {
        id: 2,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '13',
        status: 1, // Paid
    },
    {
        id: 3,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '12',
        status: 0, // Pending
    },
    {
        id: 4,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '21',
        status: 0,
    },
    {
        id: 5,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '32',
        status: 0, // Pending
    },
    {
        id: 6,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '69',
        status: 0, // Pending
    },
    {
        id: 7,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '96',
        status: 0,
    },
    {
        id: 8,
        name: 'Luna Kei',
        date: '09/12/2024',
        amount: '23',
        status: 0, // Pending
    },
];

function RecentTransactions() {
    return (
        <Box sx={{ padding: 2, borderRadius: 1, bgcolor: '#fff', border: '1px solid #d5d5d5' }}>
            <AdminHeadingTypography sx={{ fontSize: '24px', mb: 2 }}>
                Recent Transactions
            </AdminHeadingTypography>

            {/* Table Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {dataTitleTable.map((title, index) => (
                    <AdminTypography key={index} sx={{ flex: 1, textAlign: 'center' }}>
                        {title}
                    </AdminTypography>
                ))}
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 1 }} />

            {/* Table Body */}
            <Box sx={{ maxHeight: '270px', overflow: 'scroll' }}>
                {listUser.map((user, index) => (
                    <Box key={user.id}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                                {user.name}
                            </AdminTypography>
                            <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                                {user.date}
                            </AdminTypography>
                            <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                                {user.amount}
                            </AdminTypography>
                            <AdminTypography
                                sx={{
                                    flex: 1,
                                    textAlign: 'center',
                                    bgcolor: user.status === 1 ? '#ddfbe9' : '#f0ed1f87',
                                    borderRadius: 2,
                                    padding: '4px 0',
                                }}
                            >
                                {user.status === 1 ? 'Paid' : 'Pending'}
                            </AdminTypography>
                        </Box>
                        <React.Fragment>
                            {listUser.length - 1 !== index && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default RecentTransactions;
