import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Select, MenuItem } from '@mui/material';

const SearchFilterComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('');
    const [results, setResults] = useState([]);

    // Parse URL parameters on mount to set initial searchQuery and filter values
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q') || '';
        const filterParam = searchParams.get('filter') || '';
        setSearchQuery(q);
        setFilter(filterParam);

        // If there are initial parameters, trigger the search
        if (q || filterParam) {
            handleSearch(q, filterParam);
        }
    }, [location.search]);

    // Function to handle searching
    const handleSearch = async (search = searchQuery, filterVal = filter) => {
        // Update URL with search query and filter
        const params = new URLSearchParams();
        if (search) params.append('q', search);
        if (filterVal) params.append('filter', filterVal);

        // Navigate to update the URL with query params
        navigate(`?${params.toString()}`);

        try {
            const response = await axios.get('/api/products', {
                params: {
                    q: search,
                    filter: filterVal,
                },
            });
            setResults(response.data); // handle results from API
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log('searchQuery: ', searchQuery);

    return (
        <Box sx={{ bgcolor: '#fff' }}>
            {/* Search Input */}
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2, width: '300px' }}
            />

            {/* Filter Dropdown */}
            <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                displayEmpty
                sx={{ mb: 2, ml: 2, width: '150px' }}
            >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="beauty">Beauty</MenuItem>
            </Select>

            {/* Search Button */}
            <Button variant="contained" onClick={() => handleSearch(searchQuery, filter)}>
                Search
            </Button>

            {/* Results Section */}
            <Box sx={{ mt: 4 }}>
                {results.length > 0 ? (
                    results.map((item) => (
                        <Box key={item.id}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </Box>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </Box>
        </Box>
    );
};

export default SearchFilterComponent;
