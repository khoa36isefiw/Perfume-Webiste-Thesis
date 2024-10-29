import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, InputAdornment, Stack, TextField, TableCell } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

function AdminCategoriesTable() {
    const [categories, setCategories] = React.useState([
        {
            name: 'unisex',
            parentCategory: '...',
            description: 'test',
            isActive: true,
            _id: 1,
        },
    ]);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const navigate = useNavigate();

    // const fetchCategory = async () => {
    //     const listCategory = 'await categoryService.getAllCategory()';
    //     setCategories(listCategory);
    // };
    // React.useEffect(() => {
    //     fetchCategory();
    // }, []);

    const handleDelete = (cateId) => {
        setSelectedCategoryId(cateId);
        // show pop up to confirm this action
        setShowPopup(true);
    };

    const confirmDelete = async (id) => {
        // call api để xóa
        const respone = 'await categoryService.deleteCategory(id)';
        console.log(respone);
        if (respone.status === 204) {
            setMessage('Xóa category thành công');
            setTypeMessage('success');

            const updatedCategories = categories.filter((category) => category._id !== id);
            setCategories(updatedCategories);
        } else {
            setMessage('Xóa category thất bại');
            setTypeMessage('error');
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
        }, 3000);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleEdit = (id) => {
        navigate(`${id}/edit`);
    };

    return (
        <Box sx={{ height: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Categories</Typography>
                    <Stack spacing={1} direction="row">
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <UploadIcon sx={{ mr: 1 }} />
                            Import
                        </Button>
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <DownloadIcon sx={{ mr: 1 }} />
                            Export
                        </Button>
                    </Stack>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ fontSize: '1.6rem', borderRadius: 2.5, textTransform: 'capitalize' }}
                    component={Link}
                    to="/admin/manage-categories/add"
                >
                    Add
                </Button>
            </Box>
            {/* Search */}
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <TextField
                    placeholder="Search Category"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ height: 25, width: 25 }} />
                            </InputAdornment>
                        ),
                        style: { fontSize: '1.4rem', color: '#000', borderRadius: 8 },
                    }}
                />
            </Paper>
            {/* Table */}
            {/* <ToastMessage message={message} type={typeMessage} /> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Parent Category</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="center">Active</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length > 0 &&
                            categories.map((category, index) => (
                                <TableRow
                                    key={category._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="category">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{category.name}</TableCell>
                                    <TableCell align="left">{category.parentCategory}</TableCell>
                                    <TableCell align="left" sx={{ maxWidth: '400px' }}>
                                        {category.description}
                                    </TableCell>

                                    <TableCell align="center">
                                        {category.isActive ? (
                                            <CheckIcon color="success" fontSize="large" />
                                        ) : (
                                            <CloseIcon color="error" fontSize="large" />
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleDelete(category._id)}>
                                            <DeleteIcon color="error" fontSize="large" />
                                        </IconButton>

                                        <IconButton onClick={() => handleEdit(category._id)}>
                                            <EditNoteIcon color="info" fontSize="large" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default AdminCategoriesTable;
