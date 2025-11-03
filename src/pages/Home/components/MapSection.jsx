import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Filter, Clock, Building2, Heart, UtensilsCrossed, Search, Download, Share2, X, Star, CheckCircle, TrendingUp, Leaf, Users, ChevronRight } from 'lucide-react';

const MapSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data for map markers
  const markers = [
    { id: 1, type: 'donation', name: 'Urban Bistro', food: 'Italian meals', quantity: 15, distance: 2.3, time: '8:00 PM', rating: 4.8, lat: 40, lng: -74, verified: true },
    { id: 2, type: 'donation', name: 'Green Leaf Cafe', food: 'Fresh salads', quantity: 20, distance: 1.5, time: '7:30 PM', rating: 4.9, lat: 40.1, lng: -73.9, verified: true },
    { id: 3, type: 'charity', name: 'Hope Community Shelter', served: 200, area: 'Downtown', lat: 40.05, lng: -74.05, verified: true },
    { id: 4, type: 'charity', name: 'City Food Bank', served: 500, area: 'Midtown', lat: 40.15, lng: -73.85, verified: true },
    { id: 5, type: 'restaurant', name: 'Bella Italia', donations: 45, rating: 4.7, lat: 39.95, lng: -74.1, verified: true },
    { id: 6, type: 'restaurant', name: 'Ocean Breeze', donations: 32, rating: 4.8, lat: 40.2, lng: -73.8, verified: true },
    { id: 7, type: 'donation', name: 'Sweet Dreams Bakery', food: 'Bakery items', quantity: 30, distance: 3.1, time: '9:00 PM', rating: 4.6, lat: 39.9, lng: -74.15, verified: true },
    { id: 8, type: 'donation', name: 'Spice Route', food: 'Prepared meals', quantity: 25, distance: 4.2, time: '8:30 PM', rating: 4.9, lat: 40.25, lng: -73.75, verified: true }
  ];

  const recentActivity = [
    { time: '2 hours ago', actor: 'Urban Bistro', action: 'donated 25 meals', icon: '🍽️' },
    { time: '4 hours ago', actor: 'Hope Shelter', action: 'claimed bakery items', icon: '❤️' },
    { time: '6 hours ago', actor: 'Fresh Market', action: 'listed fresh produce', icon: '🥗' },
    { time: '8 hours ago', actor: 'Green Leaf Cafe', action: 'donated 20 salads', icon: '🥗' },
    { time: '10 hours ago', actor: 'City Food Bank', action: 'claimed 15 meals', icon: '❤️' }
  ];

  const areaStats = {
    availableDonations: 15,
    charities: 8,
    restaurants: 12,
    cities: 3,
    mealsDistributed: 5240,
    foodSaved: 2.3,
    co2Reduced: 180
  };

  const filterOptions = [
    { id: 'all', label: 'All Activity', icon: <MapPin className="w-4 h-4" /> },
    { id: 'donation', label: 'Donations', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'charity', label: 'Charities', icon: <Heart className="w-4 h-4" /> },
    { id: 'restaurant', label: 'Restaurants', icon: <Building2 className="w-4 h-4" /> }
  ];

  const filteredMarkers = activeFilter === 'all' 
    ? markers 
    : markers.filter(m => m.type === activeFilter);

  // Update last update time
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getMarkerColor = (type) => {
    switch(type) {
      case 'donation': return 'bg-success';
      case 'charity': return 'bg-info';
      case 'restaurant': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  const getMarkerIcon = (type) => {
    switch(type) {
      case 'donation': return <UtensilsCrossed className="w-4 h-4" />;
      case 'charity': return <Heart className="w-4 h-4" />;
      case 'restaurant': return <Building2 className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const MarkerPin = ({ marker }) => (
    <button
      onClick={() => setSelectedMarker(marker)}
      className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300 hover:scale-125 ${
        selectedMarker?.id === marker.id ? 'scale-125 z-50' : 'z-10'
      }`}
      style={{ 
        left: `${((marker.lng + 74) * 10)}%`, 
        top: `${(40.25 - marker.lat) * 50}%` 
      }}
    >
      <div className={`${getMarkerColor(marker.type)} text-white rounded-full p-3 shadow-lg relative`}>
        {getMarkerIcon(marker.type)}
        {selectedMarker?.id === marker.id && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full animate-ping"></div>
        )}
      </div>
      <div className={`w-0.5 h-4 ${getMarkerColor(marker.type)} mx-auto`}></div>
    </button>
  );

  return (
    <section className="py-20 px-4 bg-base-200 dark:bg-base-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-info rounded-2xl mb-6 shadow-lg">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
            Food Rescue in Action
          </h2>
          <p className="text-lg text-base-content/70 dark:text-base-content/70 max-w-2xl mx-auto">
            Real-time view of food donations and community impact across our network
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-success/10 dark:bg-success/20 text-success dark:text-success px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Live updates • {areaStats.availableDonations} active donations</span>
          </div>
        </div>

        {/* Location Search */}
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40 dark:text-base-content/40" />
                <input
                  type="text"
                  placeholder="Enter city or zipcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-base-100 dark:bg-base-100 border-2 border-base-300 dark:border-base-300 rounded-xl text-base-content dark:text-base-content placeholder-base-content/40 dark:placeholder-base-content/40 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                />
              </div>
              <button className="px-6 py-4 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-content rounded-xl font-semibold transition-colors flex items-center gap-2 whitespace-nowrap">
                <Navigation className="w-5 h-5" />
                Use My Location
              </button>
            </div>
            
            {/* Radius Selector */}
            <div className="mt-4 flex items-center gap-3 justify-center">
              <span className="text-sm text-base-content/60 dark:text-base-content/60">Show within:</span>
              {[5, 10, 25, 50].map((radius) => (
                <button
                  key={radius}
                  onClick={() => setSelectedRadius(radius)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedRadius === radius
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-100 dark:bg-base-100 text-base-content dark:text-base-content hover:bg-base-300 dark:hover:bg-base-300'
                  }`}
                >
                  {radius} mi
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === option.id
                  ? 'bg-primary text-primary-content shadow-lg scale-105'
                  : 'bg-base-100 dark:bg-base-100 text-base-content dark:text-base-content hover:bg-base-300 dark:hover:bg-base-300 border border-base-300 dark:border-base-300'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 dark:bg-base-100 rounded-2xl shadow-xl border border-base-300 dark:border-base-300 overflow-hidden">
              {/* Map Container */}
              <div className="relative h-[500px] bg-gradient-to-br from-base-200 to-base-300 dark:from-base-200 dark:to-base-300">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 20px),
                                   repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 20px)`
                }}></div>

                {/* Map Markers */}
                {filteredMarkers.map((marker) => (
                  <MarkerPin key={marker.id} marker={marker} />
                ))}

                {/* Map Legend */}
                <div className="absolute top-4 left-4 bg-base-100/95 dark:bg-base-100/95 backdrop-blur rounded-xl p-4 shadow-lg">
                  <h4 className="text-sm font-bold text-base-content dark:text-base-content mb-3">Legend</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-success rounded-full"></div>
                      <span className="text-base-content dark:text-base-content">Available Donations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-info rounded-full"></div>
                      <span className="text-base-content dark:text-base-content">Charity Organizations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-secondary rounded-full"></div>
                      <span className="text-base-content dark:text-base-content">Restaurant Partners</span>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button className="p-3 bg-base-100 dark:bg-base-100 hover:bg-base-200 dark:hover:bg-base-200 rounded-lg shadow-lg transition-colors">
                    <Share2 className="w-5 h-5 text-base-content dark:text-base-content" />
                  </button>
                  <button className="p-3 bg-base-100 dark:bg-base-100 hover:bg-base-200 dark:hover:bg-base-200 rounded-lg shadow-lg transition-colors">
                    <Download className="w-5 h-5 text-base-content dark:text-base-content" />
                  </button>
                </div>
              </div>

              {/* Selected Marker Details */}
              {selectedMarker && (
                <div className="p-6 border-t border-base-300 dark:border-base-300 bg-base-200 dark:bg-base-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`${getMarkerColor(selectedMarker.type)} text-white rounded-xl p-3`}>
                        {getMarkerIcon(selectedMarker.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-base-content dark:text-base-content">
                            {selectedMarker.name}
                          </h3>
                          {selectedMarker.verified && (
                            <CheckCircle className="w-5 h-5 text-success dark:text-success" />
                          )}
                        </div>
                        {selectedMarker.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-warning text-warning" />
                            <span className="text-sm font-semibold text-base-content dark:text-base-content">
                              {selectedMarker.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMarker(null)}
                      className="p-2 hover:bg-base-300 dark:hover:bg-base-300 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-base-content dark:text-base-content" />
                    </button>
                  </div>

                  {selectedMarker.type === 'donation' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-base-100 dark:bg-base-100 rounded-lg p-3">
                        <p className="text-xs text-base-content/60 dark:text-base-content/60 mb-1">Food Type</p>
                        <p className="font-bold text-base-content dark:text-base-content">{selectedMarker.food}</p>
                      </div>
                      <div className="bg-base-100 dark:bg-base-100 rounded-lg p-3">
                        <p className="text-xs text-base-content/60 dark:text-base-content/60 mb-1">Quantity</p>
                        <p className="font-bold text-base-content dark:text-base-content">{selectedMarker.quantity} servings</p>
                      </div>
                      <div className="bg-base-100 dark:bg-base-100 rounded-lg p-3">
                        <p className="text-xs text-base-content/60 dark:text-base-content/60 mb-1">Distance</p>
                        <p className="font-bold text-base-content dark:text-base-content">{selectedMarker.distance} miles</p>
                      </div>
                      <div className="bg-base-100 dark:bg-base-100 rounded-lg p-3">
                        <p className="text-xs text-base-content/60 dark:text-base-content/60 mb-1">Pickup By</p>
                        <p className="font-bold text-base-content dark:text-base-content">{selectedMarker.time}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-content py-3 rounded-xl font-semibold transition-colors">
                      View Details
                    </button>
                    <button className="px-6 bg-base-100 dark:bg-base-100 hover:bg-base-300 dark:hover:bg-base-300 text-base-content dark:text-base-content py-3 rounded-xl font-semibold transition-colors flex items-center gap-2">
                      <Navigation className="w-5 h-5" />
                      Directions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Area Statistics */}
            <div className="bg-base-100 dark:bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300 dark:border-base-300">
              <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary dark:text-primary" />
                Current View Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-base-200 dark:bg-base-200 rounded-lg">
                  <span className="text-sm text-base-content dark:text-base-content">Available Donations</span>
                  <span className="font-bold text-lg text-success dark:text-success">{areaStats.availableDonations}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-base-200 dark:bg-base-200 rounded-lg">
                  <span className="text-sm text-base-content dark:text-base-content">Charity Organizations</span>
                  <span className="font-bold text-lg text-info dark:text-info">{areaStats.charities}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-base-200 dark:bg-base-200 rounded-lg">
                  <span className="text-sm text-base-content dark:text-base-content">Active Restaurants</span>
                  <span className="font-bold text-lg text-secondary dark:text-secondary">{areaStats.restaurants}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-base-200 dark:bg-base-200 rounded-lg">
                  <span className="text-sm text-base-content dark:text-base-content">Cities Covered</span>
                  <span className="font-bold text-lg text-accent dark:text-accent">{areaStats.cities}</span>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl p-6 border border-primary/20 dark:border-primary/30">
              <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-4 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-success dark:text-success" />
                Area Impact
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-base-content/60 dark:text-base-content/60 mb-1">Meals Distributed</p>
                  <p className="text-2xl font-bold text-base-content dark:text-base-content">{areaStats.mealsDistributed.toLocaleString()}</p>
                  <p className="text-xs text-success dark:text-success">This month</p>
                </div>
                <div>
                  <p className="text-sm text-base-content/60 dark:text-base-content/60 mb-1">Food Saved</p>
                  <p className="text-2xl font-bold text-base-content dark:text-base-content">{areaStats.foodSaved} tons</p>
                  <p className="text-xs text-success dark:text-success">From going to waste</p>
                </div>
                <div>
                  <p className="text-sm text-base-content/60 dark:text-base-content/60 mb-1">CO₂ Reduced</p>
                  <p className="text-2xl font-bold text-base-content dark:text-base-content">{areaStats.co2Reduced} tons</p>
                  <p className="text-xs text-success dark:text-success">Environmental impact</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-base-100 dark:bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300 dark:border-base-300">
              <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary dark:text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-base-200 dark:bg-base-200 rounded-lg hover:bg-base-300 dark:hover:bg-base-300 transition-colors">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-base-content dark:text-base-content">
                        <span className="font-semibold">{activity.actor}</span> {activity.action}
                      </p>
                      <p className="text-xs text-base-content/60 dark:text-base-content/60">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary rounded-2xl p-8 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-content mb-3">
            Want to See Your Area on the Map?
          </h3>
          <p className="text-primary-content/90 mb-6 max-w-xl mx-auto">
            Join our network and start making an impact in your community today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-base-100 dark:bg-base-100 text-primary dark:text-primary rounded-xl font-bold hover:bg-base-200 dark:hover:bg-base-200 transition-colors shadow-lg">
              Register Your Restaurant
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur text-primary-content rounded-xl font-bold hover:bg-white/30 transition-colors border-2 border-white/30">
              Register Your Charity
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default MapSection;