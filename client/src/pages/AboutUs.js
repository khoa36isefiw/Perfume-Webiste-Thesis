import React from 'react';
import Introduce from '../components/Introduce/Introduce';
import OurStory from '../components/OurStory/OurStory';
import AboutUsBackground from '../components/AboutUsBackground/AboutUsBackground';
import WhyWeUnique from '../components/WhyWeUnique/WhyWeUnique';

function AboutUs() {
    return (
        <div>
            <Introduce />
            <OurStory />
            <AboutUsBackground />
            <WhyWeUnique />
        </div>
    );
}

export default AboutUs;
