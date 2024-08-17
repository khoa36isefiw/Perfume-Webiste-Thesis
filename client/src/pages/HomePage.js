import React from 'react';
import NewArrivals from '../components/NewArrivals/NewArrivals';
import WelcomeHomePage from '../components/WelcomeHomePage/WelcomeHomePage';

function HomePage() {
    return (
        <div>
            <NewArrivals />
            <WelcomeHomePage />
        </div>
    );
}

export default HomePage;
