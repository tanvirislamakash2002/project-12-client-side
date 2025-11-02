import React from 'react';
import Banner from '../../component/home/Banner';
import FeaturedDonationsSection from '../../component/home/FeaturedDonationsSection';
import HowItWorks from './components/HowItWorks';
import ImpactStatistics from './components/ImpactStatistics';
import TestimonialsSection from './components/TestimonialsSection';
import UserTypeSection from './components/UserTypeSection';
import PartnersSection from './components/PartnersSection';
import FAQSection from './components/FAQSection';
import MapSection from './components/MapSection';

const Home = () => {
    return (
        <div>
            <div className="">
                <Banner></Banner>
            </div>
            <HowItWorks></HowItWorks>
            <ImpactStatistics></ImpactStatistics>
            <div className="">
                <FeaturedDonationsSection></FeaturedDonationsSection>
            </div>
            <TestimonialsSection></TestimonialsSection>
            <UserTypeSection></UserTypeSection>
            <PartnersSection></PartnersSection>
            <FAQSection></FAQSection>
            <MapSection></MapSection>


        </div>
    );
};

export default Home;