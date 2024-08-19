import React from 'react';
import NewArrivals from '../components/NewArrivals/NewArrivals';
import WelcomeHomePage from '../components/WelcomeHomePage/WelcomeHomePage';
import OurValues from '../components/OurValues/OurValues';
import BestSellingProducts from '../components/BestSellingProducts/BestSellingProducts';
import OurCollections from '../components/OurCollections/OurCollections';

function HomePage() {
    return (
        <div>
            <NewArrivals />
            <WelcomeHomePage />
            <OurValues />
            <BestSellingProducts />
            <OurCollections />
        </div>
    );
}

export default HomePage;
