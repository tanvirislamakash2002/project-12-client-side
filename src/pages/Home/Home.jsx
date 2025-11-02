import React from 'react';
import Banner from '../../component/home/Banner';
import FeaturedDonationsSection from '../../component/home/FeaturedDonationsSection';
import LatestCharityRequests from '../../component/home/LatestCharityRequests';
import TopContributors from '../../component/home/TopContributors';
import HowItWorks from './components/HowItWorks';
import ImpactStatistics from './components/ImpactStatistics';
import TestimonialsSection from './components/TestimonialsSection';
import UserTypeSection from './components/UserTypeSection';
import PartnersSection from './components/PartnersSection';
import FAQSection from './components/FAQSection';

const Home = () => {
    return (
        <div>
            <div className="">
                <Banner></Banner>
            </div>
            <HowItWorks></HowItWorks>
            <ImpactStatistics></ImpactStatistics>
            <TestimonialsSection></TestimonialsSection>
            <UserTypeSection></UserTypeSection>
            <PartnersSection></PartnersSection>
            <FAQSection></FAQSection>
            <div className="">
                <FeaturedDonationsSection></FeaturedDonationsSection>
            </div>
            <div className="">
                <LatestCharityRequests></LatestCharityRequests>
            </div>
            <div className="">
                <TopContributors></TopContributors>
            </div>

        </div>
    );
};

export default Home;