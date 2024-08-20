import React from 'react';
import PerfumesCard from '../components/PerfumesCard/PerfumesCard';
import PerfumeBrands from '../components/PerfumeBrands/PerfumeBrands';

function Shop() {
    return (
        <div>
            <PerfumeBrands />
            <PerfumesCard />
        </div>
    );
}

export default Shop;
