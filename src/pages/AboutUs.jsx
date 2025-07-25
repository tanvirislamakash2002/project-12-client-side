import { FaLeaf, FaRecycle, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-base-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto text-base-content/80">
          Our mission is to reduce food waste by connecting generous restaurants with trusted charities.
          We make it easy to share surplus food and help those in need — one meal at a time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="bg-base-200 rounded-2xl p-6 text-center shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <FaLeaf className="text-4xl mx-auto mb-4 text-success" />
          <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
          <p>We fight climate change by reducing landfill food waste, supporting sustainability at scale.</p>
        </motion.div>

        <motion.div
          className="bg-base-200 rounded-2xl p-6 text-center shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <FaRecycle className="text-4xl mx-auto mb-4 text-accent" />
          <h3 className="text-xl font-semibold mb-2">Resource Sharing</h3>
          <p>Surplus food is not waste — it's a resource. We help redistribute it to communities that need it most.</p>
        </motion.div>

        <motion.div
          className="bg-base-200 rounded-2xl p-6 text-center shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <FaHandshake className="text-4xl mx-auto mb-4 text-secondary" />
          <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
          <p>We build bridges between restaurants, volunteers, and charities to make a real difference.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-primary">Join the Movement</h2>
        <p className="text-base max-w-xl mx-auto text-base-content/80 mb-6">
          Whether you're a restaurant looking to donate or a charity in need — our platform connects you.
          Let’s work together to build a sustainable, hunger-free future.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </motion.div>
    </div>
  );
};

export default AboutUs;
