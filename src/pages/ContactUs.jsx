import React, { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUtensils, 
  FaHeart,
  FaUserTie,
  FaQuestionCircle,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    userType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        userType: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri, 9:00 AM - 6:00 PM"
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email Support",
      details: "support@foodbridge.org",
      subtitle: "We'll respond within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Office Address",
      details: "123 Community Street",
      subtitle: "Downtown, State 12345"
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: "Business Hours",
      details: "Monday - Friday",
      subtitle: "9:00 AM - 6:00 PM EST"
    }
  ];

  const supportTypes = [
    {
      icon: <FaUtensils className="w-6 h-6 text-[#2E5941]" />,
      title: "Restaurant Support",
      description: "Help with food posting, pickup coordination, and platform features"
    },
    {
      icon: <FaHeart className="w-6 h-6 text-[#E28436]" />,
      title: "Charity Support",
      description: "Assistance with applications, food requests, and donation tracking"
    },
    {
      icon: <FaUserTie className="w-6 h-6 text-[#F4A261]" />,
      title: "Business Inquiries",
      description: "Partnership opportunities, bulk registrations, and enterprise solutions"
    },
    {
      icon: <FaQuestionCircle className="w-6 h-6 text-[#3182CE]" />,
      title: "General Support",
      description: "Account issues, technical problems, and general platform questions"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2E5941] to-[#38A169] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl mb-6 opacity-90">
              We're here to help restaurants and charities make a difference together
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FaUtensils className="w-4 h-4" />
                <span>Restaurant Support</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart className="w-4 h-4" />
                <span>Charity Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserTie className="w-4 h-4" />
                <span>24/7 Help Desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1A202C] mb-3">Send us a Message</h2>
                <p className="text-[#3D4451]">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <FaCheckCircle className="w-16 h-16 text-[#38A169] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#38A169] mb-2">Message Sent!</h3>
                  <p className="text-[#3D4451]">Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#1A202C]">Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="input input-bordered bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#1A202C]">Email Address *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="input input-bordered bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#1A202C]">I am a *</span>
                      </label>
                      <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="select select-bordered bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none"
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="restaurant">Restaurant Owner/Manager</option>
                        <option value="charity">Charity Organization</option>
                        <option value="user">Individual User</option>
                        <option value="potential">Potential Partner</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#1A202C]">Subject *</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="select select-bordered bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="technical">Technical Support</option>
                        <option value="account">Account Issues</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-[#1A202C]">Message *</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your inquiry in detail..."
                      rows="6"
                      className="textarea textarea-bordered bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn bg-[#2E5941] hover:bg-[#38A169] text-white border-none w-full md:w-auto px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-[#1A202C] mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-[#2E5941] text-white p-3 rounded-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A202C]">{item.title}</h4>
                      <p className="text-[#3D4451] font-medium">{item.details}</p>
                      <p className="text-sm text-[#3D4451] opacity-75">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Types */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-[#1A202C] mb-6">How Can We Help?</h3>
              <div className="space-y-4">
                {supportTypes.map((type, index) => (
                  <div key={index} className="border border-[#E2E8F0] rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1A202C] mb-1">{type.title}</h4>
                        <p className="text-sm text-[#3D4451]">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-[#E28436] to-[#F4A261] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Urgent Support Needed?</h3>
              <p className="mb-4 opacity-90">
                For time-sensitive food donations or urgent technical issues
              </p>
              <div className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span className="font-semibold">Emergency: +1 (555) 999-FOOD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;