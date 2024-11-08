import React from 'react';
import PerfumesCard from '../components/PerfumesCard/PerfumesCard';

import ShopPageInformation from '../components/ShopPageInformation/ShopPageInformation';
import { Box } from '@mui/material';

function Shop() {
    return (
        <Box sx={{ mt: 20 }}>
            <PerfumesCard />
            {/* <SearchFilterComponent /> */}
            <ShopPageInformation />
        </Box>
    );
}

export default Shop;
