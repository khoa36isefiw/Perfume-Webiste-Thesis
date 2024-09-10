import React from 'react';
import PerfumesCard from '../components/PerfumesCard/PerfumesCard';
import PerfumeBrands from '../components/PerfumeBrands/PerfumeBrands';
import ShopPageInformation from '../components/ShopPageInformation/ShopPageInformation';
import SortProducts from '../components/SortProducts/SortProducts';

function Shop() {
    return (
        <div>
            <PerfumeBrands />
            {/* <SortProducts /> */}
            <PerfumesCard />
            <ShopPageInformation />
        </div>
    );
}

export default Shop;
