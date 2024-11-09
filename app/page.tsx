'use client';

import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { BsInfoCircle, BsLightningFill } from 'react-icons/bs';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';

interface BinData {
  BIN: string;
  Brand: string;
  Type: string;
  Category: string;
  Issuer: string;
  IssuerPhone: string;
  IssuerUrl: string;
  isoCode2: string;
  isoCode3: string;
  CountryName: string;
}

export default function Home() {
  const [bin, setBin] = useState<string>('');
  const [result, setResult] = useState<BinData | null>(null);
  const [error, setError] = useState<string>('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (bin.length < 6) {
      setError('Please enter at least the first 6 digits of the BIN.');
      return;
    }

    try {
      const response = await fetch(`/api/proxy?bin=${bin}`);
      if (!response.ok) {
        throw new Error('Failed to fetch BIN data');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Error fetching data. Please try again later.');
    }
  };

  const handleReset = () => {
    setBin('');
    setResult(null);
    setError('');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white min-h-screen">
      <header className="flex flex-col items-center justify-center text-center py-20 space-y-6">
        <h1 className="text-5xl font-bold">BIN Checker</h1>
        <p className="text-lg">
          Your all-in-one solution to validate and check Bank Identification Numbers (BIN).
        </p>
      </header>

      {/* BIN Checker Form */}
      <section className="max-w-4xl mx-auto p-8 bg-white bg-opacity-20 rounded-lg shadow-lg -mt-20 mb-20">
        <h2 className="text-3xl font-bold mb-4 text-center">Check Your BIN</h2>
        <form onSubmit={handleCheck} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter BIN (e.g. 489504)"
            value={bin}
            onChange={(e) => setBin(e.target.value)}
            className="px-4 py-2 text-black rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Check BIN
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <IoMdRefresh className="inline-block mr-2" />
            Reset
          </button>
        </form>

        {/* Error or Result Display */}
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}

        {result && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-black">
            <h3 className="text-2xl font-semibold mb-4">BIN Information</h3>
            <p><strong>Scheme:</strong> {result.Brand}</p>
            <p><strong>Type:</strong> {result.Type}</p>
            <p><strong>Country:</strong> {result.CountryName}</p>
            <p><strong>Bank:</strong> {result.Issuer || 'Unknown'}</p>
            <p><strong>Issuer Phone:</strong> {result.IssuerPhone || 'N/A'}</p>
            <p><strong>Issuer URL:</strong> {result.IssuerUrl || 'N/A'}</p>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-semibold mb-8">About BIN Checker</h2>
        <p className="text-lg max-w-2xl mx-auto">
          BIN Checker helps you identify and validate Bank Identification Numbers (BIN) by providing essential information
          like the card brand, type, issuer details, country, and more. Just enter the first 6 digits of your BIN, and get accurate results instantly!
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-semibold mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <BsInfoCircle className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Detailed Information</h3>
            <p>Get full card details including card brand, type, country, and more.</p>
          </div>
          <div className="flex flex-col items-center">
            <BsLightningFill className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast and Reliable</h3>
            <p>Check BIN data in seconds with accurate and up-to-date results.</p>
          </div>
          <div className="flex flex-col items-center">
            <HiOutlineSpeakerphone className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure and Private</h3>
            <p>We ensure your data stays private and secure. No personal information required.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <FaQuestionCircle className="inline-block text-2xl mr-4" />
            <strong>What is a BIN?</strong>
            <p>The Bank Identification Number (BIN) refers to the first six digits of a credit card number, which helps identify the bank or financial institution that issued the card.</p>
          </div>
          <div className="mb-6">
            <FaQuestionCircle className="inline-block text-2xl mr-4" />
            <strong>How do I find my BIN?</strong>
            <p>You can find your BIN by looking at the first 6 digits of your card number.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
