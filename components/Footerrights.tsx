import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/3">
          <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
          <div>
            <p className="font-semibold text-lg text-white mb-2">
              General Inquiries:
            </p>
            <a
              href="mailto:info@yourcompany.com"
              className="text-blue-500 hover:text-blue-300"
            >
              info@yourcompany.com
            </a>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-lg text-white mb-2">Support:</p>
            <a
              href="mailto:support@yourcompany.com"
              className="text-blue-500 hover:text-blue-300"
            >
              support@yourcompany.com
            </a>
          </div>
        </div>
        <div className="w-full md:w-2/3 mt-4 md:mt-0 text-right">
          <div className="flex justify-end">
            <Link href="/common-queries" legacyBehavior>
              <a className="text-blue-500 hover:text-blue-300 mr-4">
                Common Queries
              </a>
            </Link>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300"
            >
              Special thanks to Vercel
            </a>
          </div>
          <p className="text-sm lg:text-base text-white mt-4">
            &copy; {new Date().getFullYear()} Collab@IITH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
