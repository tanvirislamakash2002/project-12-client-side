import React from 'react';
import {
  FaUtensils,
  FaClock,
  FaBoxOpen,
  FaThermometerHalf,
} from 'react-icons/fa';

const tips = [
  {
    icon: <FaUtensils className="text-white text-2xl" />,
    title: 'Donate Fresh & Properly Packaged Food',
    description:
      'Only donate fresh, edible items that are securely packaged or stored to maintain food safety.',
  },
  {
    icon: <FaClock className="text-white text-2xl" />,
    title: 'Respect Pickup Times',
    description:
      'Be on time! Punctuality ensures smooth pickup and keeps donated food in good condition.',
  },
  {
    icon: <FaThermometerHalf className="text-white text-2xl" />,
    title: 'Maintain Safe Temperatures',
    description:
      'Use coolers or insulation to preserve perishable food until it’s picked up.',
  },
  {
    icon: <FaBoxOpen className="text-white text-2xl" />,
    title: 'Label Your Donation',
    description:
      'Include donation details like date/time, food type, and quantity. It helps charities manage supplies better.',
  },
];

const DonationTips = () => {
  return (
<section className="bg-white dark:bg-base-100 py-20 px-4">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-6 dark:text-base-content">
      💡 Smart Donation Tips
    </h2>
    <p className="text-center text-gray-600 dark:text-base-content/80 max-w-2xl mx-auto mb-14">
      Maximize your impact! These quick, effective practices ensure your donations are safe, appreciated, and well-utilized by charities in need.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="group bg-gray-50 dark:bg-base-200 border border-gray-200 dark:border-base-300 hover:border-green-600 dark:hover:border-primary rounded-2xl p-6 flex gap-5 transition"
        >
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition">
            {tip.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-base-content group-hover:text-primary dark:group-hover:text-primary mb-1">
              {tip.title}
            </h3>
            <p className="text-gray-600 dark:text-base-content/80 text-sm">{tip.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default DonationTips;
