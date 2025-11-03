import React, { useState, useEffect } from 'react';
import { Building2, Heart, Shield, Award, CheckCircle, Lock, BarChart3, Leaf, ChevronLeft, ChevronRight, Star, MapPin, TrendingUp } from 'lucide-react';

const PartnersSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  // Restaurant Partners
  const restaurantPartners = [
    { name: 'Bella Italia', type: 'Fine Dining', tier: 'platinum', logo: '🍝' },
    { name: 'Sunset Bistro', type: 'Casual Dining', tier: 'gold', logo: '🌅' },
    { name: 'Urban Kitchen', type: 'Contemporary', tier: 'gold', logo: '🍳' },
    { name: 'Green Leaf Cafe', type: 'Cafe & Bakery', tier: 'community', logo: '🥗' },
    { name: 'Golden Dragon', type: 'Asian Fusion', tier: 'platinum', logo: '🐉' },
    { name: 'The French Corner', type: 'Fine Dining', tier: 'gold', logo: '🥐' },
    { name: 'Pizza Paradise', type: 'Casual Dining', tier: 'community', logo: '🍕' },
    { name: 'Ocean Breeze', type: 'Seafood', tier: 'gold', logo: '🦞' },
    { name: 'Mountain View Hotel', type: 'Hotel Kitchen', tier: 'platinum', logo: '🏨' },
    { name: 'Tech Hub Cafeteria', type: 'Corporate', tier: 'gold', logo: '💼' },
    { name: 'Sweet Dreams Bakery', type: 'Cafe & Bakery', tier: 'community', logo: '🧁' },
    { name: 'Spice Route', type: 'Indian Cuisine', tier: 'gold', logo: '🌶️' }
  ];

  // Charity Partners
  const charityPartners = [
    { name: 'Hope Community Shelter', type: 'Homeless Shelter', verified: true, logo: '🏠' },
    { name: 'City Food Bank', type: 'Food Bank', verified: true, logo: '🍱' },
    { name: 'Meals on Wheels Network', type: 'Senior Services', verified: true, logo: '🚗' },
    { name: 'Youth Opportunity Center', type: 'Youth Organization', verified: true, logo: '👨‍👩‍👧‍👦' },
    { name: 'Family Support Services', type: 'Community Center', verified: true, logo: '❤️' },
    { name: 'Golden Years Foundation', type: 'Senior Care', verified: true, logo: '👵' },
    { name: 'Community Pantry Network', type: 'Food Pantry', verified: true, logo: '🥫' },
    { name: 'Helping Hands Mission', type: 'Homeless Shelter', verified: true, logo: '🤝' },
    { name: 'Kids First Foundation', type: 'Youth Organization', verified: true, logo: '🎒' },
    { name: 'Downtown Community Hub', type: 'Community Center', verified: true, logo: '🏘️' },
    { name: 'Sunrise Senior Living', type: 'Senior Care', verified: true, logo: '🌄' },
    { name: 'Second Harvest Network', type: 'Food Bank', verified: true, logo: '🌾' }
  ];

  // Trust Statistics
  const trustStats = [
    { icon: <Building2 className="w-5 h-5" />, value: '500+', label: 'Verified Restaurants', color: 'primary' },
    { icon: <Heart className="w-5 h-5" />, value: '150+', label: 'Certified Charities', color: 'secondary' },
    { icon: <TrendingUp className="w-5 h-5" />, value: '1M+', label: 'Meals Distributed', color: 'accent' },
    { icon: <MapPin className="w-5 h-5" />, value: '50+', label: 'Cities Served', color: 'success' },
    { icon: <Star className="w-5 h-5" />, value: '4.9/5', label: 'Satisfaction Rating', color: 'warning' }
  ];

  // Certifications & Badges
  const certifications = [
    { icon: <Shield className="w-6 h-6" />, label: 'SSL Secure', color: 'success' },
    { icon: <CheckCircle className="w-6 h-6" />, label: 'Food Safety Certified', color: 'primary' },
    { icon: <Lock className="w-6 h-6" />, label: 'Privacy Compliant', color: 'info' },
    { icon: <Award className="w-6 h-6" />, label: 'Quality Assurance', color: 'warning' },
    { icon: <Leaf className="w-6 h-6" />, label: 'Sustainable Impact', color: 'success' },
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Transparent Operations', color: 'info' }
  ];

  // Media Mentions
  const mediaOutlets = [
    { name: 'Tech News Daily', logo: '📰' },
    { name: 'Food Industry Magazine', logo: '📖' },
    { name: 'Community Impact Journal', logo: '📝' },
    { name: 'Sustainability Today', logo: '🌱' },
    { name: 'Local Business Weekly', logo: '💼' },
    { name: 'Charity Review Network', logo: '❤️' }
  ];

  // Auto-scroll for logo carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getTierBadge = (tier) => {
    const badges = {
      platinum: { color: 'bg-accent text-accent-content', label: 'Platinum' },
      gold: { color: 'bg-warning text-warning-content', label: 'Gold' },
      community: { color: 'bg-primary text-primary-content', label: 'Community' }
    };
    return badges[tier] || badges.community;
  };

  const PartnerCard = ({ partner, type }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-base-100 dark:bg-base-200 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-base-300 dark:border-base-300 hover:scale-105"
      >
        {/* Partner Logo/Icon */}
        <div className="flex flex-col items-center text-center">
          <div className={`w-20 h-20 flex items-center justify-center text-4xl mb-3 rounded-xl transition-transform duration-300 ${
            type === 'restaurant' ? 'bg-primary/10 dark:bg-primary/20' : 'bg-secondary/10 dark:bg-secondary/20'
          } ${isHovered ? 'scale-110' : ''}`}>
            {partner.logo}
          </div>
          
          <h4 className="font-bold text-base-content dark:text-base-content mb-1 line-clamp-1">
            {partner.name}
          </h4>
          <p className="text-xs text-base-content/60 dark:text-base-content/60 mb-2">
            {partner.type}
          </p>

          {/* Badges */}
          {type === 'restaurant' && partner.tier && (
            <span className={`text-xs px-2 py-1 rounded-full ${getTierBadge(partner.tier).color} font-semibold`}>
              {getTierBadge(partner.tier).label}
            </span>
          )}
          
          {type === 'charity' && partner.verified && (
            <div className="flex items-center gap-1 bg-success/10 dark:bg-success/20 text-success dark:text-success px-2 py-1 rounded-full text-xs font-semibold">
              <CheckCircle className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>

        {/* Hover Details */}
        {isHovered && (
          <div className="absolute inset-0 bg-base-100/95 dark:bg-base-200/95 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center transition-opacity duration-300">
            <p className="text-sm text-base-content dark:text-base-content text-center mb-2">
              {type === 'restaurant' ? 'Partner since 2024' : 'Serving communities since 2024'}
            </p>
            <button className="text-xs px-4 py-2 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-content rounded-lg font-semibold">
              Learn More
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-base-200 dark:bg-base-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6 shadow-lg">
            <Award className="w-8 h-8 text-primary-content" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-base-content/70 dark:text-base-content/70 max-w-2xl mx-auto">
            Join thousands of restaurants and charities making a difference nationwide
          </p>
        </div>

        {/* Trust Statistics Bar */}
        <div className="bg-base-100 dark:bg-base-100 rounded-2xl p-8 shadow-xl mb-16 border border-base-300 dark:border-base-300">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {trustStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-${stat.color}/10 dark:bg-${stat.color}/20 rounded-xl mb-3`}>
                  <div className={`text-${stat.color} dark:text-${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold text-base-content dark:text-base-content mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-base-content/60 dark:text-base-content/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Partners - Marquee */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-base-content dark:text-base-content mb-2 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary dark:text-primary" />
                Restaurant Partners
              </h3>
              <p className="text-base-content/60 dark:text-base-content/60">
                Trusted food donors from cafes to fine dining
              </p>
            </div>
            <button className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 font-semibold text-sm flex items-center gap-2">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 30s linear infinite;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="flex animate-marquee">
              {[...restaurantPartners, ...restaurantPartners].map((partner, idx) => (
                <div key={idx} className="flex-shrink-0 w-48 mx-2">
                  <PartnerCard partner={partner} type="restaurant" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charity Partners - Marquee (Reverse Direction) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-base-content dark:text-base-content mb-2 flex items-center gap-3">
                <Heart className="w-8 h-8 text-secondary dark:text-secondary" />
                Charity Partners
              </h3>
              <p className="text-base-content/60 dark:text-base-content/60">
                Verified organizations serving communities
              </p>
            </div>
            <button className="text-secondary dark:text-secondary hover:text-secondary/80 dark:hover:text-secondary/80 font-semibold text-sm flex items-center gap-2">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative overflow-hidden">
            <style>{`
              @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .animate-marquee-reverse {
                animation: marquee-reverse 30s linear infinite;
              }
              .animate-marquee-reverse:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="flex animate-marquee-reverse">
              {[...charityPartners, ...charityPartners].map((partner, idx) => (
                <div key={idx} className="flex-shrink-0 w-48 mx-2">
                  <PartnerCard partner={partner} type="charity" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Trust Badges */}
        <div className="bg-base-100 dark:bg-base-100 rounded-2xl p-8 shadow-xl mb-16 border border-base-300 dark:border-base-300">
          <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-6 text-center flex items-center justify-center gap-3">
            <Shield className="w-7 h-7 text-success dark:text-success" />
            Security & Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 bg-base-200 dark:bg-base-200 rounded-xl hover:bg-base-300 dark:hover:bg-base-300 transition-colors"
              >
                <div className={`text-${cert.color} dark:text-${cert.color} mb-2`}>
                  {cert.icon}
                </div>
                <p className="text-xs font-semibold text-base-content dark:text-base-content">
                  {cert.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Mentions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-6 text-center">
            As Featured In
          </h3>
          <div className="bg-base-100 dark:bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300 dark:border-base-300">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {mediaOutlets.map((outlet, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-4 hover:bg-base-200 dark:hover:bg-base-200 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="text-4xl mb-2">{outlet.logo}</div>
                  <p className="text-xs text-center font-medium text-base-content/70 dark:text-base-content/70">
                    {outlet.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Testimonials Strip */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl p-8 mb-16 border border-primary/10 dark:border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-base-100 dark:bg-base-200 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                  🍝
                </div>
                <div>
                  <p className="font-bold text-base-content dark:text-base-content">Bella Italia</p>
                  <p className="text-xs text-base-content/60 dark:text-base-content/60">Fine Dining Restaurant</p>
                </div>
              </div>
              <p className="text-sm text-base-content/80 dark:text-base-content/80 italic">
                "This platform transformed how we handle surplus food. Easy, impactful, and beneficial for our community reputation."
              </p>
            </div>

            <div className="bg-base-100 dark:bg-base-200 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center text-2xl">
                  🏠
                </div>
                <div>
                  <p className="font-bold text-base-content dark:text-base-content">Hope Community Shelter</p>
                  <p className="text-xs text-base-content/60 dark:text-base-content/60">Homeless Shelter</p>
                </div>
              </div>
              <p className="text-sm text-base-content/80 dark:text-base-content/80 italic">
                "Access to quality food has been game-changing for our shelter. We're serving better meals and helping more families."
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary rounded-2xl p-10 shadow-2xl">
          <h3 className="text-3xl font-bold text-primary-content mb-4">
            Ready to Join Our Partner Network?
          </h3>
          <p className="text-primary-content/90 mb-8 max-w-2xl mx-auto">
            Become part of a trusted community making real impact in food waste reduction and community support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-base-100 dark:bg-base-100 text-primary dark:text-primary rounded-xl font-bold hover:bg-base-200 dark:hover:bg-base-200 transition-colors shadow-lg">
              Become a Partner Restaurant
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur text-primary-content rounded-xl font-bold hover:bg-white/30 transition-colors border-2 border-white/30">
              Join as Charity Organization
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PartnersSection;