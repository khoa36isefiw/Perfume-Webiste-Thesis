import React from 'react';
import ServicesIntroduction from '../components/ServicesIntroduction/ServicesIntroduction';
import ListServices from '../components/ListServices/ListServices';
import Mission from '../components/Missions/Missions';

function Services() {
    return (
        <div>
            <ServicesIntroduction />
            <ListServices />
            <Mission />
        </div>
    );
}

export default Services;
