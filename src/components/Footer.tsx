import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-10 px-6 md:px-20">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <Link href="/dashboard" className="hover:text-gray-400 transition">Home</Link>
          <br />
          <Link href="/myposts" className="hover:text-gray-400 transition">My Posts</Link>
          <br />
          <Link href="/support" className="hover:text-gray-400 transition">Support</Link>
        </div>

        {/* Message */}
        <div className="text-center md:text-left">
          <p className="text-sm md:block hidden text-gray-300">
            Built with lots of ☕ and ❤️ <br />
            by Voxa 
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <FaInstagram size={20} />
            Instagram
          </a>
          <a
            href="https://github.com/Shikhar-Shetty"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-gray-400 transition"
          >
            <FaGithub size={20} />
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <FaTwitter size={20} />
            Twitter/X
          </a>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t border-neutral-700 pt-4">
        &copy; 2025 Voxa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
