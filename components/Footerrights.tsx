import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between h-full">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Contact Us</h3>
          <div className="flex flex-wrap mt-2">
            <div className="mr-8 mb-4">
              <p className="font-semibold text-lg text-white mb-2">
                General Inquiries
              </p>
              <a
                href="mailto:info@yourcompany.com"
                className="text-blue-500 hover:text-blue-300"
              >
                info@yourcompany.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-lg text-white mb-2">Support</p>
              <a
                href="mailto:support@yourcompany.com"
                className="text-blue-500 hover:text-blue-300"
              >
                support@yourcompany.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm lg:text-base text-white">
            &copy; {new Date().getFullYear()} Collab@IITH. All rights reserved.
          </p>
        </div>
      </div>
      <div className="text-center mt-4">
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-300 flex items-center justify-center"
        >
          Special thanks to Vercel
        </a>
      </div>
    </footer>
  );
};

export default Footer;
