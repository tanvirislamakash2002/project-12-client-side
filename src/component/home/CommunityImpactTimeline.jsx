import React from 'react';

const milestones = [
  {
    title: "Project Launched",
    description: "Our mission to reduce local food waste begins.",
    date: "July 1, 2025",
    image: "https://i.ibb.co/6YJYkBg/launch.png",
  },
  {
    title: "First Donation",
    description: "Our first restaurant donated 20 kg of fresh produce.",
    date: "July 5, 2025",
    image: "https://i.ibb.co/2YmpX1H/first-donation.png",
  },
  {
    title: "1000 kg Saved",
    description: "Together with our partners, we saved 1,000 kg of food!",
    date: "August 1, 2025",
    image: "https://i.ibb.co/gS9HZ4s/1000kg.png",
  },
  {
    title: "10+ Charities Onboarded",
    description: "Our network of charity partners keeps growing.",
    date: "August 15, 2025",
    image: "https://i.ibb.co/LhjsFW3/charity.png",
  },
];

const CommunityImpactTimeline = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        📅 Our Community Impact Journey
      </h2>
      <div className="relative border-l-4 border-green-600 pl-8">
        {milestones.map((item, idx) => (
          <div key={idx} className="mb-10 relative">
            <div className="absolute w-4 h-4 bg-green-600 rounded-full left-[-10px] top-1"></div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.date}</p>
                </div>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityImpactTimeline;
