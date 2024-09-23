import React from 'react';
import { Box, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

import { TextFieldCustomizeV2 } from '../TextFieldCustomize/TextFieldCustomize';

function SearchTerm() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 16,
                p: 2,
                [tabletScreen]: {
                    mt: 2,
                },
            }}
        >
            <TextFieldCustomizeV2
                // default
                placeholder={'Search here...'}
                sx={{
                    width: '360px',
                    [tabletScreen]: { width: '260px' },
                    [mobileScreen]: {
                        width: '100%',
                    },
                }}
                // value={searchTerm}
                // onChange={handleSearchChange}
                // onClick={() => setShowSuggestions(!!searchTerm)}
            />

            <IconButton
                sx={{
                    bgcolor: theme.palette.text.secondary,
                    borderTopLeftRadius: 1,
                    borderBottomLeftRadius: 1,
                    mr: 1,
                    '&:hover': {
                        bgcolor: theme.palette.text.secondary,
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    },
                    [tabletScreen]: {
                        mr: 4,
                    },
                }}
            >
                <SearchIcon sx={{ fontSize: '24px', color: 'white' }} />
            </IconButton>
        </Box>
    );
}

export default SearchTerm;
