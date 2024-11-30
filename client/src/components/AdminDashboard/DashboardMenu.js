import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { theme } from '../../Theme/Theme';
import { backTop } from '../goBackTop/goBackTop';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import RestoreIcon from '@mui/icons-material/Restore';
import { adminAPI } from '../../api/adminAPI';

const filterDate = ['Last Day', 'Last Week', 'Last Month', 'Last Year'];

export default function DashboardMenu({ id, color, setTimeFrame }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectStatictis = async (date) => {
        console.log('id: ', id);
        try {
            const timeframeMap = {
                'Last Month': 'month',
                'Last Day': 'day',
                'Last Week': 'week',
            };
            const timeFrame = timeframeMap[date] || 'week';
            console.log('timeFrame: ', timeFrame);

            const userResponse = await adminAPI.statisticUser(timeFrame);
            if (userResponse.status === 200) {
                console.log('userResponse: ', userResponse);
                // setListData(userResponse.data);
            } else {
                console.error('Failed to fetch user statistics');
            }

            setTimeFrame(timeFrame);
            backTop();
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setAnchorEl(null);
        }
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip
                    title={
                        <AdminTypography sx={{ fontSize: '13px', mb: 0 }}>
                            Filter By Day
                        </AdminTypography>
                    }
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                        onClick={handleClick}
                    >
                        <MoreVertIcon size="small" sx={{ fontSize: '24px', color }} />
                    </Box>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-labelledby="filter-by-day-menu"
                sx={{
                    '& .MuiPaper-root': {
                        bgcolor: 'white',
                        minWidth: '100px',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&::before': {
                            content: '""',
                            bgcolor: 'white',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                {filterDate.map((date, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleSelectStatictis(date)}
                        sx={{
                            mx: '2px',
                            '&:hover': {
                                color: 'text.primary',
                                bgcolor: '#d9d9d9',
                                borderRadius: 2,
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <ListItemIcon>
                                <RestoreIcon fontSize="large" />
                            </ListItemIcon>
                            <AdminTypography sx={{ mb: 0, fontSize: '14px' }}>
                                {date}
                            </AdminTypography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}
