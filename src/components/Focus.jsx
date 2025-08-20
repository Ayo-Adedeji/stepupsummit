const Focus = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-primaryBlue mb-12">
          What to Expect in 2025
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-4">
              Focus Areas
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Digital and AI skills for global competitiveness</li>
              <li>Leadership training for community and career growth</li>
              <li>Entrepreneurship support (business literacy, startup coaching, investor access)</li>
              <li>Networking opportunities that lead to lasting partnerships</li>
            </ul>
          </div>

        
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-4">
              Program Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Keynote addresses from leaders in technology, business, and media</li>
              <li>Panel sessions with founders, investors, and policymakers</li>
              <li>Hands-on workshops in branding, finance, marketing, and innovation</li>
              <li>Live pitch sessions with feedback and funding opportunities</li>
              <li>Networking booths and exhibitions for brands and partners</li>
              <li>Media coverage across TV, radio, blogs, and digital platforms</li>
            </ul>
          </div>

          
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-4">
              Our Impact Goals
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Equip over 1,000 participants with actionable tools and insights</li>
              <li>Support at least 50 startups through coaching and pitches</li>
              <li>Facilitate new partnerships and funding opportunities</li>
              <li>Strengthen leadership capacity across Nigeria</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Focus;
