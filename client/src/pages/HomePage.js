import React from 'react';
import NewArrivals from '../components/NewArrivals/NewArrivals';
import WelcomeHomePage from '../components/WelcomeHomePage/WelcomeHomePage';
import OurValues from '../components/OurValues/OurValues';
import BestSellingProducts from '../components/BestSellingProducts/BestSellingProducts';

function HomePage() {
    return (
        <div>
            <NewArrivals />
            <WelcomeHomePage />
            <OurValues />
            <BestSellingProducts />
        </div>
    );
}

export default HomePage;
