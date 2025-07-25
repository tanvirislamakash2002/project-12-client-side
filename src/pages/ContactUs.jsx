import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
          Have questions, feedback, or want to get involved? We’d love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-2xl text-secondary mt-1" />
            <div>
              <h3 className="font-bold">Our Location</h3>
              <p>123 Food Rescue Avenue, Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-2xl text-secondary mt-1" />
            <div>
              <h3 className="font-bold">Email</h3>
              <p>support@foodrescue.org</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-2xl text-secondary mt-1" />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+880 1234 567 890</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="input input-bordered w-full"
            required
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
