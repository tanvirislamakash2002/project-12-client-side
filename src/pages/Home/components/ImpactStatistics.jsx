import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Utensils, Building2, Heart, Droplets, TreePine, DollarSign, TrendingUp } from 'lucide-react';

const ImpactStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    foodSaved: 0,
    meals: 0,
    restaurants: 0,
    charities: 0,
    co2Reduced: 0,
    waterSaved: 0,
    foodValue: 0,
    communities: 0
  });

  const sectionRef = useRef(null);

  // Target values
  const targets = {
    foodSaved: 150,
    meals: 300000,
    restaurants: 85,
    charities: 45,
    co2Reduced: 200,
    waterSaved: 5.2,
    foodValue: 450000,
    communities: 12
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        foodSaved: Math.floor(targets.foodSaved * progress),
        meals: Math.floor(targets.meals * progress),
        restaurants: Math.floor(targets.restaurants * progress),
        charities: Math.floor(targets.charities * progress),
        co2Reduced: Math.floor(targets.co2Reduced * progress),
        waterSaved: (targets.waterSaved * progress).toFixed(1),
        foodValue: Math.floor(targets.foodValue * progress),
        communities: Math.floor(targets.communities * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const primaryStats = [
    {
      icon: <Leaf className="w-8 h-8" />,
      value: `${counts.foodSaved}+`,
      label: 'Tons of Food Saved',
      description: 'Rescued from waste',
      color: 'bg-green-500 dark:bg-green-600',
      lightBg: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      value: `${counts.meals.toLocaleString()}+`,
      label: 'Nutritious Meals',
      description: 'Delivered to communities',
      color: 'bg-orange-500 dark:bg-orange-600',
      lightBg: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: `${counts.restaurants}+`,
      label: 'Restaurant Partners',
      description: 'From cafes to chains',
      color: 'bg-blue-500 dark:bg-blue-600',
      lightBg: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      value: `${counts.charities}+`,
      label: 'Charity Networks',
      description: 'Organizations served',
      color: 'bg-purple-500 dark:bg-purple-600',
      lightBg: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const secondaryStats = [
    {
      icon: <TreePine className="w-6 h-6" />,
      value: `${counts.co2Reduced}`,
      unit: 'tons',
      label: 'CO₂ Emissions Reduced',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      value: `${counts.waterSaved}M`,
      unit: 'gallons',
      label: 'Water Saved',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: `$${(counts.foodValue / 1000).toFixed(0)}K`,
      unit: '',
      label: 'Food Value Redirected',
      color: 'text-amber-600 dark:text-amber-400'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: `${counts.communities}`,
      unit: 'cities',
      label: 'Communities Served',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600 rounded-2xl mb-6 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Making a Real Difference
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Together, we're transforming surplus food into hope, one meal at a time
          </p>
          <div className="mt-4 inline-block">
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              Updated Daily • Since 2024
            </span>
          </div>
        </div>

        {/* Primary Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {primaryStats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.lightBg} rounded-xl mb-4 ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="mb-2">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {stat.label}
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Secondary Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Environmental & Community Impact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryStats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <div className={`mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                {stat.unit && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {stat.unit}
                  </div>
                )}
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join our growing network of restaurants and charities working together to end food waste and hunger
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-green-600 dark:text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Become a Partner Restaurant
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/20 transition-colors duration-300 border-2 border-white/30">
                Join as a Charity Organization
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trusted by communities nationwide
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center opacity-60 dark:opacity-40">
            <div className="text-gray-400 dark:text-gray-500 font-semibold">Featured Partner</div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-gray-400 dark:text-gray-500 font-semibold">Verified Impact</div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-gray-400 dark:text-gray-500 font-semibold">Community Endorsed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatistics;