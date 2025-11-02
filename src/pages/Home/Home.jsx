import React from 'react';
import Banner from '../../component/home/Banner';
import FeaturedDonationsSection from '../../component/home/FeaturedDonationsSection';
import LatestCharityRequests from '../../component/home/LatestCharityRequests';
import TopContributors from '../../component/home/TopContributors';
import DonationTips from '../../component/home/DonationTips';
import HowItWorks from './components/HowItWorks';
import ImpactStatistics from './components/ImpactStatistics';
import TestimonialsSection from './components/TestimonialsSection';
import UserTypeSection from './components/UserTypeSection';

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
            <div className="">
                <FeaturedDonationsSection></FeaturedDonationsSection>
            </div>
            <div className="">
                <LatestCharityRequests></LatestCharityRequests>
            </div>
            <div className="">
                <TopContributors></TopContributors>
            </div>
            <div className="">
                <DonationTips></DonationTips>
            </div>
        </div>
    );
};

export default Home;