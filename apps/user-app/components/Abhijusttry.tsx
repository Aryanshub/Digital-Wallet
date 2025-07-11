"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  sender: { id: number; number: string };
  receiver: { id: number; number: string };
}

export default function P2PTransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await axios.get("/api/transhistory");
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions");
      }
    }
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen mt-5 flex items-center justify-center p-6  w-full">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl  p-10 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-10">
          💳 Your Payment History
        </h2>

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        {transactions.length === 0 ? (
          <p className="text-center font-bold text-gray-700" >Loading...</p>
        ) : (
          <ul className="space-y-6">
            {transactions.map((tx, index) => (
              <li
                key={tx.id}
                className="p-6 rounded-3xl bg-white shadow-lg hover:shadow-xl border-l-8 border-blue-500/10 hover:border-purple-500/20 transition-all duration-300 transform hover:-translate-y-1 animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">Sent by:</span>
                    <span className="text-gray-800 font-semibold text-sm">{tx.sender.number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">To:</span>
                    <span className="text-gray-800 font-semibold text-sm">{tx.receiver.number}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    ₹{tx.amount.toLocaleString()}
                  </p>
                  <p
                    className={`font-semibold px-3 py-1 rounded-full text-sm shadow-md ${
                      tx.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "Failure"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tx.status}
                  </p>
                </div>

                <p className="text-right text-xs text-gray-400 mt-3">
                  {new Date(tx.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        .animate-slide-in {
          animation: slideInUp 0.4s ease-out both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
