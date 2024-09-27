import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 70 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'password',
        label: 'Password',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'left',
        format: (value) => `${value.street}, ${value.city}`,
    },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 70,
        align: 'left',
    },
    { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' }, // New column for actions
];

// Component to render the table with dynamic data
export default function UserTable() {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]); // Dynamic user data
    const [searchTerm, setSearchTerm] = React.useState(''); // Search term state

    // Fetch the data from an API
    React.useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(
                'https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users',
            );
            const data = await response.json();
            setRows(data); // Update the state with fetched data
        };

        fetchUserData();
    }, []);

    // Handle page change for pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    // Handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Filter rows based on search term
    const filteredRows = rows.filter(
        (row) =>
            row.name.toLowerCase().includes(searchTerm) ||
            row.email.toLowerCase().includes(searchTerm),
    );

    // Handle edit action (you can implement your own logic for editing)
    const handleEdit = (id) => {
        navigate(`/admin/manage-users/${id}`);
    };

    // Handle delete action (with API interaction)
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');

        if (confirmed) {
            try {
                const response = await fetch(
                    `https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users/${id}`,
                    {
                        method: 'DELETE',
                    },
                );

                if (response.ok) {
                    // Remove the user from the state
                    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
                    alert(`User with ID: ${id} has been deleted.`);
                } else {
                    alert('Failed to delete user.');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('An error occurred while deleting the user.');
            }
        }
    };

    // Handle navigation to the "Add User" page
    const handleAddUser = () => {
        navigate('/admin/manage-users/add-user');
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
            {/* Search Bar */}
            <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                <strong>Search</strong> by Name or Email
            </AdminTypography>
            <TextField
                placeholder="Search by Name or Email"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                onChange={handleSearch}
                value={searchTerm}
            />
            <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={handleAddUser}
            >
                Add User
            </Button>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{}}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{
                                        bgcolor: blue[200],
                                        fontSize: '13px',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{ fontSize: '13px' }}
                                            >
                                                {/* Render avatar if the column is 'avatar', otherwise display text */}
                                                {column.id === 'avatar' ? (
                                                    <Avatar
                                                        alt={row.name}
                                                        src={row.avatar}
                                                        sx={{ height: '56px', width: '56px' }}
                                                    />
                                                ) : column.id === 'actions' ? (
                                                    // Render Edit and Delete buttons in the 'actions' column
                                                    <>
                                                        <IconButton
                                                            onClick={() => handleEdit(row.id)}
                                                            color="primary"
                                                        >
                                                            <EditIcon sx={{ fontSize: '18px' }} />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(row.id)}
                                                            color="secondary"
                                                        >
                                                            <DeleteIcon sx={{ fontSize: '18px' }} />
                                                        </IconButton>
                                                    </>
                                                ) : column.format && typeof value === 'object' ? (
                                                    column.format(value)
                                                ) : (
                                                    value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    '.MuiTablePagination-selectLabel': {
                        fontSize: '13px',
                    },
                    '.MuiTablePagination-select': {
                        fontSize: '13px',
                        mt: 1,
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '13px',
                    },

                    '.MuiSvgIcon-root': { fontSize: '14px' },
                    '.MuiSelect-icon': {
                        fontSize: '24px',
                    },

                    // next and previous button
                    '.MuiSvgIcon-root': {
                        fontSize: '24px',
                    },
                }}
            />
        </Paper>
    );
}
