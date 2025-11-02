import React, { useState } from 'react';
import { UtensilsCrossed, Heart, Users, Check, TrendingUp, Award, Shield, Clock, BarChart3, DollarSign, Sparkles } from 'lucide-react';

const UserTypeSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const restaurantBenefits = [
    { icon: <TrendingUp className="w-5 h-5" />, text: 'Reduce food waste & disposal costs' },
    { icon: <DollarSign className="w-5 h-5" />, text: 'Receive tax benefits and documentation' },
    { icon: <Award className="w-5 h-5" />, text: 'Enhance community reputation and CSR' },
    { icon: <Clock className="w-5 h-5" />, text: 'Simple 2-minute listing process' },
    { icon: <Shield className="w-5 h-5" />, text: 'Connect with verified charities only' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'Flexible pickup scheduling' }
  ];

  const charityBenefits = [
    { icon: <Sparkles className="w-5 h-5" />, text: 'Access reliable, diverse food sources' },
    { icon: <UtensilsCrossed className="w-5 h-5" />, text: 'Receive quality surplus food daily' },
    { icon: <Shield className="w-5 h-5" />, text: 'Partner with verified restaurants' },
    { icon: <Clock className="w-5 h-5" />, text: 'Streamlined request and pickup system' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'Track impact with detailed analytics' },
    { icon: <Heart className="w-5 h-5" />, text: 'Serve more people with fewer resources' }
  ];

  const restaurantMetrics = [
    '500+ restaurants making an impact',
    'Average $2,500 in tax benefits per donation',
    '50+ tons of food saved monthly'
  ];

  const charityMetrics = [
    '150+ charities serving communities',
    '10,000+ additional meals served weekly',
    '65% cost savings on food procurement'
  ];

  return (
    <section className="py-20 px-4 bg-base-100 dark:bg-base-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6 shadow-lg">
            <Users className="w-8 h-8 text-primary-content" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
            Choose Your Path to Make a Difference
          </h2>
          <p className="text-lg text-base-content/70 dark:text-base-content/70 max-w-2xl mx-auto">
            Whether you have food to share or communities to serve, there's a place for you
          </p>
        </div>

        {/* Social Proof Bar */}
        <div className="mb-12 bg-base-200 dark:bg-base-200 rounded-2xl p-6 shadow-md">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-primary dark:text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-base-content dark:text-base-content">500+</p>
                <p className="text-sm text-base-content/60 dark:text-base-content/60">Restaurant Partners</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-secondary dark:text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-base-content dark:text-base-content">150+</p>
                <p className="text-sm text-base-content/60 dark:text-base-content/60">Charity Organizations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-accent dark:text-accent" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-base-content dark:text-base-content">50+</p>
                <p className="text-sm text-base-content/60 dark:text-base-content/60">Cities Served</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Restaurant Card */}
          <div
            onMouseEnter={() => setHoveredCard('restaurant')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative bg-base-100 dark:bg-base-200 rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 ${
              hoveredCard === 'restaurant'
                ? 'border-primary dark:border-primary scale-105 shadow-2xl'
                : 'border-base-300 dark:border-base-300'
            }`}
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-content px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Most Popular
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-2xl mb-4">
                <UtensilsCrossed className="w-10 h-10 text-primary dark:text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-base-content dark:text-base-content mb-2">
                For Food Donors
              </h3>
              <p className="text-base-content/60 dark:text-base-content/60 font-medium">
                Restaurants, Cafes & Food Businesses
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {restaurantBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-base-200 dark:bg-base-300 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                >
                  <div className="text-primary dark:text-primary mt-0.5">
                    {benefit.icon}
                  </div>
                  <span className="text-base-content dark:text-base-content flex-1">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl p-6 mb-6 border border-primary/20 dark:border-primary/30">
              <h4 className="font-bold text-base-content dark:text-base-content mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary dark:text-primary" />
                Impact Metrics
              </h4>
              <div className="space-y-2">
                {restaurantMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success dark:text-success flex-shrink-0" />
                    <span className="text-base-content/80 dark:text-base-content/80">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-content font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Donating Food
              <TrendingUp className="w-5 h-5" />
            </button>
            <button className="w-full mt-3 bg-base-200 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-neutral text-base-content dark:text-base-content font-semibold py-3 rounded-xl transition-colors">
              Learn More About Donating
            </button>
          </div>

          {/* Charity Card */}
          <div
            onMouseEnter={() => setHoveredCard('charity')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative bg-base-100 dark:bg-base-200 rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 ${
              hoveredCard === 'charity'
                ? 'border-secondary dark:border-secondary scale-105 shadow-2xl'
                : 'border-base-300 dark:border-base-300'
            }`}
          >
            {/* Verified Badge */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-content px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verified
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/10 dark:bg-secondary/20 rounded-2xl mb-4">
                <Heart className="w-10 h-10 text-secondary dark:text-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-base-content dark:text-base-content mb-2">
                For Charity Partners
              </h3>
              <p className="text-base-content/60 dark:text-base-content/60 font-medium">
                Non-Profit Organizations & Food Banks
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {charityBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-base-200 dark:bg-base-300 hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-colors"
                >
                  <div className="text-secondary dark:text-secondary mt-0.5">
                    {benefit.icon}
                  </div>
                  <span className="text-base-content dark:text-base-content flex-1">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/20 rounded-2xl p-6 mb-6 border border-secondary/20 dark:border-secondary/30">
              <h4 className="font-bold text-base-content dark:text-base-content mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary dark:text-secondary" />
                Partnership Benefits
              </h4>
              <div className="space-y-2">
                {charityMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success dark:text-success flex-shrink-0" />
                    <span className="text-base-content/80 dark:text-base-content/80">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/90 text-secondary-content font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Receiving Donations
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-full mt-3 bg-base-200 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-neutral text-base-content dark:text-base-content font-semibold py-3 rounded-xl transition-colors">
              Learn About Partnerships
            </button>
          </div>
        </div>

        {/* Optional Volunteer Section */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-2xl p-8 text-center border border-accent/20 dark:border-accent/30">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 dark:bg-accent/30 rounded-2xl mb-4">
            <Users className="w-8 h-8 text-accent dark:text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-3">
            Want to Volunteer?
          </h3>
          <p className="text-base-content/70 dark:text-base-content/70 mb-6 max-w-2xl mx-auto">
            Help coordinate food distribution, support local communities, and make a hands-on difference with flexible volunteering opportunities
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-accent hover:bg-accent/90 dark:bg-accent dark:hover:bg-accent/90 text-accent-content font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              Join as Volunteer
            </button>
            <button className="px-8 py-3 bg-base-100 dark:bg-base-200 hover:bg-base-200 dark:hover:bg-base-300 text-base-content dark:text-base-content font-semibold rounded-xl transition-colors border-2 border-accent/30 dark:border-accent/40">
              Learn More
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-base-content/50 dark:text-base-content/50 mb-4 font-medium">
            Trusted by communities nationwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-base-content/40 dark:text-base-content/40">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Verified Partners Only</span>
            </div>
            <div className="w-px h-6 bg-base-content/20 dark:bg-base-content/20"></div>
            <div className="flex items-center gap-2 text-base-content/40 dark:text-base-content/40">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Award-Winning Platform</span>
            </div>
            <div className="w-px h-6 bg-base-content/20 dark:bg-base-content/20"></div>
            <div className="flex items-center gap-2 text-base-content/40 dark:text-base-content/40">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Featured in Media</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSection;