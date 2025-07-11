"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e:any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Gradient */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px)`
        }}
      />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto py-24 px-4 text-center z-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 inline-block">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-sm font-semibold px-4 py-2 rounded-full border border-blue-400/20 backdrop-blur-sm">
              ✨ The Future of Digital Payments
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Your Fast, Secure
            </span>
            <br />
            <span className="text-white">& Smart Wallet App!</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Send, Receive & Manage Money Seamlessly with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
              Axel-Pay
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Link href="/api/auth/signin">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[200px]">
                <span className="relative z-10">Get Started as User</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
            </Link>
            
            <Link href="http://localhost:3000/">
              <button className="group relative bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[200px]">
                <span className="relative z-10">Get Started as Merchant</span>
                <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>

        {/* Phone UI Mockup with Enhanced Styling */}
        <div className={`relative transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            {/* Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl scale-110 animate-pulse"></div>
            
            {/* Multiple Floating Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
            
            {/* Phone Image Container */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl transform hover:rotate-1 transition-all duration-500 hover:scale-105 border border-white/10">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-2xl">
                <img
                  src="/image.png"
                  alt="Wallet App Preview"
                  className="w-full max-w-sm mx-auto rounded-xl shadow-2xl bg-black/50 backdrop-blur-sm border border-white/20"
                />
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute -left-4 top-1/4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                💸 +$250
              </div>
              <div className="absolute -right-4 top-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
                🔒 Secure
              </div>
              <div className="absolute -left-4 bottom-1/4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse" style={{animationDelay: '2s'}}>
                ⚡ Instant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gradient-to-br from-gray-950 to-gray-900 py-20 px-6 border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Why Axel-Pay?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "💸", title: "Instant Payments", desc: "Send & receive money in seconds with zero delays." },
              { icon: "🔒", title: "Bank-Level Security", desc: "End-to-end encrypted transactions with biometric auth." },
              { icon: "📱", title: "Intuitive Design", desc: "Simple and clean mobile-first interface." },
              { icon: "📊", title: "Smart Analytics", desc: "Track spending patterns and financial insights." }
            ].map(({ icon, title, desc }, index) => (
              <div
                key={title}
                className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 shadow-2xl border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {desc}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Footer */}
      <section className="relative bg-gradient-to-br from-blue-900 to-purple-900 text-center py-20 px-6 border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to revolutionize your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              financial future?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions who trust Axel-Pay for their daily transactions
          </p>
          
          <Link href="/api/auth/signin">
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-12 py-5 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-lg">
              <span className="relative z-10">Start Your Journey Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </button>
          </Link>
          
          <div className="mt-8 text-sm text-gray-400">
            🔒 Your data is safe • ⚡ Setup in 2 minutes • 🎯 No hidden fees
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </main>
  );
}