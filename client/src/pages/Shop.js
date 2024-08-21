import React from 'react';
import PerfumesCard from '../components/PerfumesCard/PerfumesCard';
import PerfumeBrands from '../components/PerfumeBrands/PerfumeBrands';
import ShopPageInformation from '../components/ShopPageInformation/ShopPageInformation';

function Shop() {
    return (
        <div>
            <PerfumeBrands />
            <PerfumesCard />
            <ShopPageInformation />
        </div>
    );
}

export default Shop;
