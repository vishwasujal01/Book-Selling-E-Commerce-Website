import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Title */}
      <div className="text-center text-3xl pt-10 border-t-2 border-gray-300">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className="my-16 flex flex-col md:flex-row items-center gap-12 border-b-2 pb-10">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-lg"
          src={assets.contact}
          alt="Contact Us"
        />

        {/* Contact Details */}
        <div className="flex flex-col justify-center items-start gap-6 max-w-lg">
          <div>
            <h2 className="font-semibold text-2xl text-gray-700">Our Store</h2>
            <p className="text-gray-500 leading-relaxed">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-2xl text-gray-700">Contact Information</h2>
            <p className="text-gray-500 leading-relaxed">
              <strong>Phone:</strong> (415) 555-0132 <br />
              <strong>Email:</strong> admin@forever.com
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-2xl text-gray-700">Careers at Forever</h2>
            <p className="text-gray-500 leading-relaxed">
              Explore exciting career opportunities and become a part of our passionate team.
            </p>
          </div>

          <button className="border border-black px-6 py-3 text-sm font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;