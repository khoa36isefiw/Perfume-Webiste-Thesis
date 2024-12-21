import React from 'react';
import ServicesIntroduction from '../components/ServicesIntroduction/ServicesIntroduction';
import ListServices from '../components/ListServices/ListServices';
import Mission from '../components/Missions/Missions';
import Hotline from '../components/Hotline/Hotline';

function Services() {
    return (
        <div>
            <ServicesIntroduction />
            <Hotline />
            <ListServices />
            <Mission />
        </div>
    );
}

export default Services;
