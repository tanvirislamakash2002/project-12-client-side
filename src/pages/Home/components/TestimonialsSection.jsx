import React, { useState } from 'react';
import { UtensilsCrossed, Heart, Users, Star, MapPin, Calendar, CheckCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [currentIndex, setCurrentIndex] = useState(0);

  const tabs = [
    { id: 'restaurants', label: 'Restaurants', icon: <UtensilsCrossed className="w-5 h-5" /> },
    { id: 'charities', label: 'Charities', icon: <Heart className="w-5 h-5" /> },
    { id: 'beneficiaries', label: 'Beneficiaries', icon: <Users className="w-5 h-5" /> }
  ];

  const restaurantTestimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'Owner',
      business: 'Sunset Bistro',
      type: 'Italian Restaurant',
      location: 'Austin, TX',
      memberSince: '2024',
      rating: 5,
      quote: "Reduced our food waste by 70% while feeding hundreds in our community weekly. The tax benefits are just the cherry on top!",
      metric: '70% waste reduction',
      image: '🍝',
      verified: true
    },
    {
      name: 'James Chen',
      role: 'Head Chef',
      business: 'Urban Kitchen',
      type: 'Contemporary American',
      location: 'Seattle, WA',
      memberSince: '2024',
      rating: 5,
      quote: "Before FoodShare, we threw away perfect food daily. Now we're community heroes instead of wasters.",
      metric: '500+ meals donated',
      image: '👨‍🍳',
      verified: true
    },
    {
      name: 'Emily Parker',
      role: 'Manager',
      business: 'Green Leaf Cafe',
      type: 'Organic Cafe',
      location: 'Portland, OR',
      memberSince: '2024',
      rating: 5,
      quote: "The platform is incredibly easy to use. We post our surplus in minutes and it's gone within hours. Win-win for everyone!",
      metric: '300+ donations made',
      image: '🥗',
      verified: true
    }
  ];

  const charityTestimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Director',
      organization: 'Hope Community Shelter',
      type: 'Homeless Shelter',
      location: 'Boston, MA',
      memberSince: '2024',
      rating: 5,
      quote: "This platform helps us serve 200+ additional meals weekly to homeless families. Game-changing for our small organization.",
      metric: '200+ meals weekly',
      image: '🏠',
      verified: true
    },
    {
      name: 'David Kim',
      role: 'Coordinator',
      organization: 'City Food Bank',
      type: 'Food Bank',
      location: 'Chicago, IL',
      memberSince: '2024',
      rating: 5,
      quote: "We've diversified our food offerings dramatically. Fresh restaurant-quality meals make our recipients feel valued, not just fed.",
      metric: '1,000+ people served',
      image: '🍱',
      verified: true
    },
    {
      name: 'Rachel Martinez',
      role: 'Volunteer Manager',
      organization: 'Meals on Wheels Network',
      type: 'Senior Services',
      location: 'Miami, FL',
      memberSince: '2024',
      rating: 5,
      quote: "The quality and variety of food we receive has transformed our meal programs. Our seniors are thrilled with restaurant-quality dishes.",
      metric: '150+ seniors fed daily',
      image: '🚗',
      verified: true
    }
  ];

  const beneficiaryStories = [
    {
      name: 'Michael',
      situation: 'Previously Homeless',
      location: 'Denver, CO',
      quote: "Getting a warm, restaurant-quality meal gave me dignity when I needed it most. It wasn't just food—it was hope.",
      impact: 'Now housed and employed',
      image: '😊',
      verified: false
    },
    {
      name: 'Lisa',
      situation: 'Single Mother of Three',
      location: 'Philadelphia, PA',
      quote: "This program helped feed my kids nutritious meals during our toughest months. I'm forever grateful.",
      impact: 'Family stabilized',
      image: '👩‍👧‍👦',
      verified: false
    },
    {
      name: 'Robert',
      situation: 'Senior Citizen',
      location: 'San Diego, CA',
      quote: "At 78, getting fresh meals delivered has been a blessing. The variety and quality remind me I'm valued in this community.",
      impact: 'Improved health & wellbeing',
      image: '👴',
      verified: false
    }
  ];

  const testimonials = {
    restaurants: restaurantTestimonials,
    charities: charityTestimonials,
    beneficiaries: beneficiaryStories
  };

  const metrics = [
    { label: 'Restaurant Satisfaction', value: '95%', icon: <Star className="w-5 h-5" /> },
    { label: 'Charities Served Monthly', value: '200+', icon: <Heart className="w-5 h-5" /> },
    { label: 'Meals Distributed Weekly', value: '50,000+', icon: <UtensilsCrossed className="w-5 h-5" /> },
    { label: 'Platform Rating', value: '4.8/5', icon: <Star className="w-5 h-5" /> }
  ];

  const currentTestimonials = testimonials[activeTab];
  const maxIndex = currentTestimonials.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </div>
  );

  return (
<section className="py-20 px-4 bg-base-200 dark:bg-base-100 transition-colors duration-300">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary dark:from-primary dark:to-secondary rounded-2xl mb-6 shadow-lg">
        <Quote className="w-8 h-8 text-primary-content" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
        Trusted by Our Community
      </h2>
      <p className="text-lg text-neutral dark:text-base-content/80 max-w-2xl mx-auto">
        See how we're making a difference through the voices of our partners
      </p>
    </div>

    {/* Tabs */}
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            setCurrentIndex(0);
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg scale-105'
              : 'bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content hover:shadow-md border border-base-300 dark:border-base-300'
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Testimonials Area */}
      <div className="lg:col-span-2">
        {/* Testimonial Cards */}
        <div className="relative bg-base-100 dark:bg-base-200 rounded-2xl shadow-xl p-8 md:p-10 border border-base-300 dark:border-base-300 min-h-[400px]">
          <div className="absolute top-6 right-6 text-6xl text-primary/10 dark:text-primary/20">
            <Quote className="w-16 h-16" />
          </div>

          <div className="relative">
            {/* Profile Section */}
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-4xl shadow-lg text-primary-content">
                {currentTestimonials[currentIndex].image}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-1">
                      {currentTestimonials[currentIndex].name}
                    </h3>
                    <p className="text-primary dark:text-primary font-semibold mb-2">
                      {currentTestimonials[currentIndex].role}
                      {currentTestimonials[currentIndex].business && 
                        ` at ${currentTestimonials[currentIndex].business}`}
                      {currentTestimonials[currentIndex].organization && 
                        ` at ${currentTestimonials[currentIndex].organization}`}
                    </p>
                    <p className="text-sm text-neutral dark:text-base-content/70 mb-2">
                      {currentTestimonials[currentIndex].type}
                    </p>
                  </div>
                  {currentTestimonials[currentIndex].verified && (
                    <div className="flex items-center gap-1 bg-success/20 text-success dark:text-success px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                
                {currentTestimonials[currentIndex].rating && (
                  <StarRating rating={currentTestimonials[currentIndex].rating} />
                )}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-base-content/80 dark:text-base-content/80 leading-relaxed mb-6 italic">
              "{currentTestimonials[currentIndex].quote}"
            </blockquote>

            {/* Metrics & Info */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-base-300 dark:border-base-300">
              {currentTestimonials[currentIndex].metric && (
                <div className="bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-lg">
                  <p className="text-sm text-neutral dark:text-base-content/70">Key Impact</p>
                  <p className="font-bold text-primary dark:text-primary">
                    {currentTestimonials[currentIndex].metric}
                  </p>
                </div>
              )}
              {currentTestimonials[currentIndex].impact && (
                <div className="bg-success/10 dark:bg-success/20 px-4 py-2 rounded-lg">
                  <p className="text-sm text-neutral dark:text-base-content/70">Current Status</p>
                  <p className="font-bold text-success dark:text-success">
                    {currentTestimonials[currentIndex].impact}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2 text-neutral dark:text-base-content/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{currentTestimonials[currentIndex].location}</span>
              </div>
              {currentTestimonials[currentIndex].memberSince && (
                <div className="flex items-center gap-2 text-neutral dark:text-base-content/70">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Member since {currentTestimonials[currentIndex].memberSince}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-base-300 dark:bg-base-300 hover:bg-base-200 dark:hover:bg-base-400 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-base-content dark:text-base-content" />
            </button>
            <div className="flex gap-2">
              {currentTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-base-300 dark:bg-base-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-base-300 dark:bg-base-300 hover:bg-base-200 dark:hover:bg-base-400 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-base-content dark:text-base-content" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Metrics */}
      <div className="space-y-6">
        <div className="bg-base-100 dark:bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300 dark:border-base-300">
          <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-6">
            Platform Stats
          </h3>
          <div className="space-y-4">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-base-200 dark:bg-base-300/50 rounded-xl hover:bg-base-300 dark:hover:bg-base-300 transition-colors"
              >
                <div className="text-primary dark:text-primary">
                  {metric.icon}
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-base-content dark:text-base-content">
                    {metric.value}
                  </p>
                  <p className="text-sm text-neutral dark:text-base-content/70">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-6 text-primary-content">
          <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>500+ restaurants making a difference</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>150+ verified charities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Serving 50+ cities nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    {/* <div className="mt-12 bg-base-100 dark:bg-base-200 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-300 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-base-content dark:text-base-content mb-4">
        Ready to Share Your Success Story?
      </h3>
      <p className="text-neutral dark:text-base-content/80 mb-6 max-w-2xl mx-auto">
        Join our community of changemakers and start making an impact today
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Become a Partner
        </button>
        <button className="px-8 py-3 bg-base-300 dark:bg-base-300 text-base-content dark:text-base-content rounded-lg font-semibold hover:bg-base-200 dark:hover:bg-base-400 transition-colors">
          See Available Food
        </button>
      </div>
    </div> */}
  </div>
</section>
  );
};

export default TestimonialsSection;