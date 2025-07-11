import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">💸 Axel-Pay</h1>

      <ul className="space-y-4">
        <li>
          <Link href="http://localhost:3001">
            <div className="px-6 py-3 bg-white rounded shadow hover:bg-blue-600 hover:text-white text-center transition cursor-pointer w-48 font-semibold">
              Personal
            </div>
          </Link>
        </li>
        <li>
          <Link href="http://localhost:3000">
            <div className="px-6 py-3 bg-white rounded shadow hover:bg-green-600 hover:text-white text-center transition cursor-pointer w-48 font-semibold">
              Business
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
