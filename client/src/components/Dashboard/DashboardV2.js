import { useEffect, useState } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useUsers from '../../api/useUsers';

const Dashboard = () => {
    const { data: usersData, isLoading } = useUsers();
    const [filter, setFilter] = useState('Last Day'); // Default filter
    const [totalUsers, setTotalUsers] = useState(0); // Filtered total users
    const [percentageChange, setPercentageChange] = useState(0); // Percentage change

    // Filter options
    const filterDate = ['Last Day', 'Last Week', 'Last Month'];

    useEffect(() => {
        if (usersData) {
            const { filteredCount, previousPeriodCount } = calculateUserDataByDate(
                usersData.data,
                filter,
            );
            setTotalUsers(filteredCount);

            // Calculate percentage change
            const change = previousPeriodCount
                ? ((filteredCount - previousPeriodCount) / previousPeriodCount) * 100
                : 0;
            setPercentageChange(change.toFixed(2)); // Rounds to two decimal places
        }
    }, [usersData, filter]);

    // Calculate counts for the selected filter and previous period
    const calculateUserDataByDate = (data, filter) => {
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        const oneMonth = 30 * oneDay;

        let filterDuration, previousDuration;

        // Define filter and previous period durations
        switch (filter) {
            case 'Last Day':
                filterDuration = oneDay;
                previousDuration = oneDay * 2; // Last 2 days to compare today vs yesterday
                break;
            case 'Last Week':
                filterDuration = oneWeek;
                previousDuration = oneWeek * 2; // Last 2 weeks to compare this week vs last week
                break;
            case 'Last Month':
                filterDuration = oneMonth;
                previousDuration = oneMonth * 2; // Last 2 months to compare this month vs last month
                break;
            default:
                filterDuration = oneDay;
                previousDuration = oneDay * 2;
                break;
        }

        const filteredCount = data.filter(
            (item) => new Date(item.createdAt) >= new Date(now - filterDuration),
        ).length;

        const previousPeriodCount = data.filter(
            (item) =>
                new Date(item.createdAt) >= new Date(now - previousDuration) &&
                new Date(item.createdAt) < new Date(now - filterDuration),
        ).length;

        return { filteredCount, previousPeriodCount };
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <Box sx={{ p: 2, mt: 2 }}>
            {/* Filter Dropdown */}
            <Select value={filter} onChange={handleFilterChange} sx={{ mb: 2 }}>
                {filterDate.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>

            {/* Total Users Card */}
            <Box
                sx={{
                    background: 'linear-gradient(270deg,#4eda89,#1a9f53)',
                    height: '200px',
                    width: '100%',
                    borderRadius: '8px',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
                            Total Users
                        </Typography>
                        <Typography sx={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>
                            {totalUsers}
                        </Typography>
                        <Typography sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
                            Percentage Change: {percentageChange}%
                        </Typography>
                    </Box>
                    <AccountCircleIcon sx={{ fontSize: '32px', color: '#89ecb3' }} />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
