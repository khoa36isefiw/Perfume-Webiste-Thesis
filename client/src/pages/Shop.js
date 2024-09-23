import React from 'react';
import PerfumesCard from '../components/PerfumesCard/PerfumesCard';

import ShopPageInformation from '../components/ShopPageInformation/ShopPageInformation';

function Shop() {
    return (
        <div>
            <PerfumesCard />
            {/* <SearchFilterComponent /> */}
            <ShopPageInformation />
        </div>
    );
}

export default Shop;
