"use client";

import { useState, useEffect } from "react";

export default function PayForm() {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [verifiedUser, setVerifiedUser] = useState<{ name: string; number: string } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; number: string } | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Payment limits configuration
  const PAYMENT_LIMITS = {
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 50000,
    DAILY_LIMIT: 100000,
    MONTHLY_LIMIT: 500000
  };

  useEffect(() => {
    setIsFormVisible(true);
  }, []);

  // Get current user info
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/pay");
        const data = await res.json();
        if (data?.user) {
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch current user");
      }
    }
    fetchUser();
  }, []);

  // Validate payment amount
  const validateAmount = (value: string) => {
    const numValue = Number(value);
    if (numValue < PAYMENT_LIMITS.MIN_AMOUNT) {
      return `Minimum amount is ₹${PAYMENT_LIMITS.MIN_AMOUNT}`;
    }
    if (numValue > PAYMENT_LIMITS.MAX_AMOUNT) {
      return `Maximum amount is ₹${PAYMENT_LIMITS.MAX_AMOUNT.toLocaleString()}`;
    }
    return null;
  };

  async function handleVerify() {
    setMessage(null);
    setError(null);
    setVerifiedUser(null);

    if (!receiverId || receiverId.trim() === "") {
      showToast("Please enter receiver number", "error");
      return;
    }

    try {
      const res = await fetch("/api/verifyreceiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: receiverId }),
      });
      
      const data = await res.json();

      if (data?.error) {
        showToast(data.error, "error");
        setError(data.error);
      } else {
        setVerifiedUser(data.receiver);
        showToast("🎉 Receiver verified successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Verification failed", "error");
    }
  }

  async function handlePay() {
    const amountError = validateAmount(amount);
    if (amountError) {
      showToast(amountError, "error");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId,
          amount: Number(amount),
        }),
      });
      
      const data = await res.json();

      if (data?.error) {
        showToast(data.error, "error");
        setError(data.error);
      } else {
        showToast("🎉 Payment sent successfully!", "success");
        setMessage(data.message || "Payment successful!");
        setAmount("");
        setReceiverId("");
        setVerifiedUser(null);
        setTimeout(() => {
          window.location.href = "/transactions";
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Something went wrong during payment", "error");
    } finally {
      setLoading(false);
    }
  }

  // Custom toast function
  const showToast = (message: string, type: "success" | "error") => {
    const toastEl = document.createElement('div');
    toastEl.className = `fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl transition-all duration-300 transform translate-x-full ${
      type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`;
    toastEl.innerHTML = `
      <div class="flex items-center gap-2">
        <span>${type === 'success' ? '✅' : '❌'}</span>
        <span class="font-semibold">${message}</span>
      </div>
    `;
    
    document.body.appendChild(toastEl);
    
    setTimeout(() => {
      toastEl.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      toastEl.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toastEl);
      }, 300);
    }, 3000);
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const numValue = Number(value);
    return numValue.toLocaleString('en-IN');
  };

  return (
    <>
      <div className="min-h-screen mt-5 pl-5  bg-gray-50 w-full">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 py-5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl">💸</span>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Send Payment
              </h1>
              <p className="text-gray-600 text-lg">Fast, secure, and instant transfers</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className={`transition-all duration-1000 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - User Info & Limits */}
              <div className="space-y-6">
                {/* Current User Info */}
                {currentUser && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Account</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">{currentUser.name}</p>
                        <p className="text-gray-600 text-sm">{currentUser.number}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Limits Info */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-600">⚠️</span>
                    <h3 className="text-lg font-semibold text-gray-900">Payment Limits</h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Minimum:</span>
                      <span className="font-semibold">₹{PAYMENT_LIMITS.MIN_AMOUNT.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maximum:</span>
                      <span className="font-semibold">₹{PAYMENT_LIMITS.MAX_AMOUNT.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Limit:</span>
                      <span className="font-semibold">₹{PAYMENT_LIMITS.DAILY_LIMIT.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Verified User Display */}
                {verifiedUser && (
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-200 animate-slide-in">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Verified Receiver</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✅</span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold">{verifiedUser.name}</p>
                        <p className="text-gray-600 text-sm">{verifiedUser.number}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Center & Right Column - Payment Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                  <div className="space-y-8">
                    {/* Receiver Input Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Receiver Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Receiver Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Enter receiver number"
                              value={receiverId}
                              onChange={(e) => setReceiverId(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                            />
                            <div className="absolute right-3 top-3 text-gray-500">
                              📱
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleVerify}
                          disabled={!receiverId.trim()}
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 shadow-lg hover:shadow-yellow-500/25"
                        >
                          <span className="flex items-center justify-center gap-2">
                            ✅ Verify Receiver
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Amount Input Section */}
                    {verifiedUser && (
                      <div className="animate-fade-in">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Amount</h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                              Amount
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-3 text-gray-600 font-bold">₹</span>
                              <input
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-2xl pl-8 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none text-xl font-bold"
                              />
                              {amount && (
                                <div className="absolute right-3 top-3 text-gray-500 text-sm">
                                  {formatCurrency(amount)}
                                </div>
                              )}
                            </div>
                            {amount && validateAmount(amount) && (
                              <p className="text-red-500 text-sm mt-2 animate-shake">
                                {validateAmount(amount)}
                              </p>
                            )}
                          </div>

                          {/* Quick Amount Buttons */}
                          <div>
                            <p className="text-gray-700 text-sm font-semibold mb-3">Quick Select</p>
                            <div className="grid grid-cols-3 gap-3">
                              {[100, 500, 1000].map((quickAmount) => (
                                <button
                                  key={quickAmount}
                                  onClick={() => setAmount(quickAmount.toString())}
                                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-blue-500 rounded-xl py-3 text-gray-700 text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                  ₹{quickAmount}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Send Payment Button */}
                          <button
                            onClick={handlePay}
                            disabled={loading || !amount || !!validateAmount(amount)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
                          >
                            {loading && (
                              <div className="absolute inset-0 bg-blue-600/50 animate-pulse"></div>
                            )}
                            <span className="relative flex items-center justify-center gap-2">
                              {loading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  🚀 Send Money
                                </>
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Messages */}
                {message && (
                  <div className="mt-6 bg-green-50 rounded-2xl p-4 border border-green-200 animate-fade-in">
                    <p className="text-green-700 text-center font-semibold flex items-center justify-center gap-2">
                      🎉 {message}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-6 bg-red-50 rounded-2xl p-4 border border-red-200 animate-shake">
                    <p className="text-red-700 text-center font-semibold flex items-center justify-center gap-2">
                      ❌ {error}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </>
  );
}
