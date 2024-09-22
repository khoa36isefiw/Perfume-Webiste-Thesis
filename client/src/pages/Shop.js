import React from 'react';
import PerfumesCard from '../components/PerfumesCard/PerfumesCard';
import PerfumeBrands from '../components/PerfumeBrands/PerfumeBrands';
import ShopPageInformation from '../components/ShopPageInformation/ShopPageInformation';
import SearchFilterComponent from '../components/TestSearching/TestSearching';

function Shop() {
    return (
        <div>
            {/* <PerfumeBrands /> */}
            <PerfumesCard />
            {/* <SearchFilterComponent /> */}
            <ShopPageInformation />
        </div>
    );
}

export default Shop;
