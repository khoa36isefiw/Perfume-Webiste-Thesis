import React from 'react';
import NewArrivals from '../components/NewArrivals/NewArrivals';
import WelcomeHomePage from '../components/WelcomeHomePage/WelcomeHomePage';
import OurValues from '../components/OurValues/OurValues';
import BestSellingProducts from '../components/NewProductsArrivals/NewProductsArrivals';
import OurCollections from '../components/OurCollections/OurCollections';
import SaleOff from '../components/SaleOff/SaleOff';
import LatestArticle from '../components/LatestArticle/LatestArticle';

import SnowFalling from '../components/SnowFalling/SnowFalling';

function HomePage() {
    React.useEffect(() => {
        console.log('Effect runs after every render');
    });

    return (
        <div style={{ overflow: 'hidden' }}>
            <SnowFalling />
            <NewArrivals />
            <WelcomeHomePage />
            <OurValues />
            <BestSellingProducts />
            <OurCollections />
            <SaleOff />
            <LatestArticle />
        </div>
    );
}

export default HomePage;
