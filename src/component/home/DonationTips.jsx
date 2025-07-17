import React from 'react';
import { FaUtensils, FaClock, FaBoxOpen, FaThermometerHalf } from 'react-icons/fa';

const tips = [
  {
    icon: <FaUtensils className="text-green-600 text-3xl" />,
    title: "Donate Fresh & Properly Packaged Food",
    description:
      "Only donate fresh, edible items that are securely packaged or stored to maintain food safety.",
  },
  {
    icon: <FaClock className="text-green-600 text-3xl" />,
    title: "Respect Pickup Times",
    description:
      "Be on time! Punctuality ensures smooth pickup and keeps donated food in good condition.",
  },
  {
    icon: <FaThermometerHalf className="text-green-600 text-3xl" />,
    title: "Maintain Safe Temperatures",
    description:
      "Use coolers or insulation to preserve perishable food until it’s picked up.",
  },
  {
    icon: <FaBoxOpen className="text-green-600 text-3xl" />,
    title: "Label Your Donation",
    description:
      "Include donation details like date/time, food type, and quantity. It helps charities manage supplies better.",
  },
];

const DonationTips = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          💡 Smart Donation Tips
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Help your donation make the greatest impact! Whether you're giving or receiving,
          follow these simple best practices to keep our community fed and healthy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex gap-4 items-start"
            >
              <div className="shrink-0">{tip.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationTips;
