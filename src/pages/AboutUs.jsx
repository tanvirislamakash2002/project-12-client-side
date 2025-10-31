import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  FaHeart, FaHandsHelping, FaUtensils, FaUsers, FaLeaf, FaGlobeAmericas,
  FaAward, FaChartLine, FaShieldAlt, FaLightbulb, FaUserFriends,
  FaRecycle, FaHandHoldingHeart, FaArrowRight, FaQuoteLeft,
  FaStar, FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';

const AboutUsPage = () => {
  const [counters, setCounters] = useState({
    meals: 0,
    restaurants: 0,
    charities: 0,
    communities: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targetValues = {
      meals: 25000,
      restaurants: 450,
      charities: 120,
      communities: 85
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targetValues).map(key => {
      const target = targetValues[key];
      const increment = target / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(intervals.find(interval => interval === this));
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const impactStats = [
    { icon: FaUtensils, value: counters.meals, label: "Meals Redistributed", suffix: "+" },
    { icon: FaBuilding, value: counters.restaurants, label: "Restaurant Partners", suffix: "+" },
    { icon: FaHeart, value: counters.charities, label: "Charity Organizations", suffix: "+" },
    { icon: FaUsers, value: counters.communities, label: "Communities Served", suffix: "+" }
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Compassion",
      description: "We believe every person deserves access to nutritious meals and that small acts of kindness create lasting change."
    },
    {
      icon: FaLeaf,
      title: "Sustainability",
      description: "Reducing food waste while feeding communities creates a positive environmental and social impact."
    },
    {
      icon: FaUserFriends,
      title: "Community",
      description: "Building bridges between restaurants, charities, and donors to create stronger, more connected communities."
    },
    {
      icon: FaShieldAlt,
      title: "Trust",
      description: "Maintaining transparency, security, and accountability in every transaction and relationship we facilitate."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b293?w=300&h=300&fit=crop&crop=face",
      bio: "Former food industry executive passionate about eliminating hunger and food waste."
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Tech innovator dedicated to building scalable solutions for social impact."
    },
    {
      name: "Emma Rodriguez",
      role: "Community Outreach Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Community advocate with 10+ years experience in nonprofit sector partnerships."
    }
  ];

  const testimonials = [
    {
      quote: "This platform has revolutionized how we connect with local restaurants. We've been able to provide 40% more meals to families in need.",
      author: "Maria Santos",
      role: "Director, Hope Community Kitchen",
      rating: 5
    },
    {
      quote: "As a restaurant owner, I love knowing our surplus food goes directly to those who need it most. The process is seamless and meaningful.",
      author: "David Park",
      role: "Owner, Golden Spoon Restaurant",
      rating: 5
    },
    {
      quote: "The transparency and ease of donation through this platform makes giving back part of our daily routine. Highly recommended!",
      author: "Lisa Thompson",
      role: "Regular Donor",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
       <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 dark:from-primary/20 dark:via-secondary/10 dark:to-accent/20">
    <div className="absolute inset-0 bg-white/50 dark:bg-base-100/50"></div>
    <div className="relative max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-base-content mb-6 leading-tight">
            Bridging the Gap Between 
            <span className="text-primary"> Surplus</span> and 
            <span className="text-secondary"> Need</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-base-content/80 mb-8 leading-relaxed">
            We connect restaurants with surplus food to charity organizations and communities in need, 
            creating a sustainable solution to hunger while reducing food waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="btn btn-primary btn-lg px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Join Our Mission
              <FaArrowRight className="ml-2" />
            </Link>
            <Link to="/allDonations" className="btn btn-outline btn-primary btn-lg px-8 rounded-full dark:border-primary dark:text-primary">
              See Available Food
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop"
            alt="Community sharing meal"
            className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-base-200 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-base-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-success/20 rounded-lg">
                <FaHeart className="w-5 h-5 text-green-600 dark:text-success" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-base-content">25,000+</p>
                <p className="text-sm text-gray-600 dark:text-base-content/70">Meals Shared</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Impact Statistics */}
        <section className="py-16 bg-gray-50 dark:bg-base-200">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-base-content mb-4">Our Growing Impact</h2>
        <p className="text-xl text-gray-600 dark:text-base-content/80 max-w-3xl mx-auto">
          Every day, we're making a difference in communities across the nation by connecting resources with needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {impactStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-base-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-gray-100 dark:border-base-300">
            <div className="inline-flex p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
              <stat.icon className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-gray-900 dark:text-base-content mb-2">
              {stat.value.toLocaleString()}{stat.suffix}
            </div>
            <p className="text-gray-600 dark:text-base-content/80 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>


      {/* Mission & Story */}
 <section className="py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-base-content mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-base-content/80 mb-6 leading-relaxed">
            Food waste is one of the most pressing issues of our time, with over 40% of food in America going to waste 
            while millions of people face hunger. We saw an opportunity to create a bridge between abundance and need.
          </p>
          <p className="text-lg text-gray-700 dark:text-base-content/80 mb-8 leading-relaxed">
            Our platform empowers restaurants to easily donate surplus food to verified charity organizations, 
            creating a seamless process that benefits everyone involved - from reducing waste to feeding communities.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 dark:bg-success/20 rounded-lg flex-shrink-0">
                <FaRecycle className="w-5 h-5 text-green-600 dark:text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-base-content mb-1">Reduce Waste</h3>
                <p className="text-gray-600 dark:text-base-content/80">Transform surplus food into community nourishment</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-info/20 rounded-lg flex-shrink-0">
                <FaHandHoldingHeart className="w-5 h-5 text-blue-600 dark:text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-base-content mb-1">Feed Communities</h3>
                <p className="text-gray-600 dark:text-base-content/80">Ensure nutritious meals reach those who need them most</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 dark:bg-primary/20 rounded-lg flex-shrink-0">
                <FaUserFriends className="w-5 h-5 text-purple-600 dark:text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-base-content mb-1">Build Connections</h3>
                <p className="text-gray-600 dark:text-base-content/80">Foster stronger relationships between businesses and communities</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=500&fit=crop"
            alt="Volunteers preparing food"
            className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
          />
          <div className="absolute top-6 right-6 bg-white dark:bg-base-200 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-base-300">
            <div className="flex items-center gap-2">
              <FaLeaf className="w-5 h-5 text-green-500 dark:text-success" />
              <span className="font-semibold text-gray-900 dark:text-base-content">Eco-Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Values */}
       <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-base-200 dark:to-base-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-base-content mb-4">Our Values</h2>
        <p className="text-xl text-gray-600 dark:text-base-content/80 max-w-3xl mx-auto">
          These core principles guide everything we do and every decision we make.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <div key={index} className="bg-white dark:bg-base-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-base-300">
            <div className="inline-flex p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-6">
              <value.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-base-content mb-4">{value.title}</h3>
            <p className="text-gray-600 dark:text-base-content/80 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

      {/* Team */}
        <section className="py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-base-content mb-4">Meet Our Team</h2>
        <p className="text-xl text-gray-600 dark:text-base-content/80 max-w-3xl mx-auto">
          Passionate individuals united by a common goal: creating a world without hunger or waste.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="group">
            <div className="relative mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-base-content mb-2">{member.name}</h3>
              <p className="text-primary font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-base-content/80 leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

      {/* Testimonials */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-base-content mb-4">What Our Community Says</h2>
        <p className="text-xl text-gray-600 dark:text-base-content/80 max-w-3xl mx-auto">
          Hear from the restaurants, charities, and donors who make our mission possible.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white dark:bg-base-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-base-300">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <FaQuoteLeft className="w-6 h-6 text-primary/30 mb-4" />
            <p className="text-gray-700 dark:text-base-content/80 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
            <div>
              <p className="font-bold text-gray-900 dark:text-base-content">{testimonial.author}</p>
              <p className="text-gray-600 dark:text-base-content/70 text-sm">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

      {/* Call to Action */}
       <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
        Join thousands of restaurants, charities, and individuals who are already part of our growing community. 
        Together, we can eliminate hunger and reduce food waste.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/register" className="btn btn-white btn-lg px-8 rounded-full text-primary hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300">
          Get Started Today
        </Link>
        <Link to="/allDonations" className="btn btn-outline btn-lg px-8 rounded-full border-white text-white hover:bg-white hover:text-primary">
          Browse Available Food
        </Link>
      </div>
    </div>
  </section>

      {/* Contact Information */}
       <section className="py-16 bg-gray-900 dark:bg-base-300 text-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-primary/20 rounded-full mb-4">
            <FaMapMarkerAlt className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Our Location</h3>
          <p className="text-gray-300">123 Community Street<br />New York, NY 10001</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-3 bg-primary/20 rounded-full mb-4">
            <FaPhone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-gray-300">+1 (555) 123-FOOD<br />Mon-Fri 9AM-6PM</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-3 bg-primary/20 rounded-full mb-4">
            <FaEnvelope className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="text-gray-300">hello@foodbridge.org<br />support@foodbridge.org</p>
        </div>
      </div>
    </div>
  </section>
    </div>
  );
};

export default AboutUsPage;