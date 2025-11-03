import React, { useState } from 'react';
import { Newspaper, Star, Shield, Bell, Clock, User, Heart, Share2, Bookmark, ChevronRight, TrendingUp, Calendar, Search, Mail, Download, ExternalLink } from 'lucide-react';

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);

  const categories = [
    { id: 'all', label: 'All News', icon: <Newspaper className="w-5 h-5" /> },
    { id: 'success', label: 'Success Stories', icon: <Star className="w-5 h-5" /> },
    { id: 'safety', label: 'Safety Tips', icon: <Shield className="w-5 h-5" /> },
    { id: 'updates', label: 'Platform Updates', icon: <Bell className="w-5 h-5" /> }
  ];

  const blogPosts = [
    {
      id: 1,
      category: 'success',
      title: 'How Urban Bistro Reduced Food Waste by 70%',
      excerpt: 'Discover how this local restaurant transformed their surplus food into community impact while saving thousands in disposal costs.',
      image: '🍽️',
      author: 'Sarah Johnson',
      date: 'Nov 1, 2024',
      readTime: '5 min read',
      likes: 245,
      shares: 89,
      featured: true,
      metrics: { waste: '70%', meals: '500+', savings: '$12K' }
    },
    {
      id: 2,
      category: 'safety',
      title: '5 Essential Food Safety Practices for Donors',
      excerpt: 'Learn the critical safety protocols every restaurant should follow when donating surplus food to ensure quality and compliance.',
      image: '🛡️',
      author: 'Dr. Michael Chen',
      date: 'Oct 28, 2024',
      readTime: '7 min read',
      likes: 189,
      shares: 67,
      featured: false
    },
    {
      id: 3,
      category: 'success',
      title: 'Hope Shelter Now Serves 200 More Meals Weekly',
      excerpt: 'See how partnership with local restaurants helped this charity organization dramatically expand their meal distribution program.',
      image: '❤️',
      author: 'Emily Rodriguez',
      date: 'Oct 25, 2024',
      readTime: '6 min read',
      likes: 312,
      shares: 124,
      featured: false,
      metrics: { meals: '200+', families: '50+', growth: '150%' }
    },
    {
      id: 4,
      category: 'updates',
      title: 'New Mobile App Released with Real-Time Notifications',
      excerpt: 'Download our new mobile app to receive instant alerts when donations become available in your area.',
      image: '📱',
      author: 'Tech Team',
      date: 'Oct 22, 2024',
      readTime: '4 min read',
      likes: 156,
      shares: 45,
      featured: false
    },
    {
      id: 5,
      category: 'safety',
      title: 'Proper Temperature Control: A Complete Guide',
      excerpt: 'Everything you need to know about maintaining safe food temperatures from kitchen to delivery.',
      image: '🌡️',
      author: 'Dr. Michael Chen',
      date: 'Oct 20, 2024',
      readTime: '8 min read',
      likes: 201,
      shares: 78,
      featured: false
    },
    {
      id: 6,
      category: 'success',
      title: 'Green Leaf Cafe: From Waste to Community Hero',
      excerpt: "How a small cafe's commitment to zero waste created lasting impact in their neighborhood.",
      image: '🥗',
      author: 'Maria Santos',
      date: 'Oct 18, 2024',
      readTime: '5 min read',
      likes: 278,
      shares: 95,
      featured: false,
      metrics: { waste: '85%', impact: '300+', months: '6' }
    },
    {
      id: 7,
      category: 'updates',
      title: 'Expanding to 10 New Cities This Quarter',
      excerpt: 'Find out if your city is next on our expansion list as we grow our food rescue network nationwide.',
      image: '🌍',
      author: 'Growth Team',
      date: 'Oct 15, 2024',
      readTime: '3 min read',
      likes: 167,
      shares: 52,
      featured: false
    },
    {
      id: 8,
      category: 'safety',
      title: 'Holiday Food Safety: Special Considerations',
      excerpt: 'Seasonal guidelines for safely donating holiday meals and managing increased food volumes.',
      image: '🎄',
      author: 'Dr. Michael Chen',
      date: 'Oct 12, 2024',
      readTime: '6 min read',
      likes: 134,
      shares: 41,
      featured: false
    }
  ];

  const popularPosts = [
    { title: 'Top 10 Food Donation Success Stories 2024', reads: '12.5K' },
    { title: 'Complete Food Safety Checklist [PDF]', reads: '9.8K' },
    { title: 'How to Start Your Restaurant Donation Program', reads: '8.2K' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleLike = (postId) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleNewsletterSubmit = () => {
    if (email) {
      alert(`Thanks for subscribing with ${email}!`);
      setEmail('');
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'success': return 'bg-success text-success-content';
      case 'safety': return 'bg-warning text-warning-content';
      case 'updates': return 'bg-info text-info-content';
      default: return 'bg-primary text-primary-content';
    }
  };

  const getCategoryBadge = (category) => {
    const labels = {
      success: 'Success Story',
      safety: 'Safety Tips',
      updates: 'Platform Update',
      all: 'News'
    };
    return labels[category] || 'Article';
  };

  return (
    <section className="py-20 px-4 bg-base-100 dark:bg-base-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6 shadow-lg">
            <Newspaper className="w-8 h-8 text-primary-content" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
            Latest News & Stories
          </h2>
          <p className="text-lg text-base-content/70 dark:text-base-content/70 max-w-2xl mx-auto">
            Stay updated with success stories, safety tips, and platform news
          </p>
        </div>

        {/* Search & Categories */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40 dark:text-base-content/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-base-200 dark:bg-base-200 border-2 border-base-300 dark:border-base-300 rounded-xl text-base-content dark:text-base-content placeholder-base-content/40 dark:placeholder-base-content/40 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
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
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'all' && (
          <div className="mb-12">
            <div className="bg-base-200 dark:bg-base-200 rounded-3xl overflow-hidden shadow-2xl border border-base-300 dark:border-base-300 hover:shadow-3xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 flex items-center justify-center p-12 min-h-[300px]">
                  <div className="text-9xl">{featuredPost.image}</div>
                  <div className={`absolute top-6 left-6 ${getCategoryColor(featuredPost.category)} px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    ⭐ Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className={`inline-block ${getCategoryColor(featuredPost.category)} px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit`}>
                    {getCategoryBadge(featuredPost.category)}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-base-content dark:text-base-content mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-base-content/70 dark:text-base-content/70 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>

                  {featuredPost.metrics && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(featuredPost.metrics).map(([key, value]) => (
                        <div key={key} className="bg-base-100 dark:bg-base-300 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-primary dark:text-primary">{value}</p>
                          <p className="text-xs text-base-content/60 dark:text-base-content/60 capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-base-content/60 dark:text-base-content/60">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-content py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                      Read Full Story
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-base-100 dark:bg-base-300 hover:bg-base-300 dark:hover:bg-neutral rounded-xl transition-colors">
                      <Share2 className="w-5 h-5 text-base-content dark:text-base-content" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {regularPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-base-200 dark:bg-base-200 rounded-2xl overflow-hidden shadow-lg border border-base-300 dark:border-base-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center p-12 h-48">
                      <div className="text-6xl">{post.image}</div>
                      <div className={`absolute top-4 right-4 ${getCategoryColor(post.category)} px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
                        {getCategoryBadge(post.category)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-base-content/70 dark:text-base-content/70 mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {post.metrics && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {Object.entries(post.metrics).map(([key, value]) => (
                            <div key={key} className="bg-base-100 dark:bg-base-300 rounded-lg p-2 text-center">
                              <p className="text-lg font-bold text-primary dark:text-primary">{value}</p>
                              <p className="text-xs text-base-content/60 dark:text-base-content/60 capitalize">{key}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs text-base-content/60 dark:text-base-content/60 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-base-300 dark:border-base-300">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex items-center gap-1 text-sm hover:text-error dark:hover:text-error transition-colors"
                          >
                            <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? 'fill-error text-error' : 'text-base-content/60 dark:text-base-content/60'}`} />
                            <span className={likedPosts.includes(post.id) ? 'text-error font-semibold' : 'text-base-content/60 dark:text-base-content/60'}>
                              {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                            </span>
                          </button>
                          <div className="flex items-center gap-1 text-sm text-base-content/60 dark:text-base-content/60">
                            <Share2 className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </div>
                        </div>
                        <button className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 text-sm font-semibold flex items-center gap-1">
                          Read More
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-base-200 dark:bg-base-200 rounded-2xl">
                <Search className="w-16 h-16 text-base-content/20 dark:text-base-content/20 mx-auto mb-4" />
                <p className="text-lg text-base-content/60 dark:text-base-content/60">
                  No articles found matching your search
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-6 border border-primary/20 dark:border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary text-primary-content rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-base-content dark:text-base-content">Stay Updated</h3>
                  <p className="text-xs text-base-content/60 dark:text-base-content/60">Never miss a story</p>
                </div>
              </div>
              <p className="text-sm text-base-content/70 dark:text-base-content/70 mb-4">
                Subscribe to our newsletter for weekly success stories and safety tips
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-base-100 dark:bg-base-200 border border-base-300 dark:border-base-300 rounded-xl text-base-content dark:text-base-content placeholder-base-content/40 dark:placeholder-base-content/40 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-content py-3 rounded-xl font-bold transition-colors"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-base-content/50 dark:text-base-content/50 mt-3 text-center">
                Join 5,000+ subscribers
              </p>
            </div>

            {/* Popular Posts */}
            <div className="bg-base-200 dark:bg-base-200 rounded-2xl p-6 shadow-lg border border-base-300 dark:border-base-300">
              <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary dark:text-primary" />
                Popular Posts
              </h3>
              <div className="space-y-3">
                {popularPosts.map((post, idx) => (
                  <button
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-base-100 dark:bg-base-300 rounded-xl hover:bg-base-300 dark:hover:bg-neutral transition-colors group w-full text-left"
                  >
                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 text-primary dark:text-primary font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-base-content dark:text-base-content group-hover:text-primary dark:group-hover:text-primary line-clamp-2 mb-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-base-content/60 dark:text-base-content/60">
                        {post.reads} reads
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-base-200 dark:bg-base-200 rounded-2xl p-6 shadow-lg border border-base-300 dark:border-base-300">
              <h3 className="text-xl font-bold text-base-content dark:text-base-content mb-4 flex items-center gap-2">
                <Download className="w-6 h-6 text-secondary dark:text-secondary" />
                Free Resources
              </h3>
              <div className="space-y-3">
                <button className="flex items-center justify-between p-3 bg-base-100 dark:bg-base-300 rounded-xl hover:bg-base-300 dark:hover:bg-neutral transition-colors group w-full">
                  <span className="text-sm font-medium text-base-content dark:text-base-content">Food Safety Guide PDF</span>
                  <ExternalLink className="w-4 h-4 text-secondary dark:text-secondary group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-between p-3 bg-base-100 dark:bg-base-300 rounded-xl hover:bg-base-300 dark:hover:bg-neutral transition-colors group w-full">
                  <span className="text-sm font-medium text-base-content dark:text-base-content">Donation Checklist</span>
                  <ExternalLink className="w-4 h-4 text-secondary dark:text-secondary group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-between p-3 bg-base-100 dark:bg-base-300 rounded-xl hover:bg-base-300 dark:hover:bg-neutral transition-colors group w-full">
                  <span className="text-sm font-medium text-base-content dark:text-base-content">Monthly Impact Report</span>
                  <ExternalLink className="w-4 h-4 text-secondary dark:text-secondary group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary rounded-2xl p-8 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-content mb-3">
            Have a Story to Share?
          </h3>
          <p className="text-primary-content/90 mb-6 max-w-xl mx-auto">
            We'd love to feature your success story and inspire others in our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-base-100 dark:bg-base-100 text-primary dark:text-primary rounded-xl font-bold hover:bg-base-200 dark:hover:bg-base-200 transition-colors shadow-lg">
              Submit Your Story
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur text-primary-content rounded-xl font-bold hover:bg-white/30 transition-colors border-2 border-white/30">
              View All Articles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;