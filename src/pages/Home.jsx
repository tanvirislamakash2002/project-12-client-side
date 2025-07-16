import React from 'react';
import Banner from '../component/home/Banner';
import FeaturedDonationsSection from '../component/home/FeaturedDonationsSection';
import LatestCharityRequests from '../component/home/LatestCharityRequests';
import TopContributors from '../component/home/TopContributors';
import CommunityImpactTimeline from '../component/home/CommunityImpactTimeline';

const Home = () => {
    return (
        <div>
            <div className="">
                <Banner></Banner>
            </div>
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
                <CommunityImpactTimeline></CommunityImpactTimeline>
            </div>
        </div>
    );
};

export default Home;