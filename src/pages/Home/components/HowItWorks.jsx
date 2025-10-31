import React, { useState } from 'react';
import { Store, Heart, Upload, Bell, Calendar, Search, MessageSquare, TrendingUp, Shield, Users, Clock, CheckCircle, ArrowRight, Play } from 'lucide-react';

const HowItWorks = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeTab, setActiveTab] = useState('donor');

  const donorSteps = [
    {
      number: "01",
      title: "List Your Surplus",
      subtitle: "In just 2 minutes",
      icon: Upload,
      details: [
        "Create detailed food listings",
        "Specify quantity, pickup time, and location",
        "Upload photos for transparency"
      ],
      value: "Reduce waste instantly",
      stat: "200+ listings posted weekly"
    },
    {
      number: "02",
      title: "Review Verified Requests",
      subtitle: "Get responses within hours",
      icon: Bell,
      details: [
        "Receive instant notifications",
        "Review charity profiles and ratings",
        "Choose the most suitable organization"
      ],
      value: "Connect with trusted partners",
      stat: "Verified charities only"
    },
    {
      number: "03",
      title: "Coordinate Collection",
      subtitle: "Seamless handoff process",
      icon: Calendar,
      details: [
        "Schedule convenient pickup times",
        "Complete donation records",
        "Receive tax documentation"
      ],
      value: "Streamlined documentation",
      stat: "Full compliance guaranteed"
    }
  ];

  const charitySteps = [
    {
      number: "01",
      title: "Discover Available Donations",
      subtitle: "Real-time updates",
      icon: Search,
      details: [
        "Browse verified food listings",
        "Filter by location and food type",
        "View real-time availability"
      ],
      value: "Access quality surplus food",
      stat: "Updated every minute"
    },
    {
      number: "02",
      title: "Submit Collection Proposal",
      subtitle: "Direct communication",
      icon: MessageSquare,
      details: [
        "Direct messaging with donors",
        "Provide collection details",
        "Confirm volunteer availability"
      ],
      value: "Efficient coordination",
      stat: "Average response: 30 mins"
    },
    {
      number: "03",
      title: "Distribute to Community",
      subtitle: "Track your impact",
      icon: TrendingUp,
      details: [
        "Safe food handling protocols",
        "Track distribution metrics",
        "Share impact stories"
      ],
      value: "Measurable social impact",
      stat: "1M+ meals distributed"
    }
  ];

  const platformFeatures = [
    { icon: Shield, text: "Smart Matching Algorithm" },
    { icon: Bell, text: "Real-time Notifications" },
    { icon: MessageSquare, text: "Secure Messaging System" },
    { icon: CheckCircle, text: "Quality Assurance Protocols" },
    { icon: TrendingUp, text: "Impact Tracking & Reporting" }
  ];

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-content px-4 py-2 rounded-full mb-4">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-semibold">Simple & Effective</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
          How We Connect Food to Those in Need
        </h2>
        <p className="text-lg text-neutral dark:text-base-content/80 max-w-3xl mx-auto">
          Our seamless three-step process ensures surplus food reaches communities efficiently, 
          safely, and with full transparency at every stage.
        </p>
        
        {/* Video Demo Button */}
        <button className="mt-6 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-content px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg">
          <Play className="w-5 h-5" />
          See It in Action
        </button>
      </div>

      {/* Mobile Tab Selector */}
      <div className="max-w-7xl mx-auto mb-8 lg:hidden">
        <div className="flex gap-2 bg-base-200 dark:bg-base-200 p-2 rounded-lg">
          <button
            onClick={() => setActiveTab('donor')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'donor'
                ? 'bg-primary text-primary-content shadow-md'
                : 'text-base-content dark:text-base-content'
            }`}
          >
            <Store className="w-5 h-5 mx-auto mb-1" />
            For Donors
          </button>
          <button
            onClick={() => setActiveTab('charity')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'charity'
                ? 'bg-primary text-primary-content shadow-md'
                : 'text-base-content dark:text-base-content'
            }`}
          >
            <Heart className="w-5 h-5 mx-auto mb-1" />
            For Charities
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          
          {/* LEFT COLUMN - Food Donors */}
          <div className={`${activeTab === 'donor' ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white dark:bg-base-200 rounded-2xl p-8 shadow-xl border border-base-200 dark:border-neutral-content/10 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl">
                  <Store className="w-8 h-8 text-primary dark:text-primary-content" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-base-content dark:text-base-content">
                    For Food Donors
                  </h3>
                  <p className="text-sm text-neutral dark:text-base-content/80">Restaurants & Food Businesses</p>
                </div>
              </div>

              <div className="space-y-6">
                {donorSteps.map((step, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredStep(`donor-${index}`)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`relative transition-all duration-300 ${
                      hoveredStep === `donor-${index}` ? 'transform scale-105' : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center font-bold text-primary dark:text-primary-content">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-base-content dark:text-base-content mb-1">
                              {step.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-accent dark:text-accent-content mb-2">
                              <Clock className="w-3 h-3" />
                              {step.subtitle}
                            </div>
                          </div>
                          <step.icon className="w-5 h-5 text-primary dark:text-primary-content" />
                        </div>
                        
                        <ul className="space-y-1 mb-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-neutral dark:text-base-content/80 flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 mt-0.5 text-secondary flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={`transition-all duration-300 ${
                          hoveredStep === `donor-${index}` ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                        }`}>
                          <div className="bg-success/10 dark:bg-success/20 text-success dark:text-success-content text-xs px-3 py-2 rounded-lg mb-2">
                            ✓ {step.value}
                          </div>
                          <div className="text-xs text-neutral dark:text-base-content/80 font-semibold">
                            {step.stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < donorSteps.length - 1 && (
                      <div className="ml-6 mt-4 mb-2 h-8 w-0.5 bg-gradient-to-b from-primary/50 to-transparent dark:from-primary/30"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-base-200 dark:border-neutral-content/10">
                <div className="flex items-center gap-2 text-sm text-success dark:text-success-content">
                  <Shield className="w-4 h-4" />
                  <span className="font-semibold">Food Safety Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - Platform Value */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl p-8 shadow-xl border border-primary/20 dark:border-primary/30 h-full flex flex-col items-center justify-center">
              
              {/* Circular Infographic */}
              <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-10 dark:opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-white dark:bg-base-200 shadow-inner flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-primary dark:text-primary-content mx-auto mb-2" />
                    <div className="text-2xl font-bold text-base-content dark:text-base-content">2,500+</div>
                    <div className="text-xs text-neutral dark:text-base-content/80">Active Partners</div>
                  </div>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-content px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Donor
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accent text-accent-content px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Charity
                </div>
              </div>

              <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-6 text-center">
                Platform Features
              </h3>

              <div className="space-y-3 w-full">
                {platformFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white dark:bg-base-200 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                      <feature.icon className="w-5 h-5 text-primary dark:text-primary-content" />
                    </div>
                    <span className="text-sm font-semibold text-base-content dark:text-base-content">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-2 w-full">
                <div className="flex items-center justify-between text-xs bg-info/10 dark:bg-info/20 text-info dark:text-info-content px-4 py-2 rounded-lg">
                  <span className="font-semibold">Data Privacy Protected</span>
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between text-xs bg-success/10 dark:bg-success/20 text-success dark:text-success-content px-4 py-2 rounded-lg">
                  <span className="font-semibold">Regulatory Compliant</span>
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Charity Partners */}
          <div className={`${activeTab === 'charity' ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white dark:bg-base-200 rounded-2xl p-8 shadow-xl border border-base-200 dark:border-neutral-content/10 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-secondary/10 dark:bg-secondary/20 p-3 rounded-xl">
                  <Heart className="w-8 h-8 text-secondary dark:text-secondary-content" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-base-content dark:text-base-content">
                    For Charity Partners
                  </h3>
                  <p className="text-sm text-neutral dark:text-base-content/80">Non-Profit Organizations</p>
                </div>
              </div>

              <div className="space-y-6">
                {charitySteps.map((step, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredStep(`charity-${index}`)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`relative transition-all duration-300 ${
                      hoveredStep === `charity-${index}` ? 'transform scale-105' : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center font-bold text-secondary dark:text-secondary-content">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-base-content dark:text-base-content mb-1">
                              {step.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-accent dark:text-accent-content mb-2">
                              <Clock className="w-3 h-3" />
                              {step.subtitle}
                            </div>
                          </div>
                          <step.icon className="w-5 h-5 text-secondary dark:text-secondary-content" />
                        </div>
                        
                        <ul className="space-y-1 mb-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-neutral dark:text-base-content/80 flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={`transition-all duration-300 ${
                          hoveredStep === `charity-${index}` ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                        }`}>
                          <div className="bg-success/10 dark:bg-success/20 text-success dark:text-success-content text-xs px-3 py-2 rounded-lg mb-2">
                            ✓ {step.value}
                          </div>
                          <div className="text-xs text-neutral dark:text-base-content/80 font-semibold">
                            {step.stat}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < charitySteps.length - 1 && (
                      <div className="ml-6 mt-4 mb-2 h-8 w-0.5 bg-gradient-to-b from-secondary/50 to-transparent dark:from-secondary/30"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-base-200 dark:border-neutral-content/10">
                <div className="flex items-center gap-2 text-sm text-success dark:text-success-content">
                  <Shield className="w-4 h-4" />
                  <span className="font-semibold">Partnership Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-12 bg-white dark:bg-base-200 rounded-2xl p-8 shadow-xl border border-base-200 dark:border-neutral-content/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary dark:text-primary-content mb-1">1M+</div>
              <div className="text-sm text-neutral dark:text-base-content/80">Meals Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary dark:text-secondary-content mb-1">2,500+</div>
              <div className="text-sm text-neutral dark:text-base-content/80">Active Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent dark:text-accent-content mb-1">98%</div>
              <div className="text-sm text-neutral dark:text-base-content/80">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success dark:text-success-content mb-1">50+</div>
              <div className="text-sm text-neutral dark:text-base-content/80">Cities Served</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;