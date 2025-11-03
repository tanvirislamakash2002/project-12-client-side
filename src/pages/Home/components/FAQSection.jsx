import React, { useState } from 'react';
import { UtensilsCrossed, Heart, Shield, HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('restaurants');
  const [expandedItems, setExpandedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'restaurants', label: 'For Restaurants', icon: <UtensilsCrossed className="w-5 h-5" /> },
    { id: 'charities', label: 'For Charities', icon: <Heart className="w-5 h-5" /> },
    { id: 'safety', label: 'Safety & Trust', icon: <Shield className="w-5 h-5" /> }
  ];

  const faqs = {
    restaurants: [
      {
        question: "Is there any cost for restaurants to use the platform?",
        answer: "No, our platform is completely free for restaurants. We believe in making food donation as accessible as possible. You'll save on disposal costs and may receive tax benefits for your donations."
      },
      {
        question: "How much time does it take to list surplus food?",
        answer: "Listing food takes just 2-3 minutes. Simply select the food type, quantity, and pickup time. Our streamlined interface makes the process quick and efficient, even during busy service hours."
      },
      {
        question: "What documentation do I receive for tax purposes?",
        answer: "You'll receive automatic digital receipts for every donation, including detailed information about the food donated, estimated value, and recipient charity. These records are IRS-compliant and stored securely in your account for easy access during tax season."
      },
      {
        question: "How do I schedule pickups with charities?",
        answer: "When listing food, you specify your preferred pickup window. Charities see this and can request the donation during your specified time. You'll receive instant notifications when a charity confirms pickup, and you can communicate directly through our platform."
      },
      {
        question: "What types of food can be donated?",
        answer: "You can donate prepared foods, ingredients, baked goods, and packaged items. Foods must be safe for consumption and properly stored. We accept hot foods, cold foods, frozen items, and shelf-stable products. Perishable items should be donated within safe holding times."
      },
      {
        question: "How should food be packaged and stored?",
        answer: "Food should be stored at safe temperatures and packaged securely for transport. Hot foods above 135°F, cold foods below 41°F. Use food-safe containers and clearly label contents, preparation date, and any allergens."
      },
      {
        question: "What if no charity claims our donation?",
        answer: "If a donation isn't claimed within your specified timeframe, you'll be notified. You can extend the pickup window, modify the listing, or remove it. Our system also suggests alternative charities in your area that might be interested."
      },
      {
        question: "Can we donate prepared foods vs. ingredients?",
        answer: "Yes, both are welcome! Prepared foods are perfect for immediate distribution, while raw ingredients help charities prepare fresh meals. You can specify the food type when listing to help charities find what they need."
      }
    ],
    charities: [
      {
        question: "Is there any cost for charities to use the platform?",
        answer: "Absolutely not. Our platform is 100% free for registered non-profit organizations and charities. We're here to help you serve more people with quality food at no additional cost to your operations."
      },
      {
        question: "How are charities verified on the platform?",
        answer: "We verify all charities through a thorough process including 501(c)(3) status verification, background checks, and food safety training certification. Each charity displays a verified badge and must maintain good standing to remain active on the platform."
      },
      {
        question: "What are our responsibilities for food pickup?",
        answer: "Your organization is responsible for timely pickup during the agreed window, proper food handling during transport, and maintaining safe temperatures. We provide guidelines and best practices, plus you'll need to confirm receipt through the platform."
      },
      {
        question: "How quickly can we receive donations after requesting?",
        answer: "Once you request a donation, the restaurant is notified immediately. Most pickups occur within 1-4 hours of posting. You'll see the restaurant's specified pickup window when browsing available donations."
      },
      {
        question: "What food safety standards are followed?",
        answer: "All food follows local health department guidelines and FDA food code standards. Restaurants must maintain proper temperatures, and we provide food safety training for all charity partners. Every donation includes handling instructions and temperature requirements."
      },
      {
        question: "How do we handle different types of food donations?",
        answer: "Each donation listing includes detailed information about food type, temperature requirements, and handling instructions. We provide guidelines for hot foods, cold foods, frozen items, and shelf-stable products. All charities receive comprehensive food safety training."
      },
      {
        question: "What if we receive more food than we can distribute?",
        answer: "You can coordinate with other verified charities in your network to share excess donations. The platform allows you to mark surplus and connect with partner organizations. We also provide guidance on safe storage and redistribution timelines."
      },
      {
        question: "Can we specify dietary requirements or restrictions?",
        answer: "Yes! Your organization profile can include dietary preferences and restrictions you serve (vegetarian, halal, kosher, gluten-free, etc.). You'll see dietary information in food listings and can filter donations to match your community's needs."
      }
    ],
    safety: [
      {
        question: "How do you ensure food safety throughout the process?",
        answer: "We enforce strict food safety protocols including temperature monitoring, time tracking, proper packaging requirements, and mandatory food safety training for all users. Every donation includes safety guidelines, and we provide real-time support for safety questions."
      },
      {
        question: "What are the temperature control requirements?",
        answer: "Hot foods must be maintained above 135°F, cold foods below 41°F, and frozen foods at 0°F or below. Restaurants must package foods at safe temperatures, and charities must maintain these temperatures during transport. We provide temperature monitoring guidelines and best practices."
      },
      {
        question: "Are there liability protections for donors?",
        answer: "Yes, the Federal Bill Emerson Good Samaritan Food Donation Act protects food donors from liability when donating in good faith to non-profit organizations. We provide detailed documentation for all donations and ensure all parties follow proper food safety protocols."
      },
      {
        question: "What food safety training is provided?",
        answer: "All restaurant and charity users must complete our online food safety certification course covering proper handling, storage, transportation, and temperature control. We also provide ongoing resources, updates on best practices, and access to food safety experts."
      },
      {
        question: "How are restaurants verified and vetted?",
        answer: "Every restaurant must provide valid business licenses, food handler permits, and health department certifications. We verify these documents and check health inspection records. Restaurants must maintain current certifications and good health inspection standings."
      },
      {
        question: "What measures ensure donor and recipient safety?",
        answer: "Both parties undergo background verification, provide necessary certifications, and complete safety training. All transactions are documented, tracked, and monitored. Users can rate and review each other, helping maintain high standards across the platform."
      },
      {
        question: "Is our data and information secure?",
        answer: "Absolutely. We use bank-level encryption (SSL/TLS) for all data transmission, secure cloud storage, and regular security audits. We're fully compliant with GDPR and CCPA privacy regulations. Your data is never shared with third parties without your explicit consent."
      },
      {
        question: "How do you handle disputes or issues?",
        answer: "Our dedicated support team is available to mediate any disputes or concerns. We have clear policies, detailed documentation of all transactions, and a fair resolution process. Most issues are resolved within 24-48 hours through direct communication and support intervention."
      }
    ]
  };

  const toggleItem = (index) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const expandAll = () => {
    const allIndices = faqs[activeCategory].map((_, idx) => idx);
    setExpandedItems(allIndices);
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  const filteredFAQs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 px-4 bg-base-100 dark:bg-base-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6 shadow-lg">
            <HelpCircle className="w-8 h-8 text-primary-content" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
            Your Questions Answered
          </h2>
          <p className="text-lg text-base-content/70 dark:text-base-content/70 max-w-2xl mx-auto">
            Everything you need to know about donating, receiving, and using our platform
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40 dark:text-base-content/40" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-base-200 dark:bg-base-200 border-2 border-base-300 dark:border-base-300 rounded-xl text-base-content dark:text-base-content placeholder-base-content/40 dark:placeholder-base-content/40 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setExpandedItems([]);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-content shadow-lg scale-105'
                  : 'bg-base-200 dark:bg-base-200 text-base-content dark:text-base-content hover:bg-base-300 dark:hover:bg-base-300 border border-base-300 dark:border-base-300'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Expand/Collapse Controls */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={expandAll}
            className="text-sm text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 font-semibold"
          >
            Expand All
          </button>
          <span className="text-base-content/30 dark:text-base-content/30">|</span>
          <button
            onClick={collapseAll}
            className="text-sm text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 font-semibold"
          >
            Collapse All
          </button>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-base-200 dark:bg-base-200 rounded-xl border border-base-300 dark:border-base-300 overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-base-300 dark:hover:bg-base-300 transition-colors"
                >
                  <span className="text-lg font-semibold text-base-content dark:text-base-content pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    expandedItems.includes(index)
                      ? 'bg-primary text-primary-content rotate-180'
                      : 'bg-base-300 dark:bg-base-300 text-base-content dark:text-base-content'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-5 animate-fadeIn">
                    <div className="pt-4 border-t border-base-300 dark:border-base-300">
                      <p className="text-base-content/80 dark:text-base-content/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-base-content/20 dark:text-base-content/20 mx-auto mb-4" />
              <p className="text-lg text-base-content/60 dark:text-base-content/60">
                No questions found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 font-semibold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl p-6 border border-primary/20 dark:border-primary/30">
            <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary dark:text-primary" />
              Learn More
            </h3>
            <div className="space-y-3">
              <a href="#how-it-works" className="flex items-center justify-between p-3 bg-base-100 dark:bg-base-200 rounded-lg hover:bg-base-200 dark:hover:bg-base-300 transition-colors group">
                <span className="text-base-content dark:text-base-content font-medium">Our Safety Protocols</span>
                <ExternalLink className="w-4 h-4 text-primary dark:text-primary group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#partners" className="flex items-center justify-between p-3 bg-base-100 dark:bg-base-200 rounded-lg hover:bg-base-200 dark:hover:bg-base-300 transition-colors group">
                <span className="text-base-content dark:text-base-content font-medium">View Partner Organizations</span>
                <ExternalLink className="w-4 h-4 text-primary dark:text-primary group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#testimonials" className="flex items-center justify-between p-3 bg-base-100 dark:bg-base-200 rounded-lg hover:bg-base-200 dark:hover:bg-base-300 transition-colors group">
                <span className="text-base-content dark:text-base-content font-medium">Read Success Stories</span>
                <ExternalLink className="w-4 h-4 text-primary dark:text-primary group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/20 rounded-2xl p-6 border border-secondary/20 dark:border-secondary/30">
            <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-secondary dark:text-secondary" />
              Need More Help?
            </h3>
            <p className="text-base-content/70 dark:text-base-content/70 mb-4">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/90 text-secondary-content rounded-lg font-semibold transition-colors">
                <MessageCircle className="w-5 h-5" />
                Chat with Support
              </button>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-base-100 dark:bg-base-200 hover:bg-base-200 dark:hover:bg-base-300 text-base-content dark:text-base-content rounded-lg font-medium transition-colors">
                  <Mail className="w-4 h-4" />
                  Email Us
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-base-100 dark:bg-base-200 hover:bg-base-200 dark:hover:bg-base-300 text-base-content dark:text-base-content rounded-lg font-medium transition-colors">
                  <Phone className="w-4 h-4" />
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary rounded-2xl p-8 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-content mb-3">
            Ready to Get Started?
          </h3>
          <p className="text-primary-content/90 mb-6 max-w-xl mx-auto">
            Join our community of restaurants and charities making a real difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-base-100 dark:bg-base-100 text-primary dark:text-primary rounded-xl font-bold hover:bg-base-200 dark:hover:bg-base-200 transition-colors shadow-lg">
              Create Account
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur text-primary-content rounded-xl font-bold hover:bg-white/30 transition-colors border-2 border-white/30">
              Learn More
            </button>
          </div>
        </div> */}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;