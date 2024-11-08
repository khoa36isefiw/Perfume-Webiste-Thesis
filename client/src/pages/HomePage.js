import React from 'react';
import NewArrivals from '../components/NewArrivals/NewArrivals';
import WelcomeHomePage from '../components/WelcomeHomePage/WelcomeHomePage';
import OurValues from '../components/OurValues/OurValues';
import BestSellingProducts from '../components/BestSellingProducts/BestSellingProducts';
import OurCollections from '../components/OurCollections/OurCollections';
import SaleOff from '../components/SaleOff/SaleOff';
import LatestArticle from '../components/LatestArticle/LatestArticle';
function HomePage() {
    return (
        <div style={{ overflow: 'hidden' }}>
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
