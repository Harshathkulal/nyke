"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <footer className="w-full bg-black text-white py-4">
      <div className="m-2">
        <div className="flex justify-between m-2 flex-col lg:flex-row gap-6">
          <div>
            <ul className="font-medium space-y-2">
              <li className="font-bold">FIND A STORE</li>
              <li className="font-bold">BECOME A MEMBER</li>
              <li className="font-bold">Send Us Feedback</li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-3">
            <p
              className="font-medium flex justify-between lg:cursor-default cursor-pointer"
              onClick={() => setHelpOpen(!helpOpen)}
            >
              HELP
              <span className="text-lg lg:hidden">{helpOpen ? "-" : "+"}</span>
            </p>
            {hasMounted && helpOpen && (
              <ul className="font-medium text-gray-500 space-y-2 lg:hidden">
                <li className="text-xs hover:text-white">Get Help</li>
                <li className="text-xs hover:text-white">Order Status</li>
                <li className="text-xs hover:text-white">Returns</li>
                <li className="text-xs hover:text-white">Payment Options</li>
              </ul>
            )}
            <ul className="hidden lg:block font-medium text-gray-500 space-y-2">
              <li className="text-xs hover:text-white">Get Help</li>
              <li className="text-xs hover:text-white">Order Status</li>
              <li className="text-xs hover:text-white">Returns</li>
              <li className="text-xs hover:text-white">Payment Options</li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-3">
            <p
              className="font-medium flex justify-between lg:cursor-default cursor-pointer"
              onClick={() => setCompanyOpen(!companyOpen)}
            >
              COMPANY
              <span className="text-lg lg:hidden">{companyOpen ? "-" : "+"}</span>
            </p>
            {hasMounted && companyOpen && (
              <ul className="font-medium text-gray-500 space-y-2 lg:hidden">
                <li className="text-xs hover:text-white">About Xike</li>
                <li className="text-xs hover:text-white">News</li>
                <li className="text-xs hover:text-white">Careers</li>
              </ul>
            )}
            <ul className="hidden lg:block font-medium text-gray-500 space-y-2">
              <li className="text-xs hover:text-white">About Xike</li>
              <li className="text-xs hover:text-white">News</li>
              <li className="text-xs hover:text-white">Careers</li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between m-2 mb-0 flex-col lg:flex-row gap-2 mt-10">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024 Xike, Inc. All rights reserved.
          </span>
          <ul className="text-sm font-medium text-gray-500 flex flex-col lg:flex-row gap-4 mt-2">
            <li><Link href="/" className="hover:text-white">Guides</Link></li>
            <li><Link href="/" className="hover:text-white">Terms of Sale</Link></li>
            <li><Link href="/" className="hover:text-white">Terms of Use</Link></li>
            <li><Link href="/" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
