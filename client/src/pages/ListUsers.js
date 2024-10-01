import React from 'react';
import UserTable from '../components/UserTable/UserTable';
import { Box } from '@mui/material';

const dataTitleTable = ['Name', 'Username', 'Password', 'Address', 'Phone'];
const listUser = [
    {
        id: 1,
        name: 'Luna Kei',
        username: 'luna_keii',
        password: 'password1',
        address: '123 Moon St',
        phone: '123-456-7890',
    },
    {
        id: 2,
        name: 'John Doe',
        username: 'john_doe',
        password: 'password2',
        address: '456 Sun St',
        phone: '234-567-8901',
    },
    {
        id: 3,
        name: 'Alice Smith',
        username: 'alice_smith',
        password: 'password3',
        address: '789 Star Ave',
        phone: '345-678-9012',
    },
    {
        id: 4,
        name: 'Bob Johnson',
        username: 'bob_johnson',
        password: 'password4',
        address: '101 Galaxy Rd',
        phone: '456-789-0123',
    },
    {
        id: 1,
        name: 'Luna Kei',
        username: 'luna_keii',
        password: 'password1',
        address: '123 Moon St',
        phone: '123-456-7890',
    },
    {
        id: 2,
        name: 'John Doe',
        username: 'john_doe',
        password: 'password2',
        address: '456 Sun St',
        phone: '234-567-8901',
    },
    {
        id: 3,
        name: 'Alice Smith',
        username: 'alice_smith',
        password: 'password3',
        address: '789 Star Ave',
        phone: '345-678-9012',
    },
    {
        id: 4,
        name: 'Bob Johnson',
        username: 'bob_johnson',
        password: 'password4',
        address: '101 Galaxy Rd',
        phone: '456-789-0123',
    },
    {
        id: 1,
        name: 'Luna Kei',
        username: 'luna_keii',
        password: 'password1',
        address: '123 Moon St',
        phone: '123-456-7890',
    },
    {
        id: 2,
        name: 'John Doe',
        username: 'john_doe',
        password: 'password2',
        address: '456 Sun St',
        phone: '234-567-8901',
    },
    {
        id: 3,
        name: 'Alice Smith',
        username: 'alice_smith',
        password: 'password3',
        address: '789 Star Ave',
        phone: '345-678-9012',
    },
    {
        id: 4,
        name: 'Bob Johnson',
        username: 'bob_johnson',
        password: 'password4',
        address: '101 Galaxy Rd',
        phone: '456-789-0123',
    },
    {
        id: 1,
        name: 'Luna Kei',
        username: 'luna_keii',
        password: 'password1',
        address: '123 Moon St',
        phone: '123-456-7890',
    },
    {
        id: 2,
        name: 'John Doe',
        username: 'john_doe',
        password: 'password2',
        address: '456 Sun St',
        phone: '234-567-8901',
    },
    {
        id: 3,
        name: 'Alice Smith',
        username: 'alice_smith',
        password: 'password3',
        address: '789 Star Ave',
        phone: '345-678-9012',
    },
    {
        id: 4,
        name: 'Bob Johnson',
        username: 'bob_johnson',
        password: 'password4',
        address: '101 Galaxy Rd',
        phone: '456-789-0123',
    },
];

function ListUsers() {
    return (
        <Box sx={{ height: '100vh' }}>
            <UserTable title="User Management" headers={dataTitleTable} users={listUser} />
        </Box>
    );
}

export default ListUsers;
